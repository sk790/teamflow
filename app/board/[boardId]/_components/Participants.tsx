import React from 'react'

function Participants() {
  return (
    <div className='absolute top-2 right-2 bg-white rounded-md shadow-md p-3 h-12'>
        List of users
    </div>
  )
}

export const ParticipantsSkeleton = ()=> {
  return (
    <div className='absolute top-2 right-2 h-12 w-24  bg-white rounded-md shadow-md ]'>
      {/* <Skeleton className='w-full h-full bg-muted-400'/> */}
    </div>
  )
}
export default Participants
