/**
 * Created by AnneSofie on 19.02.2017.
 */
import React, {Component} from 'react';

class BoxLayout extends Component {

	render() {
		return (
			<div className="d-flex map-box">
				<div className="d-flex align-items-start"></div>
				<div className="d-flex align-items-end">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default BoxLayout;
