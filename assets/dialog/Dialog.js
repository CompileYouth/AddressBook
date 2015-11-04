export default class SettingDialog extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
	}

	show() {
		this.$element.css( {
			display: "block",
			transform: "scale( 0 )"
		} ).transit( {
			transform: "scale( 1 )"
		}, 150);
	}

	hide() {
		var self = this;
		this.$element.transit( {
			transform: "scale( 0 )"
		}, function() {
			self.$element.css( "display", "none" );
		} );
	}

	render() {
		return (
			<div id="ab-dialog">

			</div>
		);
	}
}