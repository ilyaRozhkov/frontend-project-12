import { useSelector } from 'react-redux'

import Channel from './Channel.jsx'

const Channels = () => {
  const { channels } = useSelector(state => state.channelsReducer)

  return channels.map(channel => (
    <li key={channel.id} className="nav-item w-100">
      <Channel channel={channel} />
    </li>
  ))
}

export default Channels
