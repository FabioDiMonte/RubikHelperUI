/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelHighlights = (function(PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHHighlightList, RHHighlightPieces){

    /**
     * PanelHighlights Class
     *
     * @constructor
     */
    function PanelHighlights() {
        PUIPanel.call(this,'highlights');
    }

    /**
     * PanelHighlights prototype
     *
     * @type {PUIPanel}
     */
    PanelHighlights.prototype = Object.create(PUIPanel.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelHighlights.prototype.addComponents = function() {

        var highlight_predefined = new PUIPanelComponent('highlights','predefined','list');
        var highlight_predefined_list = new RHHighlightList();
        highlight_predefined.addChild(highlight_predefined_list);

        var highlight_pieces = new PUIPanelComponent('highlights','pieces','pieces');
        var highlight_pieces_list = new RHHighlightPieces();
        highlight_pieces.addChild(highlight_pieces_list);

        highlight_predefined_list.on('changelist',highlightHandler.bind(this));
        highlight_pieces_list.on('changepiece',highlightHandler.bind(this));

        this.addChild(new PUIPanelComponentGroup([ highlight_predefined ]));
        this.addChild(new PUIPanelComponentGroup([ highlight_pieces ]));

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function executeHighlight(pieces) {
        if(!this.parent.isocube) return;

        if(pieces.indexOf('none')>-1)
            this.parent.isocube.highlight();
        else
            this.parent.isocube.highlight(pieces);
    }

    // #### HANDLERS ###

    function highlightHandler(data,event) {

        switch(event){
            case 'changepiece':
                this.elementsMap['highlights-predefined'].elementsMap['highlights-list'].setValue('custom');
                break;
            case 'changelist':
                if(data=='custom') data = this.elementsMap['highlights-pieces'].elementsMap['highlights-pieces'].pieces.join(',');
                break;
        }

        executeHighlight.call(this,data.split(','));

    }

    return PanelHighlights;

}(PanelUI.panels.PUIPanel, PanelUI.panels.PUIPanelComponent, PanelUI.panels.PUIPanelComponentGroup, RHHighlightList, RHHighlightPieces));
