import React from 'react';
import { browserHistory, Router, Route, Link, IndexRoute, hashHistory } from 'react-router'

import Header from './client/components/HeaderComponent';
import MainLayout from './client/components/MainLayout';
import SearchLayout from './client/components/SearchLayout';
import BoxLayout from './client/components/BoxLayout';
import UserList from './client/components/UserList';
import TaskComponent from './client/components/containers/TaskComponent';
import TaskElementsComponent from './client/components/containers/TaskElementComponent';
import MapLayout from './client/components/views/MapView';

export default class App extends React.Component {
  render() {
    return (
				<Router history={hashHistory}>
					<Route path="/">
						<IndexRoute component={Header}/>
							<Route component={MainLayout}>
								<Route component={SearchLayout}>
									<Route path="users" component={UserList}/>
									<Route path="tasks" component={TaskComponent}/>
									<Route path="tasks/:taskId" component={TaskElementsComponent}/>
								</Route>
								<Route component={BoxLayout}>
									<Route path="map" component={MapLayout}/>
								</Route>
							</Route>
					</Route>
				</Router>
    )
  }
}
