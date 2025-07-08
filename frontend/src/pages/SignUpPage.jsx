import FormSignUp from '../components/FormSignUp'
import signUpAvatar from '../assets/SignUp.jpg'

const SignUpPage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div className="col-12 col-md-6 d-flex justify-content-center">
                  <img
                    alt="avatar"
                    className="rounded-circle"
                    src={signUpAvatar}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormSignUp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
