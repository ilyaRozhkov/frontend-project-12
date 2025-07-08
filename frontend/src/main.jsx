import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { init } from './init.jsx'
import { I18nextProvider } from 'react-i18next'
import { i18next } from './init.jsx'
import { ToastContainer, Bounce } from 'react-toastify'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

const { socket } = init()

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  environment: import.meta.env.MODE,
}

createRoot(document.getElementById('root')).render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <App socket={socket} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </I18nextProvider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>,
)
