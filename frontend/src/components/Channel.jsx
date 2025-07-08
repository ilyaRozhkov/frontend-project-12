import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { actions as activeChannelIdActions } from '../store/activeChannelSlice'
import Menu from './modals/Menu'

const Channel = ({ channel }) => {
  const dispatch = useDispatch()
  const activeChannelId = useSelector(
    state => state.activeChannelReducer.activeChannelId,
  )

  const handleClick = () => {
    dispatch(activeChannelIdActions.setActiveChannelId(channel.id))
  }

  const classBtn
    = activeChannelId === channel.id
      ? 'rounded-0 text-start btn btn-secondary'
      : 'rounded-0 text-start btn btn-light'

  const classToggle
    = activeChannelId === channel.id
      ? 'btn-secondary rounded-0'
      : 'btn-light rounded-0'

  return (
    <div className="d-flex btn-group ">
      <Button
        onClick={handleClick}
        name={channel?.name}
        aria-label={channel?.name}
        type="button"
        className={`${classBtn} text-truncate `}
      >
        <span className="me-1">
          #
        </span>
        {channel?.name}
      </Button>
      {channel.removable === true && (
        <Menu className={classToggle} channel={channel} />
      )}
    </div>
  )
}

export default Channel
