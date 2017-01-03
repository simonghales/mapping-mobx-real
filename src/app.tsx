import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store, {Store} from './store';
import App from './containers/App/App';
import './styles/core.scss';

ReactDOM.render(<App store={store}/>, document.getElementById('main'));
