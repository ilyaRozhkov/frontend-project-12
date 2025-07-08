import { io } from 'socket.io-client'
import store from './store/index'
import { actions as messagesActions } from './store/messagesSlice'
import { actions as channelsActions } from './store/channelsSlice'
import { actions as activeChannelActions } from './store/activeChannelSlice'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './utils/locales/index'

const init = () => {
  const socket = io()
  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload))
  })
  socket.on('newChannel', (payload) => {
    console.log('SOCKETADD', payload)
    store.dispatch(channelsActions.addChannel(payload))
    console.log(store.getState())
  })
  socket.on('removeChannel', (payload) => {
    const { id } = payload
    const state = store.getState()
    const activId = state.activeChannelReducer.activeChannelId
    if (activId === id) {
      store.dispatch(activeChannelActions.setActiveChannelId('1'))
    }
    store.dispatch(channelsActions.removeChannel(payload))
  })
  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload))
  })
  return { socket }
}

i18next.use(initReactI18next).init({
  lng: 'ru',
  resources,
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  debug: false,
})

export { init, i18next }
