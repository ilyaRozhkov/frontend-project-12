import { Container } from 'react-bootstrap'
import ChatHeader from './ChatHeader.jsx'
import ChannelsSideBar from './ChannelsSideBar.jsx'
import MessagesBox from './MessagesBox.jsx'

const ChatMain = () => {
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsSideBar />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatHeader />
            <MessagesBox />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ChatMain
