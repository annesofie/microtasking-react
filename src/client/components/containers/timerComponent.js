/**
 * Created by AnneSofie on 12.03.2017.
 */

// http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/
import React, { Component } from 'react';

class TimerComponent  extends Component {

	constructor(props) {
		// This is called before our render function. The object that is
		// returned is assigned to this.state, so we can use it later.
		super(props);
		this.state = {
			elapsed: 0
		};
		this.start = Date.now();
		this._tick = this._tick.bind(this);

	}

	componentDidMount () {
		// componentDidMount is called by react when the component
		// has been rendered on the page. We can set the interval here:
		this.timer = setInterval(this._tick, 50);
	}

	componentWillUnmount () {
		// This method is called immediately before the component is removed
		// from the page and destroyed. We can clear the interval here:
		this.props._setTaskTimer(this.state.elapsed);
		clearInterval(this.timer);
	}

	_tick (){

		// This function is called every 50 ms. It updates the
		// elapsed counter. Calling setState causes the component to be re-rendered
		this.setState({elapsed: new Date() - this.start});
	}

	render () {

		// Calculate elapsed to tenth of a second:
		var elapsed = Math.round(this.state.elapsed / 100);

		// This will give a number with one digit after the decimal dot (xx.x):
		var seconds = (elapsed / 10).toFixed(1);

		// Although we return an entire <p> element, react will smartly update
		// only the changed parts, which contain the seconds variable.

		return <p>Task elapsed time <b>{seconds} seconds</b> ago.</p>;
	}
}

export default TimerComponent;
