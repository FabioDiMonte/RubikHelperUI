/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelSequenceToMoves = (function(RubikUtils, PUIPanel, PUIPanelComponent, PUIPanelComponentGroup, RHSequenceInput, RHMovesList){

    /**
     * PanelSequenceToMoves Class
     *
     * @param name
     * @constructor
     */
    function PanelSequenceToMoves(name) {
        this.sequence = null;
        this.moveslist = null;
        PUIPanel.call(this,name);
        this.addCustomComponents();
    }

    /**
     * PanelSequenceToMoves prototype
     *
     * @type {PUIPanel}
     */
    PanelSequenceToMoves.prototype = Object.create(PUIPanel.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelSequenceToMoves.prototype.addComponents = function() {

        // DON'T override this method
        // if you need so, maybe you should extend PUIPanel instead
        // otherwise, override addCustomComponents method!

        // sequence input
        var sequenceContainer = new PUIPanelComponent(this.name,'sequence','sequence');
        this.sequence = new RHSequenceInput(this.name);
        sequenceContainer.addChild(this.sequence);

        // moves output
        var moveslistContainer = new PUIPanelComponent(this.name,'moveslist','moves');
        this.moveslist = new RHMovesList();
        moveslistContainer.addChild(this.moveslist);

        // events
        this.sequence.on('change',inputHandler.bind(this));
        this.sequence.on('execute',inputHandler.bind(this));

    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    PanelSequenceToMoves.prototype.addCustomComponents = function() {
        // override this method to add custom components (and set their events)

        // note: don't forget to copy/paste these two lines, if needed.
        // note: if you don't need these two components, override PUIPanel instead.
        this.addChild(new PUIPanelComponentGroup([ this.sequence.parent ]));
        this.addChild(new PUIPanelComponentGroup([ this.moveslist.parent ]));
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function sequenceToMoves(string,type) {

        type=='solve' && (type='pieces');

        var func = RubikUtils.parse[type];
        var parsed = func ? func(string) : [];

        parsed.length || (parsed=['&nbsp;']);
        this.elementsMap[this.name+'-moveslist'].elementsMap['moveslist'].setValue(parsed.join(','));
    }

    function executeMoves() {
        if(!this.mainUI.isocube) return;

        var seq = this.elementsMap[this.name+'-moveslist'].elementsMap['moveslist'].getValue().split(',');
        this.mainUI.isocube.execute(RubikUtils.clear.uncollapseSequence(seq),10);
    }

    // #### HANDLERS ###

    function inputHandler(data,event) {
        switch (event) {
            case 'change':
                sequenceToMoves.call(this,data,this.name);
                break;
            case 'execute':
                executeMoves.call(this);
                break;
        }
    }

    return PanelSequenceToMoves;

}(RubikHelper.static.RubikUtils, PanelUI.panels.PUIPanel, PanelUI.panels.PUIPanelComponent, PanelUI.panels.PUIPanelComponentGroup, RHSequenceInput, RHMovesList));
