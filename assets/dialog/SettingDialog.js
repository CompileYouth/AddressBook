import Dialog from "./Dialog.js";

export default class SettingDialog extends Dialog {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div id="ab-dialog-setting">
				<header className="ab-dialog-setting-header">设置</header>
				<ul className="ab-dialog-setting-list">
					<li>显示通讯录 <span className="setting-button"><span className="button-circle"></span></span></li>
					<li>显示个人信息 <span className="setting-button"><span className="button-circle"></span></span></li>
					<li>显示时钟 <span className="setting-button"><span className="button-circle"></span></span></li>
				</ul>
			</div>
		);
	}
}