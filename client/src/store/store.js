import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loggedInUserReducer from "./loggedInUserSlice";
import selectecUserReducer from './selectedUserSlice';
import messagesReducer from './allMessagesBetweenUserSlice';
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    user: loggedInUserReducer,
    selectedUser: selectecUserReducer,
    allMessages: messagesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };