import React, { useEffect, useState } from 'react'
import Dropdown from "../../../components/dropdown";
import InputText from "../../../components/input-text";
import axiosInstance from '../../../config/axiosConfig';
import SpinnerLoading from '../../../components/SpinnerLoading';
import { toast } from 'react-toastify';
import Pagination from '../../../components/pagination';


const Customer = () => {

  const controller = new AbortController();
  const { signal } = controller;
  const [listCustomer, setListCustomer] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');

  useEffect(() => {
    const applyFilters = () => {
      let updatedCustomer = listCustomer;

      if (nameFilter) {
        updatedCustomer = updatedCustomer.filter(customer =>
          customer.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }

      if (emailFilter) {
        updatedCustomer = updatedCustomer.filter(customer => customer.email.toLowerCase().includes(emailFilter.toLowerCase()));
      }

      if (phoneFilter) {
        updatedCustomer = updatedCustomer.filter(customer => customer.phone?.toLowerCase().includes(phoneFilter.toLowerCase()));
      }

      setFilteredCustomer(updatedCustomer);
    };

    applyFilters();
  }, [nameFilter, emailFilter, phoneFilter, listCustomer]);

  const load = async () => {
    await axiosInstance.get(`/courtstar/customer`, { signal })
      .then(res => {
        setListCustomer(res.data.data.map(item => {
          return { ...item, loading: false };
        }));
        setFilteredCustomer(res.data.data);
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(
        () => {
          setLoading(false);
        }
      );
  }

  useEffect(() => {
    load();
  }, [])

  console.log(listCustomer);

  const deleteAccount = async (id, index) => {
    setListCustomer(prevListCourt => {
      // Create a copy of the previous state array
      const updatedListCourt = [...prevListCourt];

      // Update the specific element's loading property
      updatedListCourt[index] = { ...updatedListCourt[index], loading: true };

      return updatedListCourt;
    });
    await axiosInstance.post(`/courtstar/account/${id}`, { signal })
      .then(res => {
        console.log(res.data);
        toast.success("Delete Successfully!", {
          toastId: 'delete-customer-success'
        });
        load();
      })
      .catch(error => {
        console.log(error.message);
        toast.error(error.message, {
          toastId: 'delete-customer-error'
        });
      })
      .finally(
        () => {
        }
      );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentListCustomer: any = filteredCustomer.slice(indexOfFirstCustomer, indexOfLastCustomer);

  return (
    <div className="py-5 px-7">
      <div className="flex justify-between">
        <div className="text-3xl font-bold">
          Customers
          </div>
      </div>
  
      {loading ? (
        <div className="h-[500px] flex items-center justify-center">
          <SpinnerLoading height="80" width="80" color="#2B5A50" />
        </div>
      ) : (
        <>
          <div className="mt-5">
            <div className="px-10 py-4 grid grid-cols-12 gap-2 bg-white rounded-xl">
              <div className="col-span-4 ">
                <InputText
                  id="name"
                  name="name"
                  placeholder="Enter the user's name"
                  label="Name"
                  value={nameFilter}
                  onchange={(e) => setNameFilter(e.target.value)}
                />
              </div>
              <div className="col-span-4 ">
                <InputText
                  id="email"
                  name="email"
                  placeholder="Enter the user's email"
                  label="Email"
                  value={emailFilter}
                  onchange={(e) => setEmailFilter(e.target.value)}
                />
              </div>
              <div className="col-span-3 ">
                <InputText
                  id="phone"
                  name="phone"
                  placeholder="Enter the user's phone number"
                  label="Phone number"
                  value={phoneFilter}
                  onchange={(e) => setPhoneFilter(e.target.value)}
                />
              </div>
              <div className="col-span-1 "></div>
            </div>
  
            <div className="mt-2 font-medium">
              {currentListCustomer.length ? (
                <>
                  {currentListCustomer.map((customer, index) => (
                    <div
                      key={customer.id}
                      className="bg-white px-10 py-3 grid grid-cols-12 content-center gap-2 font-medium hover:bg-teal-50 hover:px-8 cursor-pointer mt-1 rounded-lg shadow-sm ease-in-out duration-300"
                    >
                      <div className="col-span-4 content-center truncate ml-4">
                      {customer.firstName} {customer.lastName}
                      </div>
                      <div className="col-span-4 content-center truncate ml-4">
                      {customer.email}
                      </div>
                      <div className="col-span-3 content-center ml-4">
                      {customer.phone}
                      </div>
                      <div className="mx-auto col-span-1">
                        {customer.loading ? (
                          <SpinnerLoading height="30" width="30" color="#2B5A50" />
                        ) : (
                          <>
                            {customer.deleted ? (
                              <div className="p-1.5 rounded-full text-red-500">
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
                                  <line x1="2" y1="2" x2="22" y2="22" />
                                </svg>
                              </div>
                            ) : (
                              <div
                                className="p-1.5 rounded-full hover:bg-red-600 hover:text-white cursor-pointer ease-in-out duration-300"
                                onClick={() => deleteAccount(customer.id, index)}
                              >
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
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className='flex flex-col items-center justify-center h-[500px] text-3xl text-primary mx-auto'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="250" height="250"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search-x"
                  >
                    <path d="m13.5 8.5-5 5" />
                    <path d="m8.5 8.5 5 5" />
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  No customer found.
                </div>
              )}
            </div>
          </div>
          {listCustomer.length > itemsPerPage && (
            <Pagination
              totalItems={listCustomer.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
  };
  
  export default Customer


