/**
 * Created by AnneSofie on 16.02.2017.
 */

import React, {Component} from 'react';

class SearchLayout extends Component {

	render() {
		return (
			<div className="d-flex info-box">
				<div className="results">
					{this.props.children}
				</div>
				<div className="search-footer pagination"></div>
			</div>
		);
	}
}

export default SearchLayout;
