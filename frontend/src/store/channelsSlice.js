import { createSlice } from '@reduxjs/toolkit'

const initialState = { channels: [] }
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload
    },
    addChannel(state, { payload }) {
      console.log('ADDPAYLOAD', payload)
      state.channels.push(payload)
    },
    removeChannel(state, { payload }) {
      const { id } = payload
      state.channels = state.channels.filter(channel => channel.id !== id)
    },
    renameChannel(state, { payload }) {
      const stateNew = state.channels.find(
        channel => channel.id === payload.id,
      )
      stateNew.name = payload.name
    },
  },
})
export const actions = channelsSlice.actions
export default channelsSlice.reducer
