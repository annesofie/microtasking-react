/**
 * Created by AnneSofie on 04.04.2017.
 */

import React, { Component } from 'react';
import YouTube from 'react-youtube';


class MovieView extends Component {

	constructor(){
		super();

		this.state = {
			player: null
		};

		this._onReady = this._onReady.bind(this);
	}

	_onReady(event) {
		this.setState({
			player: event.target
		});
	}

	render () {
		const opts = {
			height: '390',
			width: '740',
			playerVars: {
				autoPlay: 1 //Yes
			}
		};
		return (
			<YouTube
				videoId="qSuXj_Gmz3k"
				opts={opts}
				onReady={this._onReady}
			/>
		)
	}

}

export default MovieView;
