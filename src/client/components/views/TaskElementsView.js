/**
 * Created by AnneSofie on 16.02.2017.
 */

import React, {Component} from 'react';
import { Link } from 'react-router';

//Presentational Components should never change the prop data itself.
//In fact, any component that receives props should consider that data immutable and owned by the parent.

export default function(props) {
	return (
		<div className="d-flex flex-column data-list">
			{props.elements.map(element => {
				return (
					<div key={element.id} className="p-2 data-list-item">
						<div className="details">
							<h3>{element.element_name}</h3>
							<p>
								{element.element_geom}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	)
}

