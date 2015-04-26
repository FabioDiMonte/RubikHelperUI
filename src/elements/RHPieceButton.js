/**
 * Created by fdimonte on 24/04/2015.
 */

var RHPieceButton = (function($, PUIElement, RHFaceButtons, RubikUtils){

    /**
     * RHPieceButton Class
     *
     * @param name
     * @param avoidInteraction
     * @constructor
     */
    function RHPieceButton(name,avoidInteraction) {
        this.avoidInteraction = avoidInteraction;
        PUIElement.call(this,name||'piece');
        this.setValue(name);
        this.faces = null;
        this.axis = null;
    }

    /**
     * RHPieceButton prototype
     *
     * @type {PUIElement}
     */
    RHPieceButton.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHPieceButton.prototype.getElement = function() {
        return $('<ul/>').addClass('ic-ui-piece').data('piece',this.name);
    };

    RHPieceButton.prototype.initEvents = function() {
        if(this.avoidInteraction) return;

        this.setEvent('click',function(e){
            if(!this.enabled) return false;
            if(!this.faces) {
                this.faces = [];
                this.trigger('editbegin','');//should disable sliceButtons and axisButtons
            }else{
                var piece = this.faces.join('');
                piece.length>=2 && (piece='['+piece+']');
                this.reset();
                this.trigger('editend',piece);// enableAllFaces(); addMoveToSequence(piece);
            }
            return true;
        });
    };

    RHPieceButton.prototype.setValue = function(value) {
        if(value){
            this.reset();
            for(var f=0; f<value.length; f++){
                this.addFace(value.charAt(f));
            }
        }
    };

    RHPieceButton.prototype.getValue = function() {
        return this.$el.data('piece');
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RHPieceButton.prototype.addFace = function(face,forceAdd) {

        this.$el.append(RHFaceButtons.prototype.faceButton(face,'face','<li/>'));

        if(this.faces || forceAdd){
            this.faces || (this.faces=[]);
            this.faces.push(face);
            this.$el.data('piece',this.faces.join(''));
            this.trigger('wontaccept',RubikUtils.service.notAcceptedWithPiece(this.faces));
        }

    };

    RHPieceButton.prototype.reset = function() {
        this.faces = null;
        this.$el.empty();
    };

    return RHPieceButton;

}(jQuery, PanelUI.core.PUIElement, RHFaceButtons, RubikHelper.static.RubikUtils));
