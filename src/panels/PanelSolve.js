/**
 * Created by fdimonte on 24/04/2015.
 */

var PanelSolve = (function(RubikSolver, RubikTeacher, PanelSequenceToMoves, PUIPanelComponent, PUIPanelComponentGroup, RHAnalyze, RHReplay){

    /**
     * PanelSolve Class
     *
     * @constructor
     */
    function PanelSolve() {
        PanelSequenceToMoves.call(this,'solve');
        this.lastScramble = null;
    }

    /**
     * PanelSolve prototype
     *
     * @type {PanelSequenceToMoves}
     */
    PanelSolve.prototype = Object.create(PanelSequenceToMoves.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PanelSolve.prototype.addCustomComponents = function() {

        var solve_sequence = new PUIPanelComponent('solve','pattern','analyze');
        var solve_sequence_ui = new RHAnalyze();
        solve_sequence.addChild(solve_sequence_ui);

        var solve_replay = new PUIPanelComponent('solve','replay','replay');
        var solve_replay_ui = new RHReplay();
        solve_replay.addChild(solve_replay_ui);

        solve_sequence_ui.on('get_pattern',getSolvePattern.bind(this));
        solve_replay_ui.on('replay',executeReplay.bind(this));
        solve_replay_ui.on('change',changeReplay.bind(this));

        this.sequence.on('execute',function(data,event) {
            this.lastScramble = this.mainUI.isocube.getCube();
        }.bind(this));

        this.addChild(new PUIPanelComponentGroup([ solve_sequence ]));
        this.addChild(new PUIPanelComponentGroup([ this.sequence.parent ]));
        this.addChild(new PUIPanelComponentGroup([ this.moveslist.parent ]));
        this.addChild(new PUIPanelComponentGroup([ solve_replay ]));

    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    // #### HANDLERS ###

    function getSolvePattern(data,event) {
        var obj = RubikSolver.solve.explain(this.mainUI.isocube.getCube());
        var seq = obj.s.join(',');
        var exp = obj.e;
        this.sequence.setValue(seq);

        this.trigger('get_pattern',RubikTeacher.explainAll(exp));
    }

    function executeReplay(data,event) {
        this.lastScramble && this.mainUI.isocube.setCube(this.lastScramble);
        this.trigger('replaybegin',data);
        switch(data){
            case '':
            default:
                break;
        }
    }

    function changeReplay(data,event) {

    }

    return PanelSolve;

}(RubikHelper.static.RubikSolver, RubikHelper.static.RubikTeacher, PanelSequenceToMoves, PanelUI.panels.PUIPanelComponent, PanelUI.panels.PUIPanelComponentGroup, RHAnalyze, RHReplay));
