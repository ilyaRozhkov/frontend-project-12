import { createSlice } from '@reduxjs/toolkit'
import { actions as channelsActions } from './channelsSlice'

const initialState = {
  messages: [],
}
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload
    },
    addMessage(state, { payload }) {
      state.messages.push(payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const channelId = payload.id
      state.messages = state.messages.filter(
        message => message.channelId !== channelId,
      )
    })
  },
})

export const actions = messagesSlice.actions
export default messagesSlice.reducer
