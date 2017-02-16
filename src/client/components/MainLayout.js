/**
 * Created by AnneSofie on 16.02.2017.
 */

import React, {Component} from 'react';

class MainLayout extends Component {

	render() {
		return (
			<div id="main-layout" className="container-fluid">
				<div className="d-flex flex-row justify-content-center">
					<h3 className="header-text">Micro tasking Survey</h3>
				</div>
				{this.props.children}
			</div>
		);
	}
}

export default MainLayout;
