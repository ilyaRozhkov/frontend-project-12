import { useDispatch, useSelector } from 'react-redux'
import modals from './index'
import { actions as modalsActions } from '../../store/modalsSlice'

const ModalRenderer = () => {
  const dispatch = useDispatch()
  const modal = useSelector(state => state.modalsReducer)
  const { type, isOpen, data } = modal
  const Modal = modals(type)

  return isOpen
    ? (
        <Modal data={data} onClose={() => dispatch(modalsActions.closeModal())} />
      )
    : null
}

export default ModalRenderer
