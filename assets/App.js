import Map from "./map/Map.js";
import ClockPanel from "./panel/ClockPanel.js";
import ContactsPanelContainer from "./panel/ContactsPanelContainer.js";
import Menu from "./menu/Menu.js";
import SettingDialog from "./dialog/SettingDialog.js";
import SearchDialog from "./dialog/SearchDialog.js";

export default class App extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
		this._initOverlay();
	}

	handleMenuSettingClick() {
		console.log("handleMenuSettingClick");

		this._showOverlay( function() {
			console.log( "popup setting dialog");

		} );
	}

	handleMenuLocatingClick() {
		console.log("handleMenuLocatingClick");
	}

	handleMenuSearchingClick() {
		console.log("handleMenuSearchingClick");
		var self = this;
		this._showOverlay( function() {
			console.log("popup  searching dialog ");
			self.refs.searchDialog.show();
		});
	
	}

	handleOverlyClick() {
		//undisplay overlay
		this.refs.settingDialog.hide();
		this.refs.searchDialog.hide();
		var self = this;
		this.$overlay.transit( {
			opacity: 0
		}, function() {
			self.$overlay.detach();
		} );
	}

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
				<ClockPanel />
				<ContactsPanelContainer />
				<Menu onSettingClick={ this.handleMenuSettingClick.bind( this ) } onLocatingClick={ this.handleMenuLocatingClick.bind( this ) } onSearchingClick={ this.handleMenuSearchingClick.bind( this ) }/>
				<SettingDialog ref="settingDialog" />
				<SearchDialog ref="searchDialog" />
				<div id="ab-overlay" ref="overlay" onClick={ this.handleOverlyClick.bind( this ) } />
			</div>
		);
	}
}