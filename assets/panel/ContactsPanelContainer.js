import ContactsListPanel from "./ContactsListPanel.js";
import ContactsCollectionPanel from "./ContactsCollectionPanel.js";

export default class ContactsPanelContainer extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
		this._initNav();
		this._initMain();
	}

	_initNav() {
		this.$nav = $( "<ul class=panel-icon><li><span class='fa fa-users h3'></span></li><li class=active><span class='fa fa-star h3'></span></li><li class=spring></li></ul>" );
		this.$element.append( this.$nav );
	}

	_initMain() {
		this.$main = $( "<main class=panel-main></main>" );
		this.$element.append( this.$main );
	}

	render() {
		return (
			<div id="ab-contacts"></div>
		);
	}
}