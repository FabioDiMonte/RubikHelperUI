/**
 * Created by fdimonte on 24/04/2015.
 */

var RHExplainList = (function($, PUIElement){

    /**
     * RHExplainList Class
     *
     * @constructor
     */
    function RHExplainList() {
        PUIElement.call(this,'explain-list');
        this.explainArray = null;
        this.currentGroup = 0;
        this.currentPriority = -1;
    }

    /**
     * RHExplainList prototype
     *
     * @type {PUIElement}
     */
    RHExplainList.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHExplainList.prototype.getElement = function() {
        return $('<div/>');
    };

    RHExplainList.prototype.initEvents = function() {
        this.setEvent('click','strong',function(e){
            var $t = $(e.currentTarget);
            var $p = $t.parent();
            $p.find('>div').toggle();
            $p.find('>p').toggle();
            this.showCurrentPriority();
        });
    };

    RHExplainList.prototype.setValue = function(value) {
        this.explainArray = value;
        clear.call(this);
        for(var i=0;i<value.length;i++){
            addRow.call(this,value[i]);
        }
        this.collapseAll();
        this.showCurrentPriority();
    };

    RHExplainList.prototype.getValue = function() {
        return this.explainArray;
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RHExplainList.prototype.setPriority = function(priority) {
        this.currentPriority = Number(priority);
    };

    RHExplainList.prototype.showCurrentPriority = function() {
        var currentPriority = this.currentPriority;

        if(currentPriority>=0)
            this.$el.find('div').addClass('showall');
        else
            this.$el.find('div').removeClass('showall');

        this.$el.find('strong,p').each(function(i,e){
            if(currentPriority==-1 || currentPriority>=$(this).data('priority'))
                $(this).data('hidden',false).removeClass('hidden');
            else
                $(this).data('hidden',true).addClass('hidden');
        });
    };

    RHExplainList.prototype.collapseAll = function() {
        this.$el.find('div div, div p').hide();
    };

    RHExplainList.prototype.expandAll = function() {
        this.$el.find('div, p:not(.hidden)').show();
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function clear() {
        this.$el.empty();
        this.currentGroup = this.$el;
    }

    function addRow(object) {

        var $elem = $('<p/>'),
            $group = this.currentGroup,
            $group_new = $('<div/>'),
            group_open = object.g==1,
            group_close = object.g==-1;

        if(group_open){
            $elem = $('<strong/>');
            $group = $group_new;
            this.currentGroup.append($group_new);
            this.currentGroup = $group_new;
        }
        else if(group_close && this.currentGroup!=this.$el){
            this.currentGroup = this.currentGroup.parent();
        }
        $group.append($elem.data('priority',object.p).addClass('p_'+object.p).text(object.m));

    }

    return RHExplainList;

}(jQuery, PanelUI.core.PUIElement));
