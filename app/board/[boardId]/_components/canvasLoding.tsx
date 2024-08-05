import React from 'react'
import { ImSpinner2 } from 'react-icons/im'
import Info from './Info'
import Toolbar from './Toolbar'
import Participants from './Participants'

function CanvasLoding() {
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
      <ImSpinner2 className='animate-spin w-6 h-6'/>
      <Info.Skeleton />
      <Toolbar.Skeleton />
      <Participants.Skeleton />
    </main>
  )
}

export default CanvasLoding
