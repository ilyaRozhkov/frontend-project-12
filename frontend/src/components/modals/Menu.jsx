import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux'
import { actions as modalsActions } from '../../store/modalsSlice'
import { useTranslation } from 'react-i18next'

const Menu = ({ className, channel }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleClickRename = (data) => {
    const renaming = { type: 'renaming', data: data }
    dispatch(modalsActions.openModal(renaming))
  }

  const handleClickRemove = (channel) => {
    const removing = { type: 'removing', data: channel.id }
    dispatch(modalsActions.openModal(removing))
  }
  return (
    <Dropdown>
      <Dropdown.Toggle
        id={channel.id}
        className={`btn ${className} flex-grow-0`}
      >
        {' '}
        <span className="visually-hidden">
          {t('interface_texts.modals.menuManage')}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleClickRemove(channel)} eventKey="1">
          {t('interface_texts.modals.menuRemove')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleClickRename(channel)} eventKey="2">
          {t('interface_texts.modals.menuRename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Menu
