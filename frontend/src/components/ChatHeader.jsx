import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const ChatHeader = () => {
  const { t } = useTranslation()
  const activeId = useSelector(
    state => state.activeChannelReducer.activeChannelId,
  )
  const channels = useSelector(state => state.channelsReducer.channels)
  const activeTitle = channels.find(channel => channel.id === activeId)

  const countMessages = useSelector(
    state => state.messagesReducer.messages,
  ).filter(message => message.channelId === activeId).length
  console.log('activeTitle',activeTitle)
  return (
    <div className="bg-light p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {activeTitle?.name}
        </b>
      </p>
      <span className="text-muted">
        {t('interface_texts.messages.key', { count: countMessages })}
      </span>
    </div>
  )
}

export default ChatHeader
