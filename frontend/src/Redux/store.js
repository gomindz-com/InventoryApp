import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/User";


export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
