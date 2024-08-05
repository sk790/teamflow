"use client"

import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"


export const Canvas = ({boardId}:{boardId:string})=>{

return(
    <main className="w-full h-full relative bg-neutral-100 touch-none">
        <Info boardId={boardId}/>
        <Participants/>
        <Toolbar/>
    </main>
)
}