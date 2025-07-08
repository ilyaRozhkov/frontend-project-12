import { Navbar, Container, Button } from 'react-bootstrap'
import useAuth from '../hooks/index.jsx'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
  const auth = useAuth()
  const { t } = useTranslation()
  return (
    <Navbar
      expand="lg"
      className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"
    >
      <Container>
        <Navbar.Brand href="/">
          Hexlet Chat
        </Navbar.Brand>
        {auth.loggedIn && (
          <Button
            onClick={auth.logOut}
            type="button"
            className="btn btn-primary ms-auto"
          >
            {t('interface_texts.headerBtn')}
          </Button>
        )}
      </Container>
    </Navbar>
  )
}
export default NavBar
