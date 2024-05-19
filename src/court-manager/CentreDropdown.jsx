import React, { useState } from 'react';

const CentreDropdown = ({ onDataSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const [tab, setTab] = useState(0);

  const handleClick = (value) => {
    // setTab(value);
    handleSubmit(value);
  };

  const handleSubmit = (value) => {
    onDataSubmit(value);
  };

  return (
    <div className="w-full">
      <button className={isOpen ? 'py-3 px-6 rounded-t-lg w-full text-white bg-gray-800 flex justify-between items-center' : 'py-3 px-6 rounded-lg w-full text-white bg-gray-800 flex justify-between items-center'}
        onClick={toggleDropdown}>
        <div className='text-lg font-semibold'>
          Centre A
        </div>
        <svg xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isOpen ? 'rotate-180 lucide lucide-chevron-down' : 'lucide lucide-chevron-down'}>
            <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {isOpen && (
        <ul className="bg-white rounded-b-lg text-center">
          <button className="block w-full py-3 px-6 bg-gray-200 hover:bg-white transition-all ease-in-out duration-300 cursor-pointer"
            onClick={() => handleClick(1)}
          >
            Centre Information
          </button>
          <button className="block w-full py-3 px-6 bg-gray-200 hover:bg-white transition-all ease-in-out duration-300 cursor-pointer"
            onClick={() => handleClick(2)}
          >
            Staff Information
          </button>
          <button className="block w-full py-3 px-6 bg-gray-200 hover:bg-white transition-all ease-in-out duration-300 cursor-pointer rounded-b-lg hover:rounded-b-lg"
            onClick={() => handleClick(3)}
          >
            Check in
          </button>
        </ul>
      )}
    </div>
  );
}

export default CentreDropdown;
