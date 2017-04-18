/**
 * Created by hjemme on 18.04.17.
 */

import React, { Component } from 'react';
import { Media, Player, controls } from 'react-media-player';
const { PlayPause, Progress, SeekBar, } = controls;

class newMovieView extends Component {

	constructor() {
		super()
	}

	render() {
		return (
			<Media>
				<div className="media">
					<div className="media-player">
						<Player src="https://youtu.be/qSuXj_Gmz3k"/>
					</div>
					<div className="media-controls">
						<PlayPause className="media-control media-control--play-pause" />
						<div className="media-control-group media-control-group--seek">
							<SeekBar className="media-control media-control--seekbar" />
						</div>
					</div>
				</div>
			</Media>
		)
	}
}

export default newMovieView;
