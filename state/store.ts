
import { configureStore } from '@reduxjs/toolkit'
import layout_slice from './slices/layout_slice'

export const store = configureStore({
  reducer: {
    layout: layout_slice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch