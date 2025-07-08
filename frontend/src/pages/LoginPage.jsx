import loginPage from '../assets/avatar.jpg'
import FormLogin from '../components/FormLogin'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation()
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                  <img
                    alt="avatar"
                    className="rounded-circle"
                    src={loginPage}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormLogin />
                </div>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>
                    {t('interface_texts.loginPageQuestion')}
                    {' '}
                  </span>
                  <a href="/signup">
                    {t('interface_texts.loginPageToReg')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
