import Dialog from "./Dialog.js";

export default class SearchDialog extends Dialog {
	constructor( props ) {
		super( props );

		this.state = {
			contacts: []
		}
	}

	componentDidMount() {
		this._initAllUsers();

		this.$element = $ ( React.findDOMNode( this ) );
		this.$input = this.$element.find( "input" );
	}

	handleSearch() {
		var search = this.$input.val().trim();
		const contacts = this.state.contacts;
		var searchResults = contacts.filter( ( contact, ind ) => {

		} );
	}

	_initAllUsers() {
		$.ajax( {
			url: "assets/users.json"
		} ).done( ( data ) => {
			this.setState( {
				contacts: data
			} );
		} );
	}

	render() {
		return (
			<div id="ab-dialog-searching">
				<input type="text" onChange={ this.handleSearch.bind( this ) }/>
				<span className="fa fa-search"></span>
				<ul className="ab-dialog-searching-list"></ul>
			</div>
		);
	}
}