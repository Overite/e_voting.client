import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/state/store'

interface LayoutState {
  right_menu_shown: boolean
}

const initialState: LayoutState = {
  right_menu_shown: false
}

export const layout_slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
      toggle_right_menu_shown: (state) => {
          state.right_menu_shown = !state.right_menu_shown;
    }
  },
})

export const { toggle_right_menu_shown } = layout_slice.actions

export default layout_slice.reducer