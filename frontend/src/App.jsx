import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import NotFoundPage from './pages/NotFoundPage'
import SignUpPage from './pages/SignUpPage.jsx'
import NavBar from './components/NavBar.jsx'
import Waiting from './components/Spinner.jsx'
import ModalRenderer from '../../frontend/src/components/modals/ModalRenderer.jsx'
import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import AuthContext from './contexts/index.jsx'
import useAuth from './hooks/index.jsx'

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'))
    if (userId && userId.token) {
      setLoggedIn(true)
    }
    setIsLoading(false)
  }, [])
  const logIn = () => setLoggedIn(true)
  const logOut = () => {
    localStorage.removeItem('user')
    setLoggedIn(false)
  }
  if (isLoading) {
    return <Waiting />
  }
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  return auth.loggedIn
    ? (
        children
      )
    : (
        <Navigate to="/login" state={{ from: location }} />
      )
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              )}
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
          <ModalRenderer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
