import { useFormik } from 'formik'
import { Form, Button } from 'react-bootstrap'
import { useRef, useEffect } from 'react'
import { getSignUpValidation } from '../utils/validation.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/index.jsx'
import { useTranslation } from 'react-i18next'
import routes from '../routes/index.js'

const FormSignUp = () => {
  const inputEl = useRef(null)
  const navigate = useNavigate()
  const auth = useAuth()
  const { t } = useTranslation()
  useEffect(() => inputEl.current.focus(), [])
  const validationSchema = getSignUpValidation(t)

  const formik = useFormik({
    initialValues: { username: '', password: '', repeatPassword: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signupPath(), {
          username: values.username,
          password: values.password,
        })
        localStorage.setItem('user', JSON.stringify(response.data))
        auth.logIn()
        navigate('/')
        formik.resetForm()
      }
      catch (err) {
        console.error(t('network'), err)
        if (err.response && err.response.status === 409) {
          formik.setFieldError('username', t('validation.withoutDoubles'))
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
                {t('interface_texts.forms.formTitleSignup')}
              </h1>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={(e) => {
                    formik.handleChange(e)
                  }}
                  placeholder={t('interface_texts.forms.placeHolderUsername')}
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
                  {t('interface_texts.forms.newUsername')}
                </Form.Label>
                {formik.touched.username && formik.errors.username && (
                  <div className="text-danger">
                    {formik.errors.username}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  className="mb-3"
                  onChange={(e) => {
                    formik.handleChange(e)
                  }}
                  placeholder={t('interface_texts.forms.placeHolderPassword')}
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
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger">
                    {formik.errors.password}
                  </div>
                )}
              </Form.Group>
              <Form.Group
                className="form-floating mb-4"
              >
                <Form.Control
                  onChange={formik.handleChange}
                  placeholder={t(
                    'interface_texts.forms.placeHolderRepeatPassword',
                  )}
                  value={formik.values.repeatPassword}
                  type="password"
                  name="repeatPassword"
                  id="repeatPassword"
                  required
                  onBlur={formik.onBlur}
                  autoComplete="off"
                />
                <Form.Label htmlFor="repeatPassword">
                  {t('interface_texts.forms.repeatPassword')}
                </Form.Label>
                {formik.touched.repeatPassword
                  && formik.errors.repeatPassword && (
                  <div className="text-danger">
                    {formik.errors.repeatPassword}
                  </div>
                )}
              </Form.Group>
              <Button
                type="submit"
                variant="outline-primary"
                className="w-100 btn"
              >
                {t('interface_texts.signupBtn')}
              </Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default FormSignUp
