import Image from 'next/image'
import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Image src='/logo.svg' alt='logo' width={150} height={150} className='font-bold animate-pulse duration-800'/>
    </div>
  )
}

export default Loading
