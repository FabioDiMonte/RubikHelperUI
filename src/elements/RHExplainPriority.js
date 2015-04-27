/**
 * Created by fdimonte on 24/04/2015.
 */

var RHExplainPriority = (function($, PUIElement){

    /**
     * RHExplainPriority Class
     *
     * @constructor
     */
    function RHExplainPriority() {
        PUIElement.call(this,'explain-priority');
    }

    /**
     * RHExplainPriority prototype
     *
     * @type {PUIElement}
     */
    RHExplainPriority.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHExplainPriority.prototype.getElement = function() {
        return $('<span/>')
            .append($('<label/>')
                .append($('<input/>').attr('type','radio').attr('name','priority').val(-1).prop('checked',true))
                .append($('<span/>').text('all'))
        )
            .append($('<label/>')
                .append($('<input/>').attr('type','radio').attr('name','priority').val(0))
                .append($('<span/>').text('0'))
        )
            .append($('<label/>')
                .append($('<input/>').attr('type','radio').attr('name','priority').val(1))
                .append($('<span/>').text('1'))
        )
            .append($('<label/>')
                .append($('<input/>').attr('type','radio').attr('name','priority').val(2))
                .append($('<span/>').text('2'))
        );
    };

    RHExplainPriority.prototype.initEvents = function() {
        this.setEvent('change','input',function(e){
            this.trigger('change_priority',$(e.currentTarget).val());
        });
    };

    RHExplainPriority.prototype.setValue = function(value) {
        var $priority = this.$el.find('input[name=priority][value='+value+']');
        $priority.length>0 && $priority.prop('checked', true);
    };

    RHExplainPriority.prototype.getValue = function() {
        return this.$el.find('input:checked').val();
    };

    return RHExplainPriority;

}(jQuery, PanelUI.core.PUIElement));
