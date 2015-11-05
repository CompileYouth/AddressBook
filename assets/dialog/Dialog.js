export default class SettingDialog extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
		this.originPosition = {
			top: this.$element.position().top,
			left: this.$element.position().left
		};
		console.log("begin", this.originPosition);
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
			self.$element.css( {
				left: 0,
				top: -15
			} );
		} );
	}

	render() {
		return (
			<div id="ab-dialog">

			</div>
		);
	}
}