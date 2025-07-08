import errorPage from '../assets/500.png'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Error500Page = () => {
  const { t } = useTranslation()
  const location = useLocation()
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <img
        alt="Network error"
        src={errorPage}
        style={{ maxWidth: '40%', height: 'auto' }}
      />
      <h1>
        {t('network')}
      </h1>
      <p>
        <Link to={location}>
          {t('reload')}
        </Link>
      </p>
    </div>
  )
}

export default Error500Page
