import React from 'react';
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'

import Header from './client/components/HeaderComponent';
import MainLayout from './client/components/MainLayout';
import SearchLayout from './client/components/SearchLayout';
import UserList from './client/components/UserList';
import TaskComponent from './client/components/containers/TaskComponent';
import TaskElementComponent from './client/components/containers/TaskElementComponent'

export default class App extends React.Component {
  render() {
    return (
				<Router history={browserHistory}>
					<Route path="/">
						<IndexRoute component={Header}/>
							<Route component={MainLayout}>
								<Route component={SearchLayout}>
									<Route path="users" component={UserList}/>
									<Route path="tasks" component={TaskComponent}/>
									<Route path="tasks/:taskId" component={TaskElementComponent}/>
								</Route>
							</Route>
					</Route>
				</Router>
    )
  }
}
