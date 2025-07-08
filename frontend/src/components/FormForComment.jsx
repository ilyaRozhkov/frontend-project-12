import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import getAuthHeader from '../utils/auth'
import axios from 'axios'
import { toast } from 'react-toastify'
import profanityFilter from '../utils/profanityFilter'
import routes from '../routes/index'

const FormForComment = () => {
  const inputEl = useRef(null)
  const { t } = useTranslation()
  const activeChannel = useSelector(
    state => state.activeChannelReducer.activeChannelId,
  )
  useEffect(() => inputEl.current.focus(), [activeChannel])
  const user = JSON.parse(localStorage.getItem('user'))

  const formik = useFormik({
    initialValues: {
      body: '',
      channelId: null,
      username: null,
    },
    onSubmit: async (values) => {
      const message = {
        body: profanityFilter.clean(values.body),
        channelId: activeChannel,
        username: user.username,
      }
      try {
        await axios.post(routes.messagesPath(), message, {
          headers: getAuthHeader(),
        })

        formik.resetForm()
      }
      catch (err) {
        console.error(`${t('network')}, ${err}`)
        toast.error(t('network'))
      }
    },
  })
  const isSubmitDisabled = formik.values.body.trim() === ''

  return (
    <div className="mt-auto py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <Form.Control
            onChange={formik.handleChange}
            className="border-0 p-0 ps-2 form-control"
            placeholder={t('interface_texts.forms.writeMessage')}
            aria-label={t('interface_texts.forms.newMessage')}
            value={formik.values.body}
            ref={inputEl}
            type="text"
            name="body"
            required
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="btn-group-vertical"
            aria-label={t('interface_texts.forms.newMessage')}
            variant="outline-primary"
          >
            <i className="bi bi-send"></i>
            <span className="visually-hidden">
              {t('interface_texts.forms.newMessage')}
            </span>
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default FormForComment
