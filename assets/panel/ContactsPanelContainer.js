import ContactsListPanel from "./ContactsListPanel.js";
import ContactsCollectionPanel from "./ContactsCollectionPanel.js";

export default class ContactsPanelContainer extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
		this._initNav();
		this._initHeader();
	}

	_initNav() {
		var $users_li = $( "<li class=active><span class='fa fa-users h3'></span></li>" );
		var $collection_li = $( "<li><span class='fa fa-star h3'></span></li>" );
		var $spring_li = $( "<li class=spring></li>" );

		this.$nav = $( "<ul class=panel-icon></ul>" );

		this.$nav.append( $users_li );
		this.$nav.append( $collection_li );
		this.$nav.append( $spring_li );

		this.$element.append( this.$nav );
	}

	_initHeader() {
		this.$header = $( this.$element.find( ".panel-header" ) );
		var $dock = $( "<div class=dock><span class='fa fa-thumb-tack normal docked'></span></div>" );

		var self = this;
		$dock.on( "click", "span", function( e ) {
			if( self.animating ) {
				return;
			}

			var $icon = $( e.currentTarget );
			if( $icon.hasClass( "docked" ) ) {
				self._undock( $icon );
			}
			else {
				console.log("to dock")
				self._dock( $icon );
			}
		} );

		this.$header.append( $dock );
	}

	_undock( $ele ) {
		$ele.removeClass( "docked" );
		this._showPanel();
	}

	_dock( $ele ) {
		$ele.addClass( "docked" );
	}

	_showPanel() {
		var containerWidth = this.$element.find( ".panel-main" ).width();
		console.log(containerWidth);
	}

	_hidePanel() {

	}

	render() {
		return (
			<div id="ab-contacts">
				<header className="panel-header" />
				<main className="panel-main">
					<ContactsListPanel />
					<ContactsCollectionPanel />
				</main>
			</div>
		);
	}
}