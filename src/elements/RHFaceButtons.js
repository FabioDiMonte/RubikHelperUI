/**
 * Created by fdimonte on 24/04/2015.
 */

var RHFaceButtons = (function($, PUIElement){

    /**
     * RHFaceButtons Class
     *
     * @param name
     * @param faces
     * @constructor
     */
    function RHFaceButtons(name,faces) {
        this.faces = faces;
        PUIElement.call(this,name);
    }

    /**
     * RHFaceButtons prototype
     * @type {PUIElement}
     */
    RHFaceButtons.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHFaceButtons.prototype.getElement = function() {
        var $faces_ul = $('<ul/>');
        for(var f=0;f<this.faces.length;f++){
            $faces_ul.append(this.faceButton(this.faces[f],this.name,'<li/>'))
        }
        return $faces_ul;
    };

    RHFaceButtons.prototype.initEvents = function() {
        this.setEvent('click','.ic-ui-face',function(e){
            var $t = $(e.currentTarget);
            if($t.hasClass('disabled')) return;

            var face = $t.data('face');
            this.trigger('click',face);
        });
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RHFaceButtons.prototype.disableFaces = function(faces) {
        var $buttons = getButtons.call(this,faces);
        $buttons.addClass('disabled');
    };

    RHFaceButtons.prototype.enableFaces = function(faces) {
        var $buttons = getButtons.call(this,faces);
        $buttons.removeClass('disabled');
    };

    RHFaceButtons.prototype.faceButton = function(face,type,tag) {
        type || (type='face');
        return $(tag)
            .data('face',face)
            .addClass('ic-ui-face')
            .addClass('ic-ui-'+type+'-'+face);
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function getButtons(faces) {
        var $buttons = this.$el.find('.ic-ui-face');
        if(faces) $buttons = $buttons.filter(function(i,e){ return (faces.indexOf($(e).data('face'))>-1); });
        return $buttons;
    }

    return RHFaceButtons;

}(jQuery, PanelUI.core.PUIElement));
