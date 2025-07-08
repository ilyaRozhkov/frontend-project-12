import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import useAuth from '../hooks/index.jsx'
import routes from '../routes/index.js'

const FormLogin = () => {
  const inputEl = useRef(null)
  const navigate = useNavigate()
  const auth = useAuth()
  const { t } = useTranslation()

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), {
          username: values.username,
          password: values.password,
        })
        localStorage.setItem('user', JSON.stringify(response.data))
        auth.logIn()
        navigate('/')
        formik.resetForm()
      }
      catch (err) {
        formik.setErrors({ auth: t('validation.auth') })
        if (err.isAxiosError && err.response.status === 401) {
          inputEl.current.select()
        }
        throw err
      }
    },
  })

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
              <h1 className="text-center mb-4">
                {t('interface_texts.loginPageBtn')}
              </h1>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={formik.handleChange}
                  placeholder={t('interface_texts.forms.username')}
                  value={formik.values.username}
                  ref={inputEl}
                  type="text"
                  name="username"
                  id="username"
                  required
                  onBlur={formik.onBlur}
                  autoComplete="off"
                />
                <Form.Label htmlFor="username">
                  {t('interface_texts.forms.username')}
                </Form.Label>
              </Form.Group>
              <Form.Group className="form-floating mb-4">
                <Form.Control
                  onChange={formik.handleChange}
                  placeholder={t('interface_texts.forms.password')}
                  value={formik.values.password}
                  type="password"
                  name="password"
                  id="password"
                  required
                  onBlur={formik.onBlur}
                  autoComplete="off"
                />
                <Form.Label htmlFor="password">
                  {t('interface_texts.forms.password')}
                </Form.Label>
                {formik.errors.auth && (
                  <div className="text-center text-danger">
                    {formik.errors.auth}
                  </div>
                )}
              </Form.Group>
              <Button
                type="submit"
                variant="outline-primary"
                className="w-100 btn"
              >
                {t('interface_texts.loginPageBtn')}
              </Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FormLogin
