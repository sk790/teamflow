"use client"

import { useSelf } from "@liveblocks/react/suspense"
import Info from "./Info"
import Participants from "./Participants"
import Toolbar from "./Toolbar"


export const Canvas = ({boardId}:{boardId:string})=>{

    const info = useSelf((s) => s.info)
    

return(
    <main className="w-full h-full relative bg-neutral-100 touch-none">
        <Info boardId={boardId} info = {info}/>
        <Participants/>
        <Toolbar/>
    </main>
)
}