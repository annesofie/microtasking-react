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
		this._onPlayVideo = this._onPlayVideo.bind(this);
		this._onPauseVideo = this._onPauseVideo.bind(this);
	}

	_onReady(event) {
		this.setState({
			player: event.target
		});
	}

	_onPlayVideo() {
		this.state.player.playVideo();
	}

	_onPauseVideo() {
		this.state.player.pauseVideo();
	}

	_onEnd() {

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
			<div>
				<YouTube
					videoId="qSuXj_Gmz3k"
					opts={opts}
					onReady={this._onReady}
				/>
			</div>
		)
	}

}

export default MovieView;
