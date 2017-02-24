/**
 * Created by AnneSofie on 24.02.2017.
 */

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default function(props) {
	var arrayTable = responseHandler(props.elem);
	return (

			<BootstrapTable data={arrayTable}>
				<TableHeaderColumn dataField='properties.title' isKey={ true } dataSort={ true }>Title</TableHeaderColumn>
				<TableHeaderColumn dataField='properties.info1' dataSort={ true }>Info</TableHeaderColumn>
				<TableHeaderColumn dataField='properties.info2' dataSort={ true }>Info</TableHeaderColumn>
				<TableHeaderColumn dataField='properties.info3' dataSort={ true }>Info</TableHeaderColumn>
			</BootstrapTable>
		);

}

function responseHandler(elem) {
	var flatArray = [];
	$.each(elem, function(i, element) {
		flatArray.push(JSON.flatten(element));
	});
	return flatArray;
}
JSON.flatten = function(data) {
	var result = {};
	function recurse (cur, prop) {
		if (Object(cur) !== cur) {
			result[prop] = cur;
		} else if (Array.isArray(cur)) {
			for(var i=0, l=cur.length; i<l; i++)
				recurse(cur[i], prop ? prop+"."+i : ""+i);
			if (l == 0)
				result[prop] = [];
		} else {
			var isEmpty = true;
			for (var p in cur) {
				isEmpty = false;
				recurse(cur[p], prop ? prop+"."+p : p);
			}
			if (isEmpty)
				result[prop] = {};
		}
	}
	recurse(data, "");
	return result;
}

