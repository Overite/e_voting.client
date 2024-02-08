import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LayoutState } from '@/interface/layout';


const initialState: LayoutState = {
  right_menu_shown: false,
  side_bar_shown: true
}

export const layout_slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
      toggle_right_menu_shown: (state) => {
          state.right_menu_shown = !state.right_menu_shown;
    },
      toggle_side_bar_shown: (state) => {
          state.side_bar_shown = !state.side_bar_shown;
    }
  },
})

export const { toggle_right_menu_shown, toggle_side_bar_shown } = layout_slice.actions

export default layout_slice.reducer