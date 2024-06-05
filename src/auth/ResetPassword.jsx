import PopupModal from '../components/PopupModal';
import React, { useEffect, useState } from 'react';
import PinCode from '../components/PinCode';
import Password from '../components/Password';
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';

function ResetPassword(props) {
  // State object for email, OTP, and new password fields
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State to control pin code clearing
  const [clearPin, setClearPin] = useState(false);

  // Set email from props if available
  useEffect(() => {
    if (props.email) {
      setFormData(prevData => ({ ...prevData, email: props.email }));
    }
  }, [props.email]);

  // Function to handle closing the popup
  const handleClose = () => {
    props.setIsOpen();
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axiosInstance.post(`/courtstar/account/reset-password`, formData)
      .then(() => {
        toast.success('Reset Successfully', {
          toastId: 'reset-password-success'
        });
        handleClose();
      })
      .catch(error => {
        toast.error(error.message, {
          toastId: 'reset-password-error'
        });
      });
  };

  // Function to handle OTP input change
  const handleOtpChange = (value) => {
    setFormData(prevData => ({ ...prevData, otp: value }));
  };

  // Function to handle other form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Reset form and clear pin code when popup is opened
  useEffect(() => {
    if (props.isOpen) {
      setFormData(prevData => ({
        ...prevData,
        otp: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setClearPin(true);
      setTimeout(() => setClearPin(false), 100);
    }
  }, [props.isOpen]);

  // States and function for handling OTP resend cooldown
  const [resendCodeCount, setResendCodeCount] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0); // Cooldown time in seconds

  const resendCode = async () => {
    if (resendCodeCount) {
      return;
    }
    await axiosInstance.put(`/courtstar/account/regenerate-otp`, props.email)
      .then(() => {
        setResendCodeCount(true);
        setCooldownTime(60 * 3); // Set cooldown time to 3 minutes
      }).catch(error => {
        toast.error(error.message, {
          toastId: 'email-error'
        });
      });
  };

  // Timer effect to handle cooldown countdown
  useEffect(() => {
    if (cooldownTime <= 0) {
      setResendCodeCount(false);
      return;
    }

    const timer = setInterval(() => {
      setCooldownTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownTime]);

  // Function to format cooldown time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // JSX for the popup modal content
  const html = (
    <div className='w-[440px] flex flex-col gap-5'>
      <div className="flex flex-col gap-2">
        <div className="text-4xl font-semibold text-center">
          Check Your Email
        </div>

        <div className="text-gray-400 text-sm text-center">
          <div>
            We just sent a verification code to <span className="font-semibold text-black">{formData.email}</span>
          </div>
          <div>
            Enter the 6-digit code mentioned in the email!
          </div>
        </div>

        <PinCode
          value={formData.otp.trim}
          onChange={handleOtpChange}
          clear={clearPin}
          onComplete={handleOtpChange}
        />

        <Password
          id="newPassword"
          name="newPassword"
          placeholder="Enter your new password"
          label="New password"
          value={formData.newPassword}
          onchange={handleChange}
          evaluate={true}
        />

        <Password
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Enter your new password"
          label="Confirm new password"
          value={formData.confirmPassword}
          onchange={handleChange}
          evaluate={false}
        />

        <div className='text-sm text-center justify-center text-gray-400'>
          Haven't got the email yet?
          <div className={resendCodeCount ? `font-semibold text-red-500` : `font-semibold text-gray-800 cursor-pointer hover:text-primary-green`} onClick={resendCode}>
            {resendCodeCount ? <p>{formatTime(cooldownTime)}</p> : 'Resend'}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <button
          className='bg-primary-green w-full rounded-full py-3 text-white hover:bg-teal-900 transition-all duration-300 ease-in-out font-medium'
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <PopupModal
        html={html}
        isOpen={props.isOpen}
        setIsOpen={handleClose}
      />
    </div>
  );
}

export default ResetPassword;
