
module.exports = function(grunt) {

    function getPackageName(path,base){
        var name = path.replace(base,'');
        if(name.substr(name.length-1)=='/') name = name.substr(0,name.length-1);
        return name;
    }
    function getPackageProps(name){
        return '.'+name.split('/').join('.');
    }

    function filesList(path,base){
        base || (base=path);

        var className,packageName,packageProps,
            fs = require('fs'),
            files = fs.readdirSync(path),
            ret = {
                packages: [],
                rows: []
            };

        files.forEach(function(v){
            var s = fs.statSync(path+v);

            if(s.isFile()){
                className = v.replace('.js','');
                packageName = getPackageName(path,base);
                packageProps = path==base?'':getPackageProps(packageName);
                ret.packages.push(className);
                ret.rows.push('pkg'+packageProps+'.'+className+'='+className+';');
            }
            else if(s.isDirectory()){
                var subPath = path+v+'/';
                var fl = filesList(subPath,base);
                packageName = getPackageName(subPath,base);
                packageProps = getPackageProps(packageName);
                ret.rows.push('pkg'+packageProps+'={};');
                ret.rows = ret.rows.concat(fl.rows);
                ret.packages = ret.packages.concat(fl.packages);
            }
        });

        return ret;
    }

    // --- METHOD tasks --- //

    // Full GraphicEngine packages
    grunt.registerTask('create_package','',function(){
        var ln = grunt.util.linefeed,
            fl = filesList('src/'),
            rows = fl.rows.join(ln),
            packages = fl.packages.join(','),
            title = grunt.config.get('pkg').title,
            output = [];

        output.push('var '+title+'Package = (function('+packages+'){');
        output.push('var pkg={};');
        output.push(rows);
        output.push('return pkg;');
        output.push('}('+packages+'));');

        grunt.file.write('target/'+title+'Package.js', output.join(ln));
        grunt.log.write('Created '+title+'Package.js file'+grunt.util.linefeed);
    });

};
