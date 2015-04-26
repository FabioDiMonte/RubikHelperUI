/**
 * Created by fdimonte on 24/04/2015.
 */

var RHGroupButtons = (function($, PUIElement){

    /**
     * RHGroupButtons Class
     *
     * @constructor
     */
    function RHGroupButtons() {
        PUIElement.call(this,'groupbuttons');
        this.group = 0;
    }

    /**
     * RHGroupButtons prototype
     *
     * @type {PUIElement}
     */
    RHGroupButtons.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHGroupButtons.prototype.getElement = function() {
        return $('<span/>')
            .append(groupButton('open'))
            .append(groupButton('close',null,true))
            .append(groupButton('negative',null,true))
            .append(groupButton('inverse',null,true))
            .append(groupButton('mirror',null,true));
    };

    RHGroupButtons.prototype.initEvents = function() {
        this.setEvent('click','button',function(e){
            var $this = $(e.currentTarget);
            var action = $this.data('action');

            switch (action) {
                case 'open':
                    groupOpen.call(this) && this.trigger('click', "(");
                    break;
                case 'close':
                    groupClose.call(this) && this.trigger('click', ") ");
                    break;
                case 'negative':
                    groupClose.call(this) && this.trigger('click', ")' ");
                    break;
                case 'inverse':
                    groupClose.call(this) && this.trigger('click', ")i ");
                    break;
                case 'mirror':
                    groupClose.call(this) && this.trigger('click', ")m ");
                    break;
            }
        });
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RHGroupButtons.prototype.updateGroupStatus = function(value) {
        var i,p,
            group = 0,
            par = value.replace(/[^/(|/)]/g,'');
        for(i=0;i<par.length;i++){
            p = par.charAt(i);
            p=='(' && group++;
            p==')' && group--;
        }
        group>0 ? groupOpenRender.call(this) : groupCloseRender.call(this);
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function groupButton(action,label,disabled) {
        label || (label=action);
        return $('<label/>')
            .append($('<button/>').attr('type','button').attr('data-action',action)).addClass(disabled?'disabled':'')
            .append($('<span/>').text(label));
    }

    function groupOpen() {
        this.group++;
        groupOpenRender.call(this);
        return true;
    }

    function groupClose() {
        if(this.group==0) return false;
        --this.group==0 && groupCloseRender.call(this);
        return true;
    }

    function groupOpenRender() {
        this.$el.find('.disabled').removeClass('disabled');
    }

    function groupCloseRender() {
        this.$el.find('button').filter(':not([data-action=open])').addClass('disabled');
    }

    return RHGroupButtons;

}(jQuery, PanelUI.core.PUIElement));
