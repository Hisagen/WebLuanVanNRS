import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import vienchucReducer from "./vienchucReducer";
import adminReducer from "./adminReducer";
import benhnhanReducer from "./benhnhanReducer";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const vienchucPersistConfig = {
    ...persistCommonConfig,
    key: 'vienchuc',
    whitelist: ['isLoggedIn', 'vienchucInfo']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
};


const benhnhanPersistConfig = {
    ...persistCommonConfig,
    key: 'benhnhan',
    whitelist: ['isLoggedInBN', 'benhnhanInfo']
};

export default (history) => combineReducers({
    router: connectRouter(history),
    vienchuc: persistReducer(vienchucPersistConfig, vienchucReducer),
    benhnhan: persistReducer(benhnhanPersistConfig, benhnhanReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer
})   