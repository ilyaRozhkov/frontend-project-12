import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getChannelValidation } from '../../utils/validation'
import { toast } from 'react-toastify'
import profanityFilter from '../../utils/profanityFilter'
import getAuthHeader from '../../utils/auth'
import axios from 'axios'
import routes from '../../routes'
import ModalTemplate from './ModalTemplate'

const Rename = ({ data, onClose }) => {
  const { t } = useTranslation()
  const { channels } = useSelector(state => state.channelsReducer)
  const names = channels.map(channel => channel.name)
  const validationSchema = getChannelValidation(t, names)
  const inputEl = useRef(null)
  useEffect(() => {
    inputEl.current.focus()
    inputEl.current.select()
  }, [])

  const texts = {
    toastSuccess: t('toastify.renameChannelSuccess'),
    toastError: t('network'),
    title: t('interface_texts.modals.renameChannel'),
    textLabel: t('interface_texts.modals.channelName'),
    textBtnDiscard: t('interface_texts.modals.btnDiscard'),
    textBtnConfirm: t('interface_texts.modals.btnSend'),
  }

  const getSubmit = async (values) => {
    try {
      const checkValue = {
        name: profanityFilter.clean(values.name),
        id: data.id,
      }
      await axios.patch(`${routes.channelsPath()}/${checkValue.id}`, checkValue, {
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

  const formik = useFormik({
    initialValues: { name: data.name, id: data.id },
    validationSchema: validationSchema,
    onSubmit: getSubmit,
  })

  const isSubmitDisabled = formik.values.name.trim() === ''

  return (
    <div>
      <ModalTemplate
        texts={texts}
        formik={formik}
        onClose={onClose}
        isSubmitDisabled={isSubmitDisabled}
        getSubmit={formik.handleSubmit}
        showInput={true}
        inputEl={inputEl}
        colorBtn="primary"
      />
    </div>
  )
}
export default Rename
