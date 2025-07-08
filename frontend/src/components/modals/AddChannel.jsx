import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import getAuthHeader from '../../utils/auth'
import axios from 'axios'
import { getChannelValidation } from '../../utils/validation'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import profanityFilter from '../../utils/profanityFilter'
import routes from '../../routes/index'
import ModalTemplate from './ModalTemplate'
import { actions as activeChannelActions } from '../../store/activeChannelSlice'

const Add = ({ onClose }) => {
  const { channels } = useSelector(state => state.channelsReducer)
  console.log('CHANNELS', channels)

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const names = channels.map(channel => channel.name)
  const validationSchema = getChannelValidation(t, names)
  const inputEl = useRef(null)
  useEffect(() => {
    inputEl.current.focus()
  })

  const texts = {
    toastSuccess: t('toastify.addChannelSuccess'),
    toastError: t('network'),
    title: t('interface_texts.modals.addChannel'),
    textLabel: t('interface_texts.modals.channelName'),
    textBtnDiscard: t('interface_texts.modals.btnDiscard'),
    textBtnConfirm: t('interface_texts.modals.btnSend'),
  }

  const getSubmit = async (values) => {
    const newChannel = { name: profanityFilter.clean(values.name) }
    console.log('NEWCHANNEL', newChannel.name)
    try {
      const response = await axios.post(routes.channelsPath(), newChannel, {
        headers: getAuthHeader(),
      })
      dispatch(activeChannelActions.setActiveChannelId(response.data.id))
      toast.success(texts.toastSuccess)
      formik.resetForm()
      onClose()
    }
    catch (error) {
      console.error(`${texts.toastError}: ${error}`)
      toast.error(texts.toastError)
    }
    finally {
      formik.setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: validationSchema,
    onSubmit: getSubmit,
  })

  const isSubmitDisabled = formik.values.name.trim() === ''
  console.log(isSubmitDisabled)
  console.log(formik.errors)
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
export default Add
