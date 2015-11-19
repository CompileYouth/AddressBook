import Map from "./map/Map.js";
import ClockPanel from "./panel/ClockPanel.js";
import ContactsPanelContainer from "./panel/ContactsPanelContainer.js";
import Menu from "./menu/Menu.js";
import SettingDialog from "./dialog/SettingDialog.js";
import SearchDialog from "./dialog/SearchDialog.js";
import DetailDialog from "./dialog/DetailDialog.js";
import PersonalInfoPanel from "./panel/PersonalInfoPanel.js";

export default class App extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
		this._initOverlay();
	}

	handleMenuSettingClick() {
		var self = this;
		this._showOverlay( function() {
			self.refs.settingDialog.show();
		} );
	}

	handleMenuLocatingClick( location ) {
		//console.log( location );
		this.refs.map.locateMe( location );
	}

	handleMenuSearchingClick() {
		var self = this;
		this._showOverlay( function() {
			self.refs.searchDialog.show();
		});
	
	}

	handleOverlyClick() {
		//undisplay overlay
		this.refs.settingDialog.hide();
		this.refs.searchDialog.hide();
		this.refs.detailDialog.hide();
		var self = this;
		this.$overlay.transit( {
			opacity: 0
		}, function() {
			self.$overlay.detach();
		} );
	}

	handleClickContact( contact ) {
		var self = this;
		this.refs.detailDialog.activate( contact );
		this._showOverlay( function() {
			self.refs.detailDialog.show();
		});

		this.refs.map.locateContact( contact );
	}

	//add or remove contact
	//action: add, remove
	//state: true-add, fasle-remove
	handleContact( action, contactId ) {
		//console.log( isAdd, contactId );
		var state = null;
		if( action === "add" ) {
			state = true;
		} 
		else if( action === "remove" ) {
			state = false;
		}
		else {
			return;
		}

		this.refs.contactsPanel.toggleContact( state, contactId );
	}

	/*---------------------Setting Dialog Begin-------------------------*/

	//state: true-to open, false-to close
	handleAddressBook( state ) {

		if( state === true ) {
			this.refs.contactsPanel.showNav();
		}
		else if ( state === false ) {
			console.log("hide");
			this.refs.contactsPanel.hideNav();
		}
		else {
			return;
		}
	}

	handlePersonalInfo( state ) {
		console.log("person info");
		console.log(state);
	}

	handleClock( state ) {

		if( state === true ) {
			this.refs.clockPanel.show();
		}
		else if ( state === false ) {
			console.log("hide");
			this.refs.clockPanel.hide();
		}
		else {
			return;
		}
	}

	/*---------------------Setting Dialog End---------------------------*/

	_initOverlay() {
		this.$overlay = $( React.findDOMNode( this.refs.overlay ) );
		this.$overlay.detach();
	}

	_showOverlay( callback ) {
		this.$element.append( this.$overlay );
		this.$overlay.css( "opacity", 0 );
		var self = this;
		this.$overlay.transit( {
			opacity: 1
		}, 150, function() {
			callback();
		} );
	}
	
	render() {
		return (
			<div id="ab-app">
				<Map ref="map" />
				<ClockPanel ref="clockPanel"/>
				<PersonalInfoPanel ref="personalInfoPanel"/>
				<ContactsPanelContainer ref="contactsPanel" onClickContact={ this.handleClickContact.bind( this ) }/>
				<Menu onSettingClick={ this.handleMenuSettingClick.bind( this ) } onLocatingClick={ this.handleMenuLocatingClick.bind( this ) } onSearchingClick={ this.handleMenuSearchingClick.bind( this ) }/>
				<SettingDialog ref="settingDialog" onToggleAddressBook={ this.handleAddressBook.bind( this ) } onTogglePersonalInfo={ this.handlePersonalInfo.bind( this ) } onToggleClock={ this.handleClock.bind( this ) }/>
				<SearchDialog ref="searchDialog" />
				<DetailDialog ref="detailDialog" onToggleContact={ this.handleContact.bind( this ) }/>
				<div id="ab-overlay" ref="overlay" onClick={ this.handleOverlyClick.bind( this ) } />
			</div>
		);
	}
}

/*
<ClockPanel ref="clockPanel"/>
				<PersonalInfoPanel ref="personalInfoPanel"/>
				<ContactsPanelContainer ref="contactsPanel" onClickContact={ this.handleClickContact.bind( this ) }/>
				<Menu onSettingClick={ this.handleMenuSettingClick.bind( this ) } onLocatingClick={ this.handleMenuLocatingClick.bind( this ) } onSearchingClick={ this.handleMenuSearchingClick.bind( this ) }/>
				<SettingDialog ref="settingDialog" onToggleAddressBook={ this.handleAddressBook.bind( this ) } onTogglePersonalInfo={ this.handlePersonalInfo.bind( this ) } onToggleClock={ this.handleClock.bind( this ) }/>
				<SearchDialog ref="searchDialog" />
				<DetailDialog ref="detailDialog" onToggleContact={ this.handleContact.bind( this ) }/>
				<div id="ab-overlay" ref="overlay" onClick={ this.handleOverlyClick.bind( this ) } />

*/