import Dialog from "./Dialog.js";

export default class SettingDialog extends Dialog {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.$element = $( React.findDOMNode( this ) );
		this.dragContext = {
			mouseX: 0,
			mouseY: 0,
			left: 0,
			top: 0
		};
		this.isMoving = false;
		this.makeMoveable();
	}

	/*-------------Handle Method Begin--------------*/

	handleAddressBook() {
		var $ab = $( this.$element.find( "ul .setting-list-ab" ) );
		$ab.toggleClass( "active" );
		this.props.onToggleAddressBook( $ab.hasClass( "active" ) );
	}

	handlePersonalInfo() {
		var $pi = $( this.$element.find( "ul .setting-list-pi" ) );
		$pi.toggleClass( "active" );
		this.props.onTogglePersonalInfo( $pi.hasClass( "active" ) );
	}

	handleClock() {
		var $cl = $( this.$element.find( "ul .setting-list-cl" ) );
		$cl.toggleClass( "active" );
		this.props.onToggleClock( $cl.hasClass( "active" ) );
	}

	/*-------------Handle Method End----------------*/

	/*-------------Event Method Begin---------------*/

	makeMoveable() {
		var self = this;
		var $header = this.$element.find( "header" );
		$header.on( "mousedown", function( e ) {
			e.preventDefault();

			if( self.isMoving ) {
				return;
			}
			self.isMoving = true;

			$header.css( "cursor", "move" );
			self.dragContext.mouseX = e.screenX;
			self.dragContext.mouseY = e.screenY;
			self.dragContext.left = self.$element.position().left;
			self.dragContext.top = self.$element.position().top;

			self.$element.transition( {
				scale: 1.04,
				opacity: 0.68
			}, 100);

			$( document.body ).on( "mousemove", function( e ) {
				//Begin to move
				var mouseOffsetX = e.screenX - self.dragContext.mouseX;
				var mouseOffsetY = e.screenY - self.dragContext.mouseY;

				var newTop = self.dragContext.top + mouseOffsetY;
				var bodyHeight = $( document ).height();
				var headerHeight = $header.height();

				if( newTop <= 0 ) {
					newTop = 0;
				}
				if( ( newTop + headerHeight ) > bodyHeight ) {
					newTop = bodyHeight - headerHeight;
				}

				self.$element.css( {
					top: newTop,
					left: self.dragContext.left + mouseOffsetX
				} );
			} );

			$( document.body ).on( "mouseup", function( e ) {
				$( document.body ).off( "mousemove" );
				$( document.body ).off( "mouseup" );
				$header.css( "cursor", "default" );
				self.$element.transition( {
					scale: 1,
					opacity: 1
				}, 100, function() {
					self.isMoving = false;
				});
			} );

		} );
	}

	/*-------------Event Method End-----------------*/

	render() {
		return (
			<div id="ab-dialog-setting">
				<header className="ab-dialog-setting-header">设置</header>
				<ul className="ab-dialog-setting-list">
					<li>显示通讯录 <span className="setting-button setting-list-ab active" onClick={ this.handleAddressBook.bind( this ) }><span className="button-circle"></span></span></li>
					<li>显示个人信息 <span className="setting-button setting-list-pi active" onClick={ this.handlePersonalInfo.bind( this ) }><span className="button-circle"></span></span></li>
					<li>显示时钟 <span className="setting-button setting-list-cl" onClick={ this.handleClock.bind( this ) }><span className="button-circle"></span></span></li>
				</ul>
			</div>
		);
	}
}