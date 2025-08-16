import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import signupImage from '../assets/signup-image.png';
import axios from 'axios';
import SignupForm from '../components/SignupForm.jsx';

const SignupPage = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('/api/v1/signup', values);
      const { token, username } = response.data;

      login({ token, username });

      navigate('/');
    } catch (error) {
      if (error.response?.status === 409) {
        setErrors({ username: t('signup.errors.exists') });
      } else {
        setErrors({ username: t('signup.errors.unknown') });
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <div className="bg-white w-100 border-bottom py-2 px-4 d-flex align-items-center">
        <Link to="/" className="text-decoration-none text-dark fs-4" style={{ fontWeight: 'normal' }}>
          Hexlet Chat
        </Link>
      </div>

      <div className="flex-grow-1 d-flex justify-content-center align-items-center px-3 py-5">
        <div className="card shadow p-4 d-flex flex-column justify-content-center" style={{ width: '750px', height: '480px' }}>
          <div className="row g-0 align-items-center h-100">
            <div className="col-md-5 text-center mb-4 mb-md-0">
              <img
                src={signupImage}
                alt="Signup"
                className="img-fluid rounded-circle"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
            </div>

            <div className="col-md-7 d-flex flex-column align-items-center">
              <h1 className="mb-4 fw-bold text-center" style={{ fontSize: '3rem', fontWeight: '400' }}>
                {t('signup.header')}
              </h1>

              <div style={{ width: '100%', maxWidth: '320px' }}>
                <SignupForm onSubmit={handleSignup} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
