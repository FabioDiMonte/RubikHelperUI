/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelExplain = (function(PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHExplainPriority, RHExplainList){

    /**
     * PanelExplain Class
     *
     * @constructor
     */
    function PanelExplain() {
        PUIPanel.call(this,'explain');
    }

    /**
     * PanelExplain prototype
     *
     * @type {PUIPanel}
     */
    PanelExplain.prototype = Object.create(PUIPanel.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelExplain.prototype.addComponents = function() {

        var explain_priority = new PUIPanelComponent('explain','priority','verbosity');
        var explain_priority_ui = new RHExplainPriority();
        explain_priority.addChild(explain_priority_ui);

        var explain_list = new PUIPanelComponent('explain','list','solving process');
        var explain_list_ui = new RHExplainList();
        explain_list.addChild(explain_list_ui);

        explain_priority_ui.on('change_priority',priorityHandler.bind(this));

        this.addChild(new PUIPanelComponentGroup([ explain_priority ]));
        this.addChild(new PUIPanelComponentGroup([ explain_list ]));

    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    PanelExplain.prototype.setExplain = function(arr) {

        var explain_list = this.elementsMap['explain-list'].elementsMap['explain-list'];
        explain_list.setValue(arr);

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    // #### HANDLERS ###

    function priorityHandler(data,event) {
        var explain_list = this.elementsMap['explain-list'].elementsMap['explain-list'];
        explain_list.setPriority(data);
        explain_list.showCurrentPriority();
    }

    return PanelExplain;

}(PanelUI.panels.PUIPanel, PanelUI.panels.PUIPanelComponent, PanelUI.panels.PUIPanelComponentGroup, RHExplainPriority, RHExplainList));
