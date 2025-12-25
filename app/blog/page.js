import React from 'react'

const Blog = () => {
  return (
    <div>
      <h1 className='text-center bg-[#F9F9F9] text-[43px] text-[#00D9A6] py-12'>
        Blog
      </h1>
      {/* IMAGE SECTION DIV */}
    <div className='bg-[#FEFEFE] py-20 mx-auto absolute w-[980px]'>
      <div >
        <img  className='rounded-2xl z-index' src='/serious-businesswoman-with-documents-talking-on-P9Q6LX6-768x576.png' alt='a business Woman'></img>
        <div className='bg-[#FFFFFF] relative bottom-30 opacity-100 p-10 rounded-2xl border shadow-2xl z-index-10 w-80 '>
          <p>May 24, 2018 by tufael4736@gmail.com</p>
          <h1 className='text-2xl font-semibold'>Marketing Ideas</h1>
        </div>
      </div>

    </div>
    </div>
  )
}

export default Blog