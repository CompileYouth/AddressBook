import ContactsListPanel from "./ContactsListPanel.js";
import ContactsCollectionPanel from "./ContactsCollectionPanel.js";

export default class ContactsPanelContainer extends React.Component {
	constructor( props ) {
		super( props );

		this.animating = null;
		this.timeoutId = null;
		this.panelStatus = false;//false: hidden, true: shown
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
		this._startPanelListening();
	}

	_dock( $ele ) {
		$ele.addClass( "docked" );
		this._stopPanelListening();
	}

	_showPanel() {
		var containerWidth = this.$element.find( ".panel-main" ).width();
		this.animating = true;
		var self = this;
		this.$element.animate( {
			left: '0'
		}, 200, "swing", function() {
			self.timeoutId = null;
			self.animating = false;
			self.panelStatus = true;
		} );
	}

	_hidePanel() {
		var containerWidth = this.$element.find( ".panel-main" ).width();
		this.animating = true;
		var self = this;
		this.$element.animate( {
			left: -containerWidth + "px"
		}, 200, function() {
			self.timeoutId = null;
			self.animating = false;
			self.panelStatus = false;
		} );
	}

	_startPanelListening() {
		var self = this;
		this.$element.on( "mouseenter", function( e ) {
			if( self.timeoutId !== null ) {
				clearTimeout( self.timeoutId );
				self.timeoutId = null;
			}

			if( self.animating ) {
				self._showPanel();
			}
			else {
				if( ! self.panelStatus ) { // if container is shown
					var that = self;
					self.timeoutId = setTimeout( function() {
						that._showPanel();
					}, 400 );
				}
			}
		} );

		this.$element.on( "mouseleave", function( e ) {
			if( self.timeoutId !== null ) {
				clearTimeout( self.timeoutId );
				self.timeoutId = null;
			}

			if( this.animating ) {
				this._hidePanel();
			}
			else {
				if( self.panelStatus ) { //if container is hidden 
					var that = self;
					self.timeoutId = setTimeout( function() {
						that._hidePanel();
					}, 600 );
				}
			}
		} );
	}

	_stopPanelListening() {
		this.$element.off( "mouseenter" );
		this.$element.off( "mouseleave" );
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