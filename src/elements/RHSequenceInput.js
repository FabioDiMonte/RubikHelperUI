/**
 * Created by fdimonte on 24/04/2015.
 */

var RHSequenceInput = (function($, PUIElement){

    /**
     * RHSequenceInput Class
     *
     * @param name
     * @constructor
     */
    function RHSequenceInput(name) {
        PUIElement.call(this,name);
    }

    /**
     * RHSequenceInput prototype
     *
     * @type {PUIElement}
     */
    RHSequenceInput.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHSequenceInput.prototype.getElement = function() {
        return $('<div/>')
            .append(
            $('<label/>').append(
                $('<input/>').addClass('ic-ui-sequence').attr('type','text')
            )
        )
            .append(
            $('<label/>').append(
                $('<button/>').attr('id','ic-'+this.name+'-execute').attr('type','button').append($('<span/>').text('execute'))
            )
        );
    };

    RHSequenceInput.prototype.initEvents = function() {
        this.setEvent('keyup','.ic-ui-sequence',function(e){
            // TODO: improve this handler and make it accept only accepted letters and symbols
            var event = e.keyCode==13 ? 'execute' : 'change';
            var value = this.$el.find('.ic-ui-sequence').val();
            this.trigger(event,value);
        });
        this.setEvent('click','button',function(e){
            this.trigger('execute',this.$el.find('.ic-ui-sequence').val())
        });
    };

    RHSequenceInput.prototype.setValue = function(value) {
        this.$el.find('.ic-ui-sequence').val(value);
        this.trigger('change',value);
    };

    RHSequenceInput.prototype.getValue = function() {
        return this.$el.find('.ic-ui-sequence').val();
    };

    return RHSequenceInput;

}(jQuery, PanelUI.core.PUIElement));
