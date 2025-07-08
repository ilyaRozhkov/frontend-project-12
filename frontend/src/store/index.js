import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from './messagesSlice.js'
import channelsReducer from './channelsSlice.js'
import activeChannelReducer from './activeChannelSlice.js'
import modalsReducer from './modalsSlice.js'

const store = configureStore({
  reducer: {
    messagesReducer,
    channelsReducer,
    activeChannelReducer,
    modalsReducer,
  },
})

export default store
