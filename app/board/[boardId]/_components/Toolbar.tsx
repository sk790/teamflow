import React from 'react'

function Toolbar() {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className='bg-white rounded-md shadow-md flex items-center flex-col p-1 gap-y-2'>
        <div>Pencil</div>
        <div>Circul</div>
        <div>Squere</div>
      </div>
      <div className='bg-white rounded-md shadow-md flex items-center flex-col p-1 gap-y-2'>
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  )
}

export default Toolbar
