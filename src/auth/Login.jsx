import google from '../assets/images/google.svg';
import InputText from '../components/input-text';
import PopupModal from '../components/PopupModal';
import React, { useEffect, useState } from 'react';
import ForgotPassword from './ForgotPassword';
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';
import Password from '../components/password';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

function Login(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { dispatch } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState(false);

  //CLOSE LOGIN MODAL
  const handleClose = () => {
    props.setIsOpen();
    setFormError(false);
  }

  //HANDLE FORGET PASSWORD POPUP
  const [forgetPopup, setForgetPopup] = useState(false);
  const handleForgetPopup = () => {
    handleClose();
    setForgetPopup(true);
  }
  const handleForgetClose = () => {
    setForgetPopup(false)
  }

  //HANDLE LOGIN ACTION
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormLogin((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!formLogin.email || !formLogin.password) {
      setFormError(true);
      return;
    }
    setLoading(true);
    await axiosInstance.post(`/courtstar/auth/token`, formLogin)
      .then(res => {
        const dataObj = res.data;
        localStorage.setItem('token', dataObj.data.token);
        localStorage.setItem('role', dataObj.data.role);
        dispatch({ type: 'LOGIN', payload: { token: dataObj.data.token, role: dataObj.data.role } });
        handleClose();

        if (dataObj.data.role === "MANAGER") navigate('/myCentre/balance')
        else if (dataObj.data.role === "STAFF") navigate('/myCentre/:id')
        else if (dataObj.data.role === "ADMIN") navigate('/admin')
        else navigate('/');

        toast.success(t('loginSuccess'), {
          toastId: 'login-success'
        });
      })
      .catch(error => {
        toast.error((error.message === 'Request failed with status code 401') || (error.message === 'Request failed with status code 400')
          ?
          t('wrongMailOrPass')
          :
          error.message, {
          toastId: 'login-error'
        });
        console.log(error.message);
      })
      .finally(
        () => {
          setLoading(false);
        }
      );
  };

  useEffect(() => {
    if (props.isOpen)
      setFormLogin({
        email: '',
        password: '',
      });
  }, [props.isOpen])

  const html = (
    <div className="w-[440px]">
      <h2 className="text-4xl font-semibold mb-5 text-center">{t('logIn')}</h2>
      <p className="text-gray-400 text-sm mb-5 text-center">{t('dontHaveAccount')}? <a
        href="#s" className="font-semibold underline text-gray-800">{t('signUpForFree')}</a></p>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <InputText
            id="email"
            name="email"
            placeholder={t('enterEmail')}
            label="Email*"
            value={formLogin.email}
            onchange={handleChange}
            error={(formError && !formLogin.email)}
            errorMsg={t('plsEnterEmail')}
          />
        </div>
        <div className="mb-0">
          <Password
            id="password"
            name="password"
            placeholder={t('enterPassword')}
            label={t('password')}
            value={formLogin.password}
            onchange={handleChange}
            evaluate={false}
            error={(formError && !formLogin.password)}
            errorMsg={t('plsEnterPassword')}
          />
        </div>
        <div className="flex items-center justify-between mt-4 mb-5 px-0.5">
          <div
            onClick={handleForgetPopup}
            className="text-sm font-semibold underline cursor-pointer"
          >
            {t('forgetPassword')}?
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Button
            type='submit'
            label={t('logIn')}
            fullWidth
            fullRounded
            size='medium'
            className='bg-primary-green hover:bg-teal-900 text-white shadow'
            loading={loading}
          />
        </div>
        <div className='flex justify-center mt-4 '>
          <a
            className="text-center text-sm shadow border rounded-full py-3 px-14 inline-flex items-center hover:bg-gray-200 transition-all duration-300 ease-in-out"
            href='http://localhost:8080/courtstar/account/createEmail'
          >
            <img className='mr-3 w-fit'
              src={google}
              alt='google'
            />
            {t('continueWithGoogle')}
          </a>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <PopupModal
        html={html}
        isOpen={props.isOpen}
        setIsOpen={handleClose}
      />
      <ForgotPassword
        isOpen={forgetPopup}
        setIsOpen={handleForgetClose}
      />
    </div>
  );
}

export default Login;
