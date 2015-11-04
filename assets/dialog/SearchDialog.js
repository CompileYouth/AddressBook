import Dialog from "./Dialog.js";

export default class SearchDialog extends Dialog {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div id="ab-dialog-searching">
				<input type="text" />
				<span className="fa fa-search"></span>
				<ul className="ab-dialog-searching-list"></ul>
			</div>
		);
	}
}