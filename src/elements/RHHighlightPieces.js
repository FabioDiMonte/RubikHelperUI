/**
 * Created by fdimonte on 24/04/2015.
 */

var RHHighlightPieces = (function($, PUIElement, RHPieceButton, RubikUtils){

    /**
     * RHHighlightPieces Class
     *
     * @constructor
     */
    function RHHighlightPieces() {
        PUIElement.call(this,'highlights-pieces');
        this.pieces = [];
    }

    /**
     * RHHighlightPieces prototype
     *
     * @type {PUIElement}
     */
    RHHighlightPieces.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    RHHighlightPieces.prototype.getElement = function() {
        return $('<div/>')
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('U'))
                .append(pieceButton('D'))
                .append(pieceButton('F'))
                .append(pieceButton('B'))
                .append(pieceButton('L'))
                .append(pieceButton('R'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('UF'))
                .append(pieceButton('UB'))
                .append(pieceButton('UL'))
                .append(pieceButton('UR'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('DF'))
                .append(pieceButton('DB'))
                .append(pieceButton('DL'))
                .append(pieceButton('DR'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('FL'))
                .append(pieceButton('FR'))
                .append(pieceButton('BL'))
                .append(pieceButton('BR'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('UFL'))
                .append(pieceButton('ULB'))
                .append(pieceButton('UBR'))
                .append(pieceButton('URF'))
        )
            .append($('<div/>').addClass('ic-highlights-pieces-container')
                .append(pieceButton('DFR'))
                .append(pieceButton('DRB'))
                .append(pieceButton('DBL'))
                .append(pieceButton('DLF'))
        );
    };

    RHHighlightPieces.prototype.initEvents = function() {
        this.setEvent('click','.ic-ui-piece',function(e){
            var $piece = $(e.currentTarget);
            var piece = $piece.data('piece');

            if($piece.hasClass('unselected')) {
                $piece.removeClass('unselected');
                this.pieces.push(piece);
            }
            else {
                $piece.addClass('unselected');
                var i = this.pieces.indexOf(piece);
                i>-1 && (this.pieces.splice(i,1));
            }

            this.trigger('changepiece',this.pieces.join(','));
        });
    };

    RHHighlightPieces.prototype.setValue = function(value) {
        if(typeof(value)=='array')
            this.pieces = value;
        else
            throw new Error('RHHighlightPieces.setValue() called with a wrong value');

        var p,piece,target,
            $piece,$pieces = this.$el.find('.ic-ui-piece');

        $pieces.addClass('unselected');
        for(p=0;p<this.pieces.length;p++){
            piece = this.pieces[p];
            target = RubikUtils.service.targetOf(piece);
            $piece = $pieces.filter(function(i,e){
                return $(e).data('piece') == piece;
            });
            $piece.removeClass('unselected');
        }
        this.trigger('changepiece',this.pieces.join(','));
    };

    RHHighlightPieces.prototype.getValue = function() {
        return this.pieces;
    };

    /* *******************************
     * PRIVATE METHODS
     * *******************************/

    function pieceButton(piece) {
        var btn = new RHPieceButton(piece,true);
        return btn.toDom().addClass('unselected');
    }

    return RHHighlightPieces;

}(jQuery, PanelUI.core.PUIElement, RHPieceButton, RubikHelper.static.RubikUtils));
