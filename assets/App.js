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

	handleMenuLocatingClick() {
		console.log("handleMenuLocatingClick");
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
	}

	/*---------------------Setting Dialog Begin-------------------------*/

	//state: true-to open, false-to close
	handleAddressBook( state ) {
		console.log("address book");
		console.log(state);
	}

	handlePersonalInfo( state ) {
		console.log("person info");
		console.log(state);
	}

	handleClock( state ) {
		console.log("clock");
		console.log(state);
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
				<Map />
				<ClockPanel ref="clockPanel"/>
				<PersonalInfoPanel ref="personalInfoPanel"/>
				<ContactsPanelContainer ref="contactsPanel" onClickContact={ this.handleClickContact.bind( this ) }/>
				<Menu onSettingClick={ this.handleMenuSettingClick.bind( this ) } onLocatingClick={ this.handleMenuLocatingClick.bind( this ) } onSearchingClick={ this.handleMenuSearchingClick.bind( this ) }/>
				<SettingDialog ref="settingDialog" onToggleAddressBook={ this.handleAddressBook.bind( this ) } onTogglePersonalInfo={ this.handlePersonalInfo.bind( this ) } onToggleClock={ this.handleClock.bind( this ) }/>
				<SearchDialog ref="searchDialog" />
				<DetailDialog ref="detailDialog" />
				<div id="ab-overlay" ref="overlay" onClick={ this.handleOverlyClick.bind( this ) } />
			</div>
		);
	}
}