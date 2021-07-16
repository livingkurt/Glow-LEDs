import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';
import './scss/style.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
// ES module-style import
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { ErrorView } from './components/UtilityComponents';
require('dotenv').config();

Bugsnag.start({
	apiKey: process.env.REACT_APP_BUGSNAG_KEY,
	plugins: [ new BugsnagPluginReact() ]
});

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundary FallbackComponent={ErrorView}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</ErrorBoundary>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
reportWebVitals();

// import React from 'react';
// import { Provider } from 'react-redux';
// import ReactDOM from 'react-dom';
// import store from './store';
// import './scss/style.scss';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
// 	<Provider store={store}>
// 		<React.StrictMode><App/></React.StrictMode>
// 	</Provider>,
// 	document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// reportWebVitals();
