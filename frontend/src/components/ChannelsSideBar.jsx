import Channels from './Channels'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { actions as modalsActions } from '../store/modalsSlice'

const ChannelsSideBar = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const handleClick = () => {
    const adding = { type: 'adding', data: null }
    dispatch(modalsActions.openModal(adding))
  }
  return (
    <div className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>
          {t('interface_texts.chatPageChannels')}
        </b>
        <Button
          onClick={handleClick}
          type="button"
          className="p-0 text-primary"
          variant="group-vertical outline-light"
          aria-label={t('interface_texts.modals.addChannel')}
        >
          <i className="bi bi-plus-square" aria-hidden="true"></i>
          <span className="visually-hidden">
            +
          </span>

        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        <Channels />
      </ul>
    </div>
  )
}

export default ChannelsSideBar
