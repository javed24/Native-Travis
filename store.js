import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';

// export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk];

const devToolsExtension = window.devToolsExtension;

if (typeof devToolsExtension === 'function') {
enhancers.push(devToolsExtension());
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
