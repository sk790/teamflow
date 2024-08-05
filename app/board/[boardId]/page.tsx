import React from 'react'
import { Canvas } from './_components/canvas'



function Board({ params }: { params: { boardId: string } }) {
  return (
    <Canvas boardId={params.boardId}/>
  )
}

export default Board
