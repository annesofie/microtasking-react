/**
 * Created by AnneSofie on 19.02.2017.
 */
import React, {Component} from 'react';

class BoxLayout extends Component {

	render() {
		return (
			<div className="d-flex flex-column map-box">
					{this.props.children}
				<div className="search-footer pagination"></div>
			</div>
		);
	}
}

export default BoxLayout;
