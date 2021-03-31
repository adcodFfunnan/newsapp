import { configureStore } from '@reduxjs/toolkit'

import newsReducer from '../features/newsSlice'


export default configureStore({
    reducer: {
        news: newsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})