import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import getAuthHeader from '../../utils/auth'
import { toast } from 'react-toastify'
import routes from '../../routes/index'
import ModalTemplate from './ModalTemplate'

const Remove = ({ data, onClose }) => {
  const { channels } = useSelector(state => state.channelsReducer)
  const { t } = useTranslation()
  const channelToRemove = channels.find(channel => channel.id === data)

  const texts = {
    toastSuccess: t('toastify.removeChannelSuccess'),
    toastError: t('network'),
    title: t('interface_texts.modals.removeChannel'),
    textBtnDiscard: t('interface_texts.modals.btnDiscard'),
    textBtnConfirm: t('interface_texts.modals.btnRemove'),
    areYouSure: t('interface_texts.modals.areYouSure'),
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`${routes.channelsPath()}/${channelToRemove.id}`, {
        headers: getAuthHeader(),
      })
      toast.success(texts.toastSuccess)
      onClose()
    }
    catch (error) {
      console.error(`${texts.toastError}: ${error}`)
      toast.error(texts.toastError)
    }
  }

  return (
    <div>
      <ModalTemplate
        texts={texts}
        onClose={onClose}
        getSubmit={handleClick}
        showInput={false}
        colorBtn="danger"
      />
    </div>
  )
}
export default Remove
