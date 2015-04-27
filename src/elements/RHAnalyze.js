/**
 * Created by fdimonte on 24/04/2015.
 */

var RHAnalyze = (function($, PUIElement){

    /**
     * RHAnalyze Class
     *
     * @constructor
     */
    function RHAnalyze() {
        PUIElement.call(this,'analyze');
    }

    /**
     * RHAnalyze prototype
     *
     * @type {PUIElement}
     */
    RHAnalyze.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHAnalyze.prototype.getElement = function() {
        return $('<div/>')
            .append($('<label/>')
                .append($('<button/>').attr('type','button').attr('id','ic-solve-analyze')
                    .append($('<span/>').text('get pattern'))
            )
        );
    };

    RHAnalyze.prototype.initEvents = function() {
        this.setEvent('click','#ic-solve-analyze',function(e){
            this.trigger('get_pattern');
        });
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    return RHAnalyze;

}(jQuery, PanelUI.core.PUIElement));
