

export default class ClockPanel extends React.Component {
	constructor( props ) {
		super( props );
		
		this.state = {
			now: new Date()
		}
		console.log( "clock" );
	}
	
	componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        setTimeout( this.update.bind(this), 1000 );
    }
	
	update() {
		var now = new Date();
		this.setState({
			now: now
		});
	}
	
	render() {
		var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		var now = this.state.now;
		var hour = now.getHours();
		var minute = now.getMinutes();
		var month = now.getMonth() + 1;
		var year = now.getFullYear();
		var day = now.getDate();
		var week = now.getDay();
		
		hour = hour > 9 ? hour : "0" + hour;
		minute = minute > 9 ? minute : "0" + minute;
		month = month > 9 ? month : "0" + month;
		day = day > 9 ? day : "0" + day;
		
		var date = year + "-" + month + "-" + day;
		var week = "(" + weeks[week] + ")";
		
		return (
			<div id="ab-clock">
				<time className="time h2">
				    <span className="hour">{hour}</span>
				    <span className="separator">:</span>
				    <span className="minute">{minute}</span>
				</time>
				<time className="date-week">
					<span className="date">{date}</span>
					<span className="week">{week}</span>
				</time>
			</div>
		);
	}
}