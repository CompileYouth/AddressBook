export default class SettingDialog extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
		this.originPosition = {
			t: this.$element.position().top,
			l: this.$element.position().left
		};
		//console.log("begin", this.originPosition);
	}

	show() {
		var self = this;
		this.$element.css( {
			display: "block",
			transform: "scale( 0 )",
			opacity: 0
		} ).transit( {
			transform: "scale( 1 )",
			opacity: 1
		}, 150, function() {
			var $input = self.$element.find("input");
			if( $input ) {
				$input.focus();
			}
		});
	}

	hide() {
		var self = this;
		this.$element.transit( {
			transform: "scale( 0 )",
			opacity: 0
		}, function() {
			self.$element.css( "display", "none" );

			var $input = self.$element.find("input");
			if( $input ) {
				$input.val( "" );
			}

			console.log( self.originPosition);
			/*var l =  self.originPosition.l;
			var t = self.originPosition["top"];*/
			/*self.$element.css( {
				left: l,
				top: t
			} );*/
		} );
	}

	render() {
		return (
			<div id="ab-dialog">

			</div>
		);
	}
}