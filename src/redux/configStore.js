import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Auth } from './auth'


export const ConfigStore = () => {
    const store = createStore(
        combineReducers({
            auth : Auth
        }),
        applyMiddleware(thunk)
    )
    return store;
}