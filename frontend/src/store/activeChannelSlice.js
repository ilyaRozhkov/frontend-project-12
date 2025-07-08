import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeChannelId: 1,
}
const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannelId(state, { payload }) {
      state.activeChannelId = payload
    },
  },
})
export const actions = activeChannelSlice.actions
export default activeChannelSlice.reducer
