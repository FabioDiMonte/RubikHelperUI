/**
 * Created by fdimonte on 24/04/2015.
 */

var RHMainUI = (function($, RubikUtils, PUIMain, PanelMoves, PanelSolve, PanelExplain, PanelHighlights, PanelCubeSetup){

    /**
     * RHMainUI Class
     *
     * @param ID      {String}
     * @param isocube {RubikCubeISO}
     * @constructor
     */
    function RHMainUI(ID,isocube) {

        PUIMain.call(this,ID);
        this.init(isocube);

    }

    /**
     * RHMainUI prototype
     *
     * @type {PUIMain}
     */
    RHMainUI.prototype = Object.create(PUIMain.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHMainUI.prototype.init = function(isocube) {

        this.initNavigation();
        this.initStyles();

        this.isocube = isocube;

        this.addPanel( new PanelMoves(),      'scramble'  );
        this.addPanel( new PanelSolve(),      'solve'     ).on('get_pattern',explainHandler.bind(this));
        this.addPanel( new PanelExplain(),    'explain'   );
        this.addPanel( new PanelHighlights(), 'highlight' );
        this.addPanel( new PanelCubeSetup(),  'setup'     ).on('change_colors',colorsHandler.bind(this));

        // entry point
        this.uiStateChange('edit');
        setTimeout(function(){
            this.changePanel('moves',1000);
        }.bind(this),100);

    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    RHMainUI.prototype.uiStateChange = function(state) {

        this.eventlog && console.log('ui state changed to',state);

        switch (state) {
            case 'execute':
                break;
            case 'replay':
                //this.$el.hide();
                //$(window).on('keyup.isocube-ui',replayHandler);
                break;
            case 'solve':
                break;
            case 'edit':
            default :
                //this.$el.show();
                //$(window).off('.isocube-ui');
                break;
        }

    };

    RHMainUI.prototype.initStyles = function() {
        var styleID = 'faces_colors';
        var $styles = $('#'+styleID);
        var text = [];

        if ($styles.length==0) {
            $styles = $('<style/>').attr('id',styleID);
            $('head').append($styles);
        }

        //$styles.empty();
        for(var c in RubikUtils.colors) {
            if(RubikUtils.colors.hasOwnProperty(c)) text.push('#'+this.ID+' .ic-ui-face-'+c+' {background-color:'+RubikUtils.colors[c]+';}');
        }
        $styles.text(text.join(' '));
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    // #### HANDLERS ###

    function colorsHandler(data,event) {
        this.isocube.updateColors(data);
        this.initStyles();
    }

    function explainHandler(data,event) {
        this.panelsMap['explain'].setExplain(data);
    }

    return RHMainUI;

}(jQuery, RubikHelper.static.RubikUtils, PanelUI.core.PUIMain, PanelMoves, PanelSolve, PanelExplain, PanelHighlights, PanelCubeSetup));
