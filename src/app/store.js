import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from '../features/authSlice'
import { patientAuthApi } from '../services/patientAuthApi'

export const store = configureStore({
    reducer: {
        [patientAuthApi.reducerPath]: patientAuthApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(patientAuthApi.middleware),
})

setupListeners(store.dispatch)
