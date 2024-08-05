import React from 'react'

function Info({ boardId }: { boardId: string }) {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md shadow-md h-12 p-1.5 flex items-center'>
      Information about the board {boardId}
    </div>
  )
}

export default Info
