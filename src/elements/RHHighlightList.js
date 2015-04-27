/**
 * Created by fdimonte on 24/04/2015.
 */

var RHHighlightList = (function($, PUIElement){

    /**
     * RHHighlightList Class
     *
     * @constructor
     */
    function RHHighlightList() {
        PUIElement.call(this,'highlights-list');
    }

    /**
     * RHHighlightList prototype
     *
     * @type {PUIElement}
     */
    RHHighlightList.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHHighlightList.prototype.getElement = function() {
        return $('<ul/>')
            .append(highlightChoice('render','none','none',true))
            .append(highlightChoice('highlight','face U',['ULB','UB','UBR','UL','U','UR','UFL','UF','URF']))
            .append(highlightChoice('highlight','face F',['FLU','FU','FUR','FL','F','FR','FDL','FD','FRD']))
            .append(highlightChoice('highlight','face R',['RFU','RU','RUB','RF','R','RB','RDF','RD','RBD']))
            .append(highlightChoice('highlight','face D',['DLF','DF','DFR','DL','D','DR','DBL','DB','DRB']))
            .append(highlightChoice('highlight','face B',['BRU','BU','BUL','BR','B','BL','BDR','BD','BLD']))
            .append(highlightChoice('highlight','face L',['LBU','LU','LUF','LB','L','LF','LDB','LD','LFD']))
            .append(highlightChoice('highlight','slice M',['F','U','B','D','UF','UB','DB','DF']))
            .append(highlightChoice('highlight','slice E',['F','R','B','L','FL','FR','BL','BR']))
            .append(highlightChoice('highlight','slice S',['U','R','D','L','UL','UR','DR','DL']))
            .append(highlightChoice('highlight','parity',['DF','DFR','UB','UBR']))
            .append(highlightChoice('highlight','J-perm',['ULB','UL','UFL','UF']))
            .append(highlightChoice('highlight','orient 2 edges',['UF','UB']))
            .append(highlightChoice('highlight','orient 4 edges',['UF','UB','UL','UR']))
            .append(highlightChoice('highlight','orient corner',['UFL']))
            .append(highlightChoice('highlight','custom','custom'));
    };

    RHHighlightList.prototype.initEvents = function() {
        this.setEvent('change','input',function(e){
            this.trigger('changelist',$(e.currentTarget).val());
        });
    };

    RHHighlightList.prototype.setValue = function(value) {
        var $el = this.$el.find('label').filter(function(i,e){
            return ($(e).text()==value);
        });
        if($el.length==1){
            $el.find('input').prop('checked',true);
        }
    };

    RHHighlightList.prototype.getValue = function() {
        return this.$el.find('input:checked').val();
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function highlightChoice(type,text,value,checked) {
        return $('<li/>')
            .append(
            $('<label/>').text(text).prepend(
                $('<input/>')
                    .addClass('ic-hl-'+type)
                    .attr('type','radio')
                    .attr('name','hl-choice')
                    .attr('value',value)
                    .prop('checked',checked)
            )
        );
    }

    return RHHighlightList;

}(jQuery, PanelUI.core.PUIElement));
