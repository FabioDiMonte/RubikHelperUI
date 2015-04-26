/**
 * Created by fdimonte on 24/04/2015.
 */

var RHReplay = (function($, PUIElement){

    /**
     * RHReplay Class
     *
     * @constructor
     */
    function RHReplay() {
        PUIElement.call(this,'replay');
        this.replaytype = 'play';
    }

    /**
     * RHReplay prototype
     *
     * @type {PUIElement}
     */
    RHReplay.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHReplay.prototype.getElement = function() {
        return $('<div/>')
            .append($('<label/>').addClass('ic-solve-replay-chose')
                .append($('<input/>').attr('type','radio').attr('name','replay').val('restore').prop('checked',true))
                .append($('<span/>').text('restore the last scrambled cube'))
        )
            .append($('<label/>').addClass('ic-solve-replay-chose').addClass('disabled')
                .append($('<input/>').attr('type','radio').attr('name','replay').val('click'))
                .append($('<span/>').text('click the cube to step ahead'))
        )
            .append($('<label/>').addClass('ic-solve-replay-chose').addClass('disabled')
                .append($('<input/>').attr('type','radio').attr('name','replay').val('play'))
                .append($('<span/>').text('play each single move every'))
                .append($('<input/>').attr('type','textfield').addClass('ic-ui-textfield').attr('id','ic-solve-replay-delay').val('1.5'))
                .append($('<span/>').text('seconds'))
        )
            .append($('<label/>')
                .append($('<button/>').attr('type','button').attr('id','ic-solve-replay-execute')
                    .append($('<span/>').text('replay'))
            )
        );
    };

    RHReplay.prototype.initEvents = function() {
        this.setEvent('change','input[name=replay]',function(e){
            var $labels = this.$el.find('.ic-solve-replay-chose');
            $labels.addClass('disabled');
            var $radio = $(e.currentTarget);
            $radio.is(':checked') && $radio.closest('.ic-solve-replay-chose').removeClass('disabled');
        });
        this.setEvent('click','.ic-solve-replay-chose',function(e){
            var $radio = $(e.currentTarget).find('input[name=replay]');
            if($radio.length && !$radio.is(':checked')){
                this.replaytype = $radio.val();
                this.trigger('change', this.replaytype);
            }
        });
        this.setEvent('click','#ic-solve-replay-execute',function(e){
            var eventValue =
                this.replaytype=='play' ?
                    this.$el.find('#ic-solve-replay-delay').val() :
                    'manual';

            this.trigger('replay',eventValue);
        });
    };

    return RHReplay;

}(jQuery, PanelUI.core.PUIElement));
