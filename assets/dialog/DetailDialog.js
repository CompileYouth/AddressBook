import Dialog from "./Dialog.js";

export default class DetailDialog extends Dialog {
	constructor( props ) {
		super( props );

		this.state = {
			contact: {
				id: "",
				picture: "",
				name: "",
				phone: "",
				email: "",
				location: ""
			}
		};
	}

	componentDidMount() {
		var self = this;
		this.$element = $( React.findDOMNode( this ) );
		this.dragContext = {
			mouseX: 0,
			mouseY: 0,
			left: 0,
			top: 0
		};
		this.isMoving = false;
		this.makeMoveable();

		this.$fav = this.$element.find( "main .detail-fav" );
	}

	handleFavClick() {
		//this.$fav.toggleClass( "collected" );
		if( this.$fav.hasClass( "collected" ) ) {
			this.$fav.removeClass( "collected" );
			//remove in localstorage
			localStorage.removeItem( this.state.contact.id );
			//remove in collection panel
			this.props.onToggleContact( "remove", this.state.contact.id );
		}
		else {
			this.$fav.addClass( "collected" );
			//add in localstorage
			localStorage.setItem( this.state.contact.id, this.state.contact );
			//add in collection panel
			this.props.onToggleContact( "add", this.state.contact.id );
		}
	}



	activate( contact ) {
		console.log( contact );
		var self = this;
		var lat = contact.location.lat;
		var lng = contact.location.lng;
		var url = "http://api.map.baidu.com/geocoder/v2/?ak=WZ0bInNGG6AEdGeDygBS4LBX&location=" 
					+ lat + "," + lng + "&output=json&pois=0";
		$.ajax( {
			url: url,
			success: function( data ) {
				console.log( data );
				if( data.responseText ) {
					var locationInfo = $.parseJSON( data.responseText );
					if( locationInfo.result ) {
						self.setState({
							contact: {
								id: contact.id,
								picture: contact.pictures.medium,
								name: contact.name.last,
								phone: contact.phone,
								email: contact.email,
								location: locationInfo.result.formatted_address
							}
						});
					}
				}
			},
			error: function( data ) {
				if( data.responseText ) {
					var locationInfo = $.parseJSON( data.responseText );
					if( locationInfo.result ) {
						self.setState({
							contact: {
								id: contact.id,
								picture: contact.pictures.medium,
								name: contact.name.last,
								phone: contact.phone,
								email: contact.email,
								location: locationInfo.result.formatted_address
							}
						});
					}
				}
			}
		} );

		var contactId = contact.id;
		if( localStorage.getItem( contactId ) !== null ) {
			this.$fav.addClass( "collected" );
		} else {
			this.$fav.removeClass( "collected" );
		}

	}

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

	render() {
		var contact = this.state.contact;

		return (
			<div id="ab-dialog-detail">
				<header className="ab-dialog-detail-header">详细信息</header>
				<main>
					<div className="detail-photo"><img src={ contact.picture} /></div>
					<div className="detail-name">{ contact.name }</div>
					<div className="detail-fav" onClick={ this.handleFavClick.bind( this ) }>
						<span className="fa fa-star-o h3"></span>
						<span className="fa fa-star h3"></span>
					</div>
					<div className="detail-phone">
						<div className="title">电话</div>
						<div className="content">{ contact.phone } <span className="fa fa-phone"></span></div>
					</div>
					<div className="detail-email">
						<div className="title">邮件</div>
						<div className="content">{ contact.email } <span className="fa fa-envelope-o"></span></div>
					</div>
					<div className="detail-address">
						<div className="title">地址</div>
						<div className="content">{ contact.location } &nbsp; {contact.location.lng } <span className="fa fa-map"></span></div>
					</div>
				</main>
			</div>
		);
	}
}