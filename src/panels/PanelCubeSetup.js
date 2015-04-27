/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelCubeSetup = (function(PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHCubeSetup, RHFaceButtons, RHPieceButton, RHCubeColors){

    /**
     * PanelCubeSetup Class
     *
     * @constructor
     */
    function PanelCubeSetup() {
        PUIPanel.call(this,'cubesetup');
        this.editpiece = false;
        this.current_position = null;
        this.current_piece = null;
        this.current_face = null;
        this.disableFaces();
        this.togglePieceEnable();

        this.elementsMap[this.name+'-piece'].elementsMap['piece'].disable();
    }

    /**
     * PanelCubeSetup prototype
     *
     * @type {PUIPanel}
     */
    PanelCubeSetup.prototype = Object.create(PUIPanel.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelCubeSetup.prototype.addComponents = function() {

        var cube_setup = new PUIPanelComponent(this.name,'setup','setup');
        var cube_setup_ui = new RHCubeSetup();
        cube_setup.addChild(cube_setup_ui);

        var cube_piece = new PUIPanelComponent(this.name,'piece','get piece');
        var cube_piece_ui = new RHPieceButton(null,true);
        cube_piece.addChild(cube_piece_ui);

        var edit_faces = new PUIPanelComponent('editcube','faces','faces');
        var edit_faces_ui = new RHFaceButtons('face',['U','D','F','B','L','R']);
        edit_faces.addChild(edit_faces_ui);

        var edit_piece = new PUIPanelComponent('editcube','piece','set piece');
        var edit_piece_ui = new RHPieceButton(null,true);
        edit_piece.addChild(edit_piece_ui);

        var change_colors = new PUIPanelComponent(this.name,'colors','colors');
        var change_faces_ui = new RHFaceButtons('face',['U','D','F','B','L','R']);
        var change_colors_ui = new RHCubeColors();
        change_colors.addChild(change_faces_ui);
        change_colors.addChild(change_colors_ui);

        cube_setup_ui.on( 'togglebackface',   toggleBackFace.bind(this)   );
        cube_setup_ui.on( 'toggleeditcube',   toggleEditCube.bind(this)   );
        cube_setup_ui.on( 'getimage',         imageHandler.bind(this)     );
        cube_setup_ui.on( 'reset',            resetHandler.bind(this)     );

        edit_faces_ui.on( 'click',            faceHandler.bind(this)      );
        edit_piece_ui.on( 'wontaccept',       pieceHandler.bind(this)     );

        change_faces_ui.on( 'click',          faceColorHandler.bind(this) );
        change_colors_ui.on( 'change_colors', colorsHandler.bind(this)    );

        this.addChild(new PUIPanelComponentGroup([ cube_setup ]));
        this.addChild(new PUIPanelComponentGroup([ cube_piece ]));
        this.addChild(new PUIPanelComponentGroup([ edit_piece, edit_faces ]));
        this.addChild(new PUIPanelComponentGroup([ change_colors ]));

    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    PanelCubeSetup.prototype.addMoveToPiece = function(move) {
        var elem = this.elementsMap['editcube-piece'].elementsMap['piece'];
        elem.addFace(move,true);

        var value = elem.getValue();
        if(value.length==this.current_position.length){
            this.current_piece = value;
            this.mainUI.isocube.setPiece(this.current_position,this.current_piece);
            this.unsetPiece();
            elem.reset();
        }
    };

    PanelCubeSetup.prototype.enableAllFaces = function() {
        this.elementsMap['editcube-faces'].elementsMap['face'].enableFaces();
    };

    PanelCubeSetup.prototype.disableFaces = function(faces) {
        this.elementsMap['editcube-faces'].elementsMap['face'].disableFaces(faces);
    };

    PanelCubeSetup.prototype.togglePieceEnable = function(enabled) {
        var elem = this.elementsMap['editcube-piece'].elementsMap['piece'];
        if(enabled) elem.enable();
        else elem.disable();
    };

    PanelCubeSetup.prototype.setPiece = function(stickers,position) {

        this.mainUI.isocube.iso.console._children['cubeletInfo'].setRenderInfo(position + ' : ' + stickers);
        this.mainUI.isocube.iso.console._render();

        // animation testing purposes
        this.mainUI.isocube.iso.console._children['cubeletInfo'].setAnimationStep(function(time){
            this.setOptions({alpha:1-(time/1000)});
        });
        this.mainUI.isocube.iso.console.startAnimation(1000);
        // (end of animation testing)

        if(position.length==1) {
            this.unsetPiece();
            return;
        }

        this.current_piece = stickers;
        this.current_position = position;

        this.elementsMap[this.name+'-piece'].elementsMap['piece'].setValue(stickers);
        this.elementsMap['editcube-piece'].elementsMap['piece'].enable();
        this.elementsMap['editcube-piece'].elementsMap['piece'].reset();

        this.editpiece = true;
        this.enableAllFaces();

    };
    PanelCubeSetup.prototype.unsetPiece = function() {

        this.current_piece = null;
        this.current_position = null;

        this.mainUI.isocube.iso.console.clear();

        this.elementsMap[this.name+'-piece'].elementsMap['piece'].reset();
        this.elementsMap['editcube-piece'].elementsMap['piece'].disable();
        this.elementsMap['editcube-piece'].elementsMap['piece'].reset();

        this.editpiece = false;
        this.disableFaces();

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function getPieceName(pname,fname) {
        if(!pname||!fname) return null;
        var name = '', idx = pname.indexOf(fname);
        if(idx==-1) return null;

        for(var n=0;n<pname.length;n++){
            name+=pname.charAt(idx);
            (++idx == pname.length) && (idx = 0);
        }
        return name;
    }

    // #### HANDLERS ###

    function cubeClickHandler(e) {
        if(!this.mainUI.isocube) return;

        var poly = this.mainUI.isocube.iso.engine.getObjectsAtScreenCoord({x: e.pageX, y: e.pageY});

        if(poly.length>0) {

            if(this.mainUI.isocube.backfaceState()) {
                poly.sort(function(a, b) {return (a._zIndex - b._zIndex);});//ASCENDING
            } else {
                poly.sort(function(a, b) {return (b._zIndex - a._zIndex);});//DESCENDING
            }

            var face = poly[0];
            var piece = face._parent;
            var stickers = getPieceName(piece.get('sticker'), face.get('sticker'));
            var position = getPieceName(piece.get('position'), face.get('position'));

            if(stickers && position)
                this.setPiece(stickers, position);
            else
                this.unsetPiece();
        }
        else
            this.unsetPiece();

    }

    function toggleBackFace(data,event) {
        if(!this.mainUI || !this.mainUI.isocube) return;
        this.mainUI.isocube.backfaceToggle(data);

    }

    function toggleEditCube(data,event) {
        if(!this.mainUI || !this.mainUI.isocube) return;

        var elem = this.elementsMap[this.name+'-piece'].elementsMap['piece'];
        var container = this.mainUI.isocube.iso.container;
        if(data) {
            $(container).on('click',cubeClickHandler.bind(this));
            elem.enable();
        }
        else {
            $(container).off('click');
            this.unsetPiece();
            elem.disable();
            elem.reset();
        }
    }

    function imageHandler(data,event) {
        var img = this.mainUI.isocube.getImage();
        window.open(img);
    }

    function resetHandler(data,event) {
        this.mainUI.isocube.setCube();
    }

    function faceHandler(data,event) {
        this.editpiece && this.addMoveToPiece(data);
    }

    function pieceHandler(data,event) {
        this.disableFaces(data);
    }

    function colorsHandler(data,event) {
        if(!this.current_face) return;
        var obj = {};
        obj[this.current_face] = data;
        this.trigger('change_colors',obj);
    }

    function faceColorHandler(data,event) {
        this.current_face = data;
        var $btn = this.$el.find('.ic-ui-face-'+data);
        if($btn.length>0) {
            this.$el.find('.ic-ui-face.active').removeClass('active');
            $btn.addClass('active');
        }
    }

    return PanelCubeSetup;

}(PanelUI.panels.PUIPanel, PanelUI.panels.PUIPanelComponent, PanelUI.panels.PUIPanelComponentGroup, RHCubeSetup, RHFaceButtons, RHPieceButton, RHCubeColors));
