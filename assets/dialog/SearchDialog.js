import Dialog from "./Dialog.js";

export default class SearchDialog extends Dialog {
	constructor( props ) {
		super( props );

		this.state = {
			contacts: [],
			searchContacts: []
		}
	}

	componentDidMount() {
		this._initAllUsers();

		this.$element = $ ( React.findDOMNode( this ) );
		this.$input = this.$element.find( "input" );
	}

	handleSearch() {
		var search = this.$input.val().trim().toLowerCase();
		const contacts = this.state.contacts;
		var searchResults = contacts.filter( ( contact, ind ) => {
				return contact.name.first.toLowerCase().indexOf(search) > -1 || contact.name.last.toLowerCase().indexOf(search) > -1;
		} );
		console.log(searchResults);
		if(searchResults.length > 5) {
			this.setState({
				searchContacts: [ searchResults[0], searchResults[1], searchResults[2], searchResults[3], searchResults[4] ]
			});
		}
		else {
			this.setState({
				searchContacts: searchResults
			});
		}
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
		const searchContacts = this.state.searchContact;

		let search_li;
		if(searchContacts instanceof Array) {
			search_li = searchContacts.map(function(single) {
				return (
					<li>{single.name.first} &nbsp; {single.name.last}</li>
				);
			}, this)
		}
		else {
			search_li = null;
		}
		return (
			<div id="ab-dialog-searching">
				<input type="text" onChange={ this.handleSearch.bind( this ) }/>
				<span className="fa fa-search"></span>
				<ul className="ab-dialog-searching-list">
				{
					search_li					
				}
				</ul>
			</div>
		);
	}
}