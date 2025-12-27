import React from 'react'
import FormElement from './FormElement'
import MapClient from '../component/MapClient'

const Contact = () => {
  return (
    <div>
      <h1 className='text-[43px] text-primary py-12 text-center bg-[#F9F9F9] font-bold'>Contact Page</h1>
        <MapClient />
      <FormElement></FormElement>
      
    </div>
  )
}

export default Contact