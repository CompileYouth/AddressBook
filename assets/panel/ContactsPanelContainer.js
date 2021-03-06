//import ContactsListPanel from "./ContactsListPanel.js";
//import ContactsCollectionPanel from "./ContactsCollectionPanel.js";

export default class ContactsPanelContainer extends React.Component {
	constructor( props ) {
		super( props );

		this.animating = null;
		this.timeoutId = null;
		this.panelStatus = false;//false: hidden, true: shown

		this.state = {
			contacts: [],
			favs: []
		}
		this._initContacts();
		this.selection = null;
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
		this.$listPanel = this.$element.find( ".panel-main #ab-contacts-list" );
		this.$listPanel.perfectScrollbar();
		this.$collectionPanel = this.$element.find( ".panel-main #ab-contacts-collection" );
		this.$collectionPanel.perfectScrollbar();
		this._initNav();
		this._initHeader();

		this._hidePanel();
		this._startPanelListening();

		this.switchToListPanel();
	}

	_initContacts() {
		var self = this;
		$.ajax( {
			url: "assets/users.json"
		} ).done( function( data ) {
			self.contacts = data;
			self.setState( {
				contacts: self.contacts
			} );
			var favs = self.contacts.filter( function( contact, i ) {
				return localStorage.getItem( contact.id );
			} );
			self.setState( {
				favs: favs
			} );
		} );
	}

	showNav() {
		//var eleWidth = this.$element.width();
		var containerWidth = this.$element.find( ".panel-main" ).width();
		//var navWidth = this.$users_li.width();
		this.$element.transit( {
			left: -containerWidth
		} );
	}

	hideNav() {
		var eleWidth = this.$element.width();
		this.$element.transit( {
			left: -eleWidth
		} );
	}

	handleContactClick( contact, event ) {
		this.selection = contact;
		var $selection = $( event.currentTarget );
		$( ".ab-contacts-item" ).removeClass( "selected" );
		$selection.addClass( "selected" );
		
		this.props.onClickContact( contact );
	}

	//add or remove fav contact
	toggleContact() {
		var favs = this.contacts.filter( function( contact, i ) {
			return localStorage.getItem( contact.id );
		} );
		this.setState( {
			favs: favs
		} );
	}

	_initNav() {
		var self = this;
		this.$users_li = $( "<li class=active><span class='fa fa-users h3'></span></li>" );
		this.$users_li.on( "click", function( e ) {
			//select contacts list
			var $ele = $( e.currentTarget );
			if ( $ele.hasClass( "active" ) ) {
				return;
			}

			self.switchToListPanel();
		} );
		this.$collection_li = $( "<li><span class='fa fa-star h3'></span></li>" );
		this.$collection_li.on( "click", function( e ) {
			//select contacts collection
			var $ele  = $( e.currentTarget );
			if ( $ele.hasClass( "active" ) ) {
				return;
			}

			self.switchToCollectionPanel();
		} );
		var $spring_li = $( "<li class=spring></li>" );

		this.$nav = $( "<ul class=panel-icon></ul>" );

		this.$nav.append( this.$users_li );
		this.$nav.append( this.$collection_li );
		this.$nav.append( $spring_li );

		this.$element.append( this.$nav );
	}

	_initHeader() {
		this.$header = $( this.$element.find( ".panel-header" ) );
		var $dock = $( "<div class=dock><span class='fa fa-thumb-tack normal'></span></div>" );

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

	switchToListPanel() {
		var $headerTitle = $( "<div class=title>" + "所有联系人" + "</div>" );

		var $title = this.$header.find( ".title" );
		if( $title ) {
			$title.remove();
		}

		this.$header.append( $headerTitle );

		this.$collection_li.removeClass( "active" );
		this.$users_li.addClass( "active" );

		this.$collectionPanel.hide();
		this.$listPanel.show();
	}

	switchToCollectionPanel() {
		var $headerTitle = $( "<div class=title>" + "个人收藏" + "</div>" );

		var $title = this.$header.find( ".title" );
		if( $title ) {
			$title.remove();
		}

		this.$header.append( $headerTitle );

		this.$users_li.removeClass( "active" );
		this.$collection_li.addClass( "active" );

		this.$listPanel.hide();
		this.$collectionPanel.show();
	}

	render() {
		return (
			<div id="ab-contacts">
				<header className="panel-header" />
				<main className="panel-main">
					<div id="ab-contacts-list" >
					{
						this.state.contacts.map( function( contact, i ) {
							return (
								<li onClick={this.handleContactClick.bind( this, contact )} className="ab-contacts-item" id={ contact.id }>
									<div className="ab-contacts-avatar">
										<img src={contact.pictures.thumbnail} />
									</div>
									<div className="ab-contacts-name">{contact.name.first} &nbsp; {contact.name.last}</div>
								</li>
							);
						}, this)
					}
					</div>
					<div id="ab-contacts-collection">
					{
						this.state.favs.map( function( contact, i ) {
							return (
								<li onClick={this.handleContactClick.bind( this, contact )} className="ab-contacts-item">
									<div className="ab-contacts-avatar">
										<img src={contact.pictures.thumbnail} />
									</div>
									<div className="ab-contacts-name">{contact.name.first} &nbsp; {contact.name.last}</div>
								</li>
							);
						}, this)
					}
					</div>
				</main>
			</div>
		);
	}

	//<li><div className="ab-contacts-avatar"><img src="http://i.imgur.com/UldCeJR.jpg" /></div><div className="ab-contacts-name">陈鹏</div></li>
}