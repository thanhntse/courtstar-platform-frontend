import google from '../assets/images/google.svg';
import InputText from '../components/InputText';
import PopupModal from '../components/PopupModal';
import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';
import Password from '../components/Password';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Login(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //CLOSE LOGIN MODAL
  const handleClose = () => {
    props.setIsOpen();
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
    setLoading(true);
    await axiosInstance.post(`/courtstar/auth/token`, formLogin)
      .then(res => {
        const dataObj = res.data;
        localStorage.setItem('token', dataObj.data.token);
        localStorage.setItem('account_id', dataObj.data.account_id);
        localStorage.setItem('role', dataObj.data.role);
        handleClose();
        navigate('/');
        props.setIsLogin(true);
        toast.success(dataObj.message, {
          toastId: 'login-success'
        });
      })
      .catch(error => {
        toast.error(error.message, {
          toastId: 'login-error'
        });
      })
      .finally(
        () => {
          setLoading(false);
        }
      );
  };

  const html = (
    <div className="w-[440px]">
      <h2 className="text-4xl font-semibold mb-5 text-center">Log in</h2>
      <p className="text-gray-400 text-sm mb-5 text-center">Don't have account? <a
        href="#s" className="font-semibold underline text-gray-800">Sign up for free</a></p>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <InputText
            id="email"
            name="email"
            placeholder="Enter your email"
            label="Email"
            value={formLogin.email}
            onchange={handleChange}
          />
        </div>
        <div className="mb-0">
          <Password
            id="password"
            name="password"
            placeholder="Enter your password"
            label="Password"
            value={formLogin.password}
            onchange={handleChange}
            evaluate={false}
          />
        </div>
        <div className="flex items-center justify-between mt-4 mb-5 px-0.5">
          <div
            onClick={handleForgetPopup}
            className="text-sm font-semibold underline cursor-pointer"
          >
            Forget password?
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Button 
            type='submit'
            label='Log in'
            fullWidth
            fullRounded
            size='medium'
            className='bg-primary-green hover:bg-teal-900 text-white'
            loading={loading}
          />
        </div>
        <div className='flex justify-center mt-4 '>
          <button
            className="text-center text-sm border border-black rounded-full py-3 px-14 inline-flex items-center hover:bg-gray-200 transition-all duration-300 ease-in-out"
            href="#"
          >
            <img className='mr-3 w-fit'
              src={google}
              alt='google'
            />
            Continue with Google
          </button>
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
