/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelMoves = (function(PanelSequenceToMoves, PUIPanelComponent, PUIPanelComponentGroup, RHFaceButtons, RHPieceButton, RHGroupButtons){

    /**
     * PanelMoves Class
     *
     * @constructor
     */
    function PanelMoves() {
        PanelSequenceToMoves.call(this,'moves');
        this.editpiece = false;
    }

    /**
     * PanelMoves prototype
     *
     * @type {PanelSequenceToMoves}
     */
    PanelMoves.prototype = Object.create(PanelSequenceToMoves.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelMoves.prototype.addCustomComponents = function() {

        var moves_faces = new PUIPanelComponent(this.name,'faces','faces');
        var moves_faces_buttons = new RHFaceButtons('face',['U','D','F','B','L','R']);
        moves_faces.addChild(moves_faces_buttons);

        var moves_piece = new PUIPanelComponent(this.name,'piece','piece');
        var moves_piece_button = new RHPieceButton();
        moves_piece.addChild(moves_piece_button);

        var moves_slices = new PUIPanelComponent(this.name,'slices','slices');
        var moves_slices_buttons = new RHFaceButtons('slice',['M','E','S']);
        moves_slices.addChild(moves_slices_buttons);

        var moves_axis = new PUIPanelComponent(this.name,'axis','axis');
        var moves_axis_buttons = new RHFaceButtons('axis',['X','Y','Z']);
        moves_axis.addChild(moves_axis_buttons);

        var moves_group = new PUIPanelComponent(this.name,'group','group');
        var moves_group_buttons = new RHGroupButtons();
        moves_group.addChild(moves_group_buttons);

        moves_faces_buttons.on('click',faceHandler.bind(this));
        moves_piece_button.on('editbegin',pieceHandler.bind(this));
        moves_piece_button.on('editend',pieceHandler.bind(this));
        moves_piece_button.on('wontaccept',pieceHandler.bind(this));
        moves_slices_buttons.on('click',faceHandler.bind(this));
        moves_axis_buttons.on('click',faceHandler.bind(this));
        moves_group_buttons.on('click',groupHandler.bind(this));

        this.sequence.on('change',function(data,event){
            this.elementsMap['moves-group'].elementsMap['groupbuttons'].updateGroupStatus(data);
        }.bind(this));

        this.addChild(new PUIPanelComponentGroup([ this.sequence.parent ]));
        this.addChild(new PUIPanelComponentGroup([ moves_faces, moves_piece ]));
        this.addChild(new PUIPanelComponentGroup([ moves_slices, moves_axis ]));
        this.addChild(new PUIPanelComponentGroup([ moves_group ]));
        this.addChild(new PUIPanelComponentGroup([ this.moveslist.parent ]));

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function addMoveToSequence(move) {
        var elem = this.elementsMap[this.name+'-sequence'].elementsMap['moves'];
        var temp_val = elem.getValue();//$el.val();
        var new_val = temp_val + move;
        elem.setValue(new_val);
        //this.sequence.trigger('change',new_val);
    }

    function addMoveToPiece(move) {
        var elem = this.elementsMap[this.name+'-piece'].elementsMap['piece'];
        elem.addFace(move);
    }

    function enableAllFaces() {
        this.elementsMap[this.name+'-faces'].elementsMap['face'].enableFaces();
        this.elementsMap[this.name+'-slices'].elementsMap['slice'].enableFaces();
        this.elementsMap[this.name+'-axis'].elementsMap['axis'].enableFaces();
    }

    function disableFaces(faces) {
        this.elementsMap[this.name+'-faces'].elementsMap['face'].disableFaces(faces);
    }

    // #### HANDLERS ###

    function faceHandler(data,event) {
        if(this.editpiece)
            addMoveToPiece.call(this,data);
        else
            addMoveToSequence.call(this,(data=='X'||data=='Y'||data=='Z') ? data.toLowerCase() : data);
    }

    function pieceHandler(data,event) {
        switch (event) {
            case 'editbegin':
                this.editpiece = true;
                this.elementsMap[this.name+'-slices'].elementsMap['slice'].disableFaces();
                this.elementsMap[this.name+'-axis'].elementsMap['axis'].disableFaces();
                break;
            case 'wontaccept':
                disableFaces.call(this,data);
                break;
            case 'editend':
                this.editpiece = false;
                enableAllFaces.call(this);
                addMoveToSequence.call(this,data);
                break;
        }
    }

    function groupHandler(data,event) {
        addMoveToSequence.call(this,data);
    }

    return PanelMoves;

}(PanelSequenceToMoves, PanelUI.panels.PUIPanelComponent, PanelUI.panels.PUIPanelComponentGroup, RHFaceButtons, RHPieceButton, RHGroupButtons));
