/**
 * Created by fdimonte on 24/04/2015.
 */

var RHCubeSetup = (function($, PUIElement){

    /**
     * RHCubeSetup Class
     *
     * @constructor
     */
    function RHCubeSetup() {
        PUIElement.call(this,'cubesetup')
    }

    /**
     * RHCubeSetup prototype
     *
     * @type {PUIElement}
     */
    RHCubeSetup.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHCubeSetup.prototype.getElement = function() {
        return $('<div/>')
            .append($('<div/>')
                .append($('<label/>')
                    .append( $('<button/>').attr('type','button').attr('id','ic-cubesetup-reset').append($('<span/>').text('reset cube')) )
            )
                .append($('<label/>')
                    .append( $('<button/>').attr('type','button').attr('id','ic-cubesetup-getimage').append($('<span/>').text('get image')) )
            )
        )
            .append($('<div/>')
                .append($('<label/>')
                    .append( $('<input/>').attr('type','checkbox').attr('id','ic-cubesetup-editcube') )
                    .append( $('<span/>').text('edit cube') )
            )
                .append($('<label/>')
                    .append( $('<input/>').attr('type','checkbox').attr('id','ic-cubesetup-backfaces') )
                    .append( $('<span/>').text('show back faces') )
            )
        );
    };

    RHCubeSetup.prototype.initEvents = function() {
        this.setEvent('change','input',function(e){
            var $t = $(e.currentTarget);

            if($t.attr('id').indexOf('backfaces')>-1)
                this.trigger('togglebackface',$t.is(':checked'));

            else if($t.attr('id').indexOf('editcube')>-1)
                this.trigger('toggleeditcube',$t.is(':checked'));

        });
        this.setEvent('click','button',function(e){
            var $t = $(e.currentTarget);

            if($t.attr('id').indexOf('getimage')>-1)
                this.trigger('getimage');

            else if($t.attr('id').indexOf('reset')>-1)
                this.trigger('reset');

        });
    };

    return RHCubeSetup;

}(jQuery, PanelUI.core.PUIElement));
