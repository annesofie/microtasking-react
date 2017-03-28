/**
 * Created by AnneSofie on 10.03.2017.
 */

import React, { Component } from 'react';

class ProgressbarView extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount(){
		window.onbeforeunload = confirmExit;
		function confirmExit()
		{
			return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
		}
	}

	render() {
		//this.changeProgressTitle(0);
		return (
			<div className="progressDIV">
				<p className="pull-left media-name text-muted">Survey progress</p>
				<div className="progress progressBar">
					<div className="progress-bar progress-bar-striped progress-bar-orange"
							 role="progressbar"
							 style={{width: this.props.percent+'%'}}
							 aria-valuenow={this.props.percent}
							 aria-valuemin="0"
							 aria-valuemax="100">{this.props.title}</div>
				</div>
			</div>
		)
	}
}

export default ProgressbarView;
