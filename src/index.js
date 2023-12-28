import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import ToasterContext from "./context/ToasterContext";

import { Provider } from 'react-redux';

import store from './store/configureStore';
import { UserAuthContextProvider } from './context/UserAuthContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<UserAuthContextProvider>
				<BrowserRouter>
					<ToasterContext />
					<App />
				</BrowserRouter>
			</UserAuthContextProvider>
		</Provider>
	</React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
