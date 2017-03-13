/**
 * Created by AnneSofie on 10.03.2017.
 */


var base = this.props.taskElemConflPair;
tableTaskPair =
	<table key={'tableonetask'} className="fixed_headers">
		<thead>
		<tr>
			<th key="title1">Object</th>
			<th key="title2">Info 1</th>
			<th key="title3">Info 2</th>
			<th key="title4">Info 3</th>
		</tr>
		</thead>
		<tbody>
		<tr key="colelem">
			<td key={0+base.elem.id}>
				<input type="radio" name="meta_choice"
							 value={base.elem.properties.title} onChange={this.props.onChange.bind(this, null)}/>
				{base.elem.properties.title}
			</td>
			<td key={1+base.elem.id}>{base.elem.properties.info1}</td>
			<td key={2+base.elem.id}>{base.elem.properties.info2}</td>
			<td key={3+base.elem.id}>{base.elem.properties.info3}</td>
		</tr>
		<tr key="colconfl">
			<td key={0+base.confl.id}>
				<input type="radio" name="meta_choice"
							 value={base.confl.properties.title} onChange={this.props.onChange.bind(this, null)}/>
				{base.confl.properties.title}
			</td>
			<td key={1+base.confl.id}>{base.confl.properties.info1}</td>
			<td key={2+base.confl.id}>{base.confl.properties.info2}</td>
			<td key={3+base.confl.id}>{base.confl.properties.info3}</td>
		</tr>
		</tbody>
	</table>;
