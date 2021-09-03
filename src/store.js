import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();;

const store = createStoreWithMiddleware(
    reducers,
    enhancer,
    applyMiddleware(thunk)
);

export default store;
