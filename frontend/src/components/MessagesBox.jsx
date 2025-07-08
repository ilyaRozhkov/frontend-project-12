import FormForComment from './FormForComment'
import Messages from './Messages'
import { useRef } from 'react'

const MessagesBox = () => {
  const messagesBoxRef = useRef(null)
  return (
    <>
      <div
        ref={messagesBoxRef}
        id="messages-box"
        className="chat-messages flex-grow-1 overflow-auto px-5"
      >
        <Messages messagesBoxRef={messagesBoxRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <FormForComment />
      </div>
    </>
  )
}

export default MessagesBox
