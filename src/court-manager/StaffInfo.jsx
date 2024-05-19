const StaffInfo = () => {
  return (
    <div className="py-12 pr-12">
      <div className="flex justify-between">
        <div className="text-3xl font-bold">
          Staff Information
        </div>

        <div className="flex gap-2.5 px-3 py-1.5 bg-primary-green w-fit rounded-3xl text-white hover:bg-teal-900 ease-in-out duration-300 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
            <path d="M5 12h14" /><path d="M12 5v14" />
          </svg>

          <div className="font-semibold">
            Add Staff
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl mt-4">
        <div className="flex bg-primary-green text-white text-lg font-semibold rounded-t-lg divide-x-2">
          <div className="w-1/3 px-8 py-2 ">
            Full name
          </div>
          <div className="w-1/3 px-8 py-2 ">
            Email
          </div>
          <div className="w-1/6 px-8 py-2 ">
            Phone
          </div>
          <div className="">

          </div>
        </div>
        <div className="divide-y-2">
          <div className="flex divide-x-2">
            <div className="w-1/3 px-8 truncate py-2">
              Huỳnh Đoàn Thanh Phong
            </div>
            <div className="w-1/3 px-8 py-2 ">
              huynhdoanthanhphong@gmail.com
            </div>
            <div className="w-1/6 px-8 py-2">
              0987654321
            </div>
            <div className="flex flex-1 items-center justify-center gap-8">
              <div className="p-1.5 rounded-full hover:bg-emerald-900 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
              </div>
              <div className="p-1.5 rounded-full hover:bg-red-600 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
              </div>
            </div>
          </div>
          <div className="flex divide-x-2">
            <div className="w-1/3 px-8 truncate py-2">
              Huỳnh Đoàn Thanh Phong
            </div>
            <div className="w-1/3 px-8 py-2 ">
              huynhdoanthanhphong@gmail.com
            </div>
            <div className="w-1/6 px-8 py-2">
              0987654321
            </div>
            <div className="flex flex-1 items-center justify-center gap-8">
              <div className="p-1.5 rounded-full hover:bg-emerald-900 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
              </div>
              <div className="p-1.5 rounded-full hover:bg-red-600 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
              </div>
            </div>
          </div>
          <div className="flex divide-x-2">
            <div className="w-1/3 px-8 truncate py-2">
              Huỳnh Đoàn Thanh Phong
            </div>
            <div className="w-1/3 px-8 py-2 ">
              huynhdoanthanhphong@gmail.com
            </div>
            <div className="w-1/6 px-8 py-2">
              0987654321
            </div>
            <div className="flex flex-1 items-center justify-center gap-8">
              <div className="p-1.5 rounded-full hover:bg-emerald-900 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
              </div>
              <div className="p-1.5 rounded-full hover:bg-red-600 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
              </div>
            </div>
          </div>
          <div className="flex divide-x-2">
            <div className="w-1/3 px-8 truncate py-2">
              Huỳnh Đoàn Thanh Phong
            </div>
            <div className="w-1/3 px-8 py-2 ">
              huynhdoanthanhphong@gmail.com
            </div>
            <div className="w-1/6 px-8 py-2">
              0987654321
            </div>
            <div className="flex flex-1 items-center justify-center gap-8">
              <div className="p-1.5 rounded-full hover:bg-emerald-900 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
              </div>
              <div className="p-1.5 rounded-full hover:bg-red-600 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
              </div>
            </div>
          </div>
          <div className="flex divide-x-2">
            <div className="w-1/3 px-8 truncate py-2">
              Huỳnh Đoàn Thanh Phong
            </div>
            <div className="w-1/3 px-8 py-2 ">
              huynhdoanthanhphong@gmail.com
            </div>
            <div className="w-1/6 px-8 py-2">
              0987654321
            </div>
            <div className="flex flex-1 items-center justify-center gap-8">
              <div className="p-1.5 rounded-full hover:bg-emerald-900 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
              </div>
              <div className="p-1.5 rounded-full hover:bg-red-600 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
              </div>
            </div>
          </div>
          <div className="flex divide-x-2">
            <div className="w-1/3 px-8 truncate py-2">
              Huỳnh Đoàn Thanh Phong
            </div>
            <div className="w-1/3 px-8 py-2 ">
              huynhdoanthanhphong@gmail.com
            </div>
            <div className="w-1/6 px-8 py-2">
              0987654321
            </div>
            <div className="flex flex-1 items-center justify-center gap-8">
              <div className="p-1.5 rounded-full hover:bg-emerald-900 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
              </div>
              <div className="p-1.5 rounded-full hover:bg-red-600 hover:text-white cursor-pointer ease-in-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
              </div>
            </div>
          </div>
          
        </div>

      </div>


    </div>
  );
}

export default StaffInfo;