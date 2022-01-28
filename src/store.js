import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

const createStoreWithMiddleware = applyMiddleware()(createStore);
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();;

const store = createStoreWithMiddleware(
    reducers,
    // enhancer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
