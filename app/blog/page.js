import Image from 'next/image'
import React from 'react'

const Blog = () => {
  return (
    <div>
      <h1 className='text-center bg-[#F9F9F9] text-[43px] text-[#00D9A6] py-12'>
        Blog
      </h1>
   

   
<div className='bg-[#FEFEFE] '>
     {/* IMAGE SECTION DIV */}
      <div className=' mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-10 gap-0.5 px-80 '>
      <div className='w-200' >
        <Image  className='rounded-2xl shadow-2xl' src='/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png' alt='a business Woman' width={600} height={600}></Image>
        <div className='bg-[#FFFFFF] left-16 opacity-100 relative bottom-20 p-10 rounded-2xl  shadow-2xl w-120 '>
          <p>May 24, 2018 by tufael4736@gmail.com</p>
          <h1 className='text-2xl font-semibold'>Marketing Ideas</h1>
        </div>
      </div>
      <div className='w-200' >
        <Image  className='rounded-2xl shadow-2xl' src='/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png' alt='a business Woman' width={600} height={600}></Image>
        <div className='bg-[#FFFFFF] left-16 opacity-100 relative bottom-20 p-10 rounded-2xl  shadow-2xl w-120 '>
          <p>May 24, 2018 by tufael4736@gmail.com</p>
          <h1 className='text-2xl font-semibold'>Marketing Ideas</h1>
        </div>
      </div>
      <div className='w-200' >
        <Image  className='rounded-2xl shadow-2xl' src='/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png' alt='a business Woman' width={600} height={600}></Image>
        <div className='bg-[#FFFFFF] left-16 opacity-100 relative bottom-20 p-10 rounded-2xl  shadow-2xl w-120 '>
          <p>May 24, 2018 by tufael4736@gmail.com</p>
          <h1 className='text-2xl font-semibold'>Marketing Ideas</h1>
        </div>
      </div>
      <div className='w-200' >
        <Image  className='rounded-2xl shadow-2xl' src='/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png' alt='a business Woman' width={600} height={600}></Image>
        <div className='bg-[#FFFFFF] left-16 opacity-100 relative bottom-20 p-10 rounded-2xl  shadow-2xl w-120 '>
          <p>May 24, 2018 by tufael4736@gmail.com</p>
          <h1 className='text-2xl font-semibold'>Marketing Ideas</h1>
        </div>
      </div>
      <div className='w-200' >
        <Image  className='rounded-2xl shadow-2xl' src='/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png' alt='a business Woman' width={600} height={600}></Image>
        <div className='bg-[#FFFFFF] left-16 opacity-100 relative bottom-20 p-10 rounded-2xl  shadow-2xl w-120 '>
          <p>May 24, 2018 by tufael4736@gmail.com</p>
          <h1 className='text-2xl font-semibold'>Marketing Ideas</h1>
        </div>
      </div>
      <div className='w-200' >
        <Image  className='rounded-2xl shadow-2xl' src='/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png' alt='a business Woman' width={600} height={600}></Image>
        <div className='bg-[#FFFFFF] left-16 opacity-100 relative bottom-20 p-10 rounded-2xl  shadow-2xl w-120 '>
          <p>May 24, 2018 by tufael4736@gmail.com</p>
          <h1 className='text-2xl font-semibold'>Marketing Ideas</h1>
        </div>
      </div>
    </div>
     
</div>


    </div>
  )
}

export default Blog