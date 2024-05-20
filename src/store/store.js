import ScreenReducer from '@/services/reducer/ScreenReducer'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer:{
      screen:ScreenReducer, 
    },
    // middleware:(getDefaultMiddleware)=>{
    //     getDefaultMiddleware().concat()
    // }
})


setupListeners(store.dispatch)