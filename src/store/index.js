import {combineReducers,createStore,compose} from 'redux';
import {persistReducer,persistStore} from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
// import {} from 'redux';
// import {} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducers/AuthReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth']
}
const rootReducer = combineReducers({
    auth: authReducer,
});



const persistedReducer = persistReducer(persistConfig, rootReducer);
// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const enhancers = composeEnhancers()

export const store = createStore(persistedReducer,composeWithDevTools());
export const persistor = persistStore(store);