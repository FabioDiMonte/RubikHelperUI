/**
 * Created by fdimonte on 24/04/2015.
 */

var RHMovesList = (function($, PUIElement){

    /**
     * RHMovesList Class
     *
     * @constructor
     */
    function RHMovesList() {
        PUIElement.call(this,'moveslist');
    }

    /**
     * RHMovesList prototype
     * @type {PUIElement}
     */
    RHMovesList.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHMovesList.prototype.getElement = function() {
        return $('<p/>')
            .addClass('ic-ui-moves')
            .html('&nbsp;');
    };

    RHMovesList.prototype.setValue = function(value) {
        this.$el.html(value);
    };

    RHMovesList.prototype.getValue = function() {
        return this.$el.text();
    };

    return RHMovesList;

}(jQuery, PanelUI.core.PUIElement));
