import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { actions as messagesActions } from '../store/messagesSlice.js'
import { actions as channelActions } from '../store/channelsSlice.js'
import { actions as activeChannelIdActions } from '../store/activeChannelSlice.js'
import ChatMain from '../components/ChatMain.jsx'
import Waiting from '../components/Spinner.jsx'
import getAuthHeader from '../utils/auth.js'
import routes from '../routes/index.js'

const ChatPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseChannels = await axios.get(routes.channelsPath(), {
          headers: getAuthHeader(),
        })
        dispatch(channelActions.setChannels(responseChannels.data))
        if (responseChannels.data.length > 0) {
          dispatch(
            activeChannelIdActions.setActiveChannelId(
              responseChannels.data[0].id,
            ),
          )
        }
        const responseMessages = await axios.get(routes.messagesPath(), {
          headers: getAuthHeader(),
        })
        dispatch(messagesActions.setMessages(responseMessages.data))
        setLoading(false)
      }
      catch (err) {
        console.log(err.response)
        if (err.response && err.response.status === 401) {
          navigate('/login')
        }
        toast.error(t('network'))
        setLoading(false)
      }
    }
    fetchData()
  }, [dispatch, t])

  if (loading) {
    return <Waiting />
  }
  return <ChatMain />
}
export default ChatPage
