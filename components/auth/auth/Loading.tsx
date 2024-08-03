import Image from 'next/image'
import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <ImSpinner2 className='animate-spin w-12 h-12'/>
    </div>
  )
}

export default Loading
