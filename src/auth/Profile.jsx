import React, { useEffect, useState } from 'react';
import InputText from '../components/input-text';
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';
import SpinnerLoading from '../components/SpinnerLoading';
import Button from '../components/button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import showAlert from '../components/alert';

function Profile() {
  const { t } = useTranslation();
  const { state, dispatch } = useAuth();
  const { account } = state;

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prevProfileForm => ({
      ...prevProfileForm,
      [name]: value
    }));
  };

  useEffect(() => {
    setProfileForm({
      firstName: account.firstName,
      lastName: account.lastName,
      phone: account.phone,
      password: ""
    });
  }, [account]);

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const res = await axiosInstance.put(`/courtstar/account`, profileForm);
      toast.success(`${t('profileUpdatedSuccessfully')}!`, {
        toastId: 'update-success'
      });
      dispatch({ type: 'SET_ACCOUNT', payload: res.data.data });
    } catch (error) {
      toast.error(t('profileUpdatedError'), {
        toastId: 'update-error'
      });
    } finally {
      setUpdateLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleDeleteProfile = async (id) => {
    setDeleteLoading(true);
    await axiosInstance.post(`/courtstar/account/${id}`)
      .then(res => {
        if (res.data) {
          localStorage.clear();
          dispatch({ type: 'LOGOUT' });
          toast.success(t('deleteProfileSuccess'), {
            toastId: 'delete-profile-success'
          });
          dispatch({ type: 'LOGOUT' }); // Log out the user
          navigate('/');
        }
      })
      .catch(error => {
        console.log(error.message);
        toast.error(t('deleteProfileError'), {
          toastId: 'delete-profile-error'
        });
      })
      .finally (
        () => setDeleteLoading(false) 
      );
  }
  
  return (
    loading
      ?
      <div className='h-[652px] flex items-center justify-center'>
        <SpinnerLoading
          height='80'
          width='80'
          color='#2B5A50'
        />
      </div>
      :
      <div className='font-Inter text-base overflow-x-hidden text-gray-800'>

        <div className='items-center bg-gray-100 py-10'>
          <div className='max-w-xl mx-auto py-8 px-16 bg-white rounded-lg'>
            <h2 className='text-2xl font-bold mb-6 text-center'
            >
              {t('yourProfile')}
            </h2>
            <div>
              <div className='mb-4 flex gap-5'>
                <InputText
                  id="firstName"
                  name="firstName"
                  label={t('firstName')}
                  onchange={handleChange}
                  value={profileForm.firstName}
                />
                <InputText
                  id="lastName"
                  name="lastName"
                  label={t('lastName')}
                  onchange={handleChange}
                  value={profileForm.lastName}
                />
              </div>
              <div className='mb-4'>
                <InputText
                  id="email"
                  name="email"
                  label="Email"
                  value={account.email}
                  disabled={true}
                />
              </div>
              <div className='mb-4'>
                <InputText
                  id="phone"
                  name="phone"
                  label={t('phone')}
                  onchange={handleChange}
                  value={profileForm.phone}
                />
              </div>
              <div className='mb-3'>
                <InputText
                  id="password"
                  name="password"
                  label={t('password')}
                  onchange={handleChange}
                  value={profileForm.password}
                />
              </div>
              <div className="pb-5 px-5 pt-3 -mx-5 font-semibold flex gap-6">
                <Button
                  label={t('update')}
                  fullWidth
                  size='medium'
                  className='bg-primary-green hover:bg-teal-900 text-white'
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
                  }
                  loading={updateLoading}
                  onClick={handleUpdate}
                />
                <Button
                  label={t('delete')}
                  fullWidth
                  size='medium'
                  className='text-red-600 border-2 border-red-600 w-1/2  hover:bg-red-600 hover:text-white !font-semibold'
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash-2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  }
                  onClick={() =>{
                    showAlert({
                      title: t('areYouSure') + "?",
                      message: t('youDeleteThisAccount') + "!",
                      type: 'warning',
                      onConfirmClick: () => handleDeleteProfile(account.id)
                    });
                  }}
                  loading={deleteLoading}
                  loadingColor='#dc2626'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Profile;
