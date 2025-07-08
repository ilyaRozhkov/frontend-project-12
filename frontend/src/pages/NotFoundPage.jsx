import errorPage from '../assets/404.svg'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <img
        alt="Page not found"
        src={errorPage}
        style={{ maxWidth: '40%', height: 'auto' }}
      />
      <h1>
        {t('interface_texts.notFoundPage')}
      </h1>
      <p>
        {t('interface_texts.notFoundBut')}
        {' '}
        <Link to="/">
          {t('interface_texts.notFoundLink')}
        </Link>
      </p>
    </div>
  )
}

export default NotFoundPage
