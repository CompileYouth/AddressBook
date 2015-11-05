export default class SettingDialog extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
	}

	show() {
		var self = this;
		this.$element.css( {
			display: "block",
			transform: "scale( 0 )"
		} ).transit( {
			transform: "translate( -50% ), scale( 1 )"
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
			transform: "scale( 0 )"
		}, function() {
			self.$element.css( "display", "none" );

			var $input = self.$element.find("input");
			if( $input ) {
				$input.val( "" );
			}
		} );
	}

	render() {
		return (
			<div id="ab-dialog">

			</div>
		);
	}
}