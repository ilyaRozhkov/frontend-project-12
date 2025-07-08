import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Messages = ({ messagesBoxRef }) => {
  const messages = useSelector(state => state.messagesReducer.messages)
  const activeChannel = useSelector(
    state => state.activeChannelReducer.activeChannelId,
  )
  const currentMessages = messages.filter(
    message => message.channelId === activeChannel,
  )
  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight
  }, [currentMessages, activeChannel])

  if (messages.length > 0) {
    return (
      <div>
        {currentMessages.map(message => (
          <div key={message.id} className="text-break mb-2">
            <b>
              {message.username}
            </b>
            :
            {message.body}
          </div>
        ))}
      </div>
    )
  }
  else {
    return null
  }
}
export default Messages
