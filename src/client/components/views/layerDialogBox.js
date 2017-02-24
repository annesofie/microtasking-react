/**
 * Created by AnneSofie on 24.02.2017.
 */
import React, {Component} from 'react';

//Presentational Components should never change the prop data itself.
//In fact, any component that receives props should consider that data immutable and owned by the parent.

export default function(props) {
	return (
		<div id="ridgeLineBox" className="row-fluid overlay ridgeLineBox">
			<a style="margin-left: 60%;" className="btn">Lukk</a>
			<h4>Set geometry</h4>
			<div className="row-fluid text-center">
				<button className="btn" onClick={props.onClick} >Angi</button>
			</div>
			<div className="row-fluid">
				<p><i>If no, clik the layer with correct geometry</i></p>
			</div>
		</div>
	)
}
