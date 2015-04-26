/**
 * Created by fdimonte on 24/04/2015.
 */

var RHCubeColors = (function($, PUIElement, RubikUtils){

    /**
     * RHCubeColors Class
     *
     * @constructor
     */
    function RHCubeColors() {
        this.colorsData = null;
        this.canvasWidth = 220;
        this.canvasHeight = 100;

        PUIElement.call(this,'cubecolors');
    }

    /**
     * RHCubeColors prototype
     *
     * @type {PUIElement}
     */
    RHCubeColors.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHCubeColors.prototype.getElement = function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        drawPicker(canvas);

        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        this.colorsData = imageData.data;

        return $(canvas).attr('id','ColorPicker');
    };

    RHCubeColors.prototype.initEvents = function() {
        this.setEvent('click',function(e){
            var elPos = $(e.currentTarget).offset(),
                msPos = {top: e.pageY, left: e.pageX};

            var pos = {
                left : msPos.left - elPos.left,
                top  : msPos.top  - elPos.top
            };

            var idx = Math.round(pos.top * this.canvasWidth + pos.left) * 4;

            var colR = this.colorsData[idx+0],
                colG = this.colorsData[idx+1],
                colB = this.colorsData[idx+2];
            var hexR = ('00'+colR.toString(16)).substr(-2),
                hexG = ('00'+colG.toString(16)).substr(-2),
                hexB = ('00'+colB.toString(16)).substr(-2);

            var colStr = '#' + hexR + hexG + hexB;
            this.trigger('change_colors',colStr);
        });
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function drawPicker(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.rect(0, 0, canvas.width, canvas.height);

        var w = canvas.width,
            h = canvas.height;

        var qx = 0,
            qy = 0,
            qw = w/6,
            qh = qw/2;

        var colpikX = 0,
            colpikY = qh,
            colpikW = w,
            colpikH = h-qh;

        var arr = ['#FF0000','#FFFF00','#00FF00','#00FFFF','#0000FF','#FF00FF','#FF0000'];
        var grd1 = ctx.createLinearGradient(colpikX, colpikY+colpikH, colpikX+colpikW, colpikY+colpikH);
        for(var c=0;c<arr.length;c++) grd1.addColorStop(Math.floor(100/6*c)/100,arr[c]);

        var grd2 = ctx.createLinearGradient(colpikX+colpikW, colpikY, colpikX+colpikW, colpikY+colpikH/2);
        grd2.addColorStop(0, 'rgba(255,255,255,0.9)');
        grd2.addColorStop(1, 'rgba(255,255,255,0)');

        var grd3 = ctx.createLinearGradient(colpikX+colpikW, colpikY+colpikH/2, colpikX+colpikW, colpikY+colpikH);
        grd3.addColorStop(0, 'rgba(0,0,0,0)');
        grd3.addColorStop(1, 'rgba(0,0,0,0.9)');

        ctx.fillStyle = grd1;
        ctx.fill();
        ctx.fillStyle = grd2;
        ctx.fill();
        ctx.fillStyle = grd3;
        ctx.fill();

        var fills = [RubikUtils.colors.U,RubikUtils.colors.D,RubikUtils.colors.F,RubikUtils.colors.B,RubikUtils.colors.L,RubikUtils.colors.R];
        for(var f=0;f<fills.length;f++){
            ctx.fillStyle = fills[f];
            ctx.fillRect(qw*f,qy,qw,qy+qh);
        }

        ctx.strokeStyle = '#222222';
        ctx.stroke();
    }

    return RHCubeColors;

}(jQuery, PanelUI.core.PUIElement, RubikHelper.static.RubikUtils));
