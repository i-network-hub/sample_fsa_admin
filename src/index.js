import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Switch } from 'react-router'
import { createBrowserHistory } from 'history'

import { AuthProvider } from 'context/AuthContext'
import { UserProvider } from 'context/UserContext'
import { DocumentProvider } from 'context/DocumentContext'

import App from './App'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()

ReactDOM.render(
	<Router history={history}>
		<Switch>
			<AuthProvider>
				<UserProvider>
					<DocumentProvider>
						<App />
					</DocumentProvider>
				</UserProvider>
			</AuthProvider>
		</Switch>
	</Router>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
