"use client";

import { useSelf } from "@liveblocks/react";
import { useOthers } from "@liveblocks/react/suspense";
import UserAvatar from "./UserAvatar";

const MAX_SHOWN_USERS = 2;
function Participants() {
  const users = useOthers(); //get online users
  const currentUser = useSelf(); //get me
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute top-2 right-2 bg-white rounded-md shadow-md p-3 h-12">
      <div className="flex gap-x-2">
      {currentUser && (
          <UserAvatar
            src={currentUser?.info?.picture}
            fallback={currentUser?.info?.name?.[0]}
            name={currentUser?.info?.name+"(You)"}
            boarderColor={"green-500"}
          />
        )}
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info?.picture}
              fallback={info?.name?.[0]}
              name={info?.name || "T"}
              boarderColor={"red-500"}
            />
          );
        })}
        
        {hasMoreUsers && (
          <UserAvatar name={`${users.length-MAX_SHOWN_USERS} more` } 
          fallback={`+${users.length-MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
}

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute top-2 right-2 h-12 w-24  bg-white rounded-md shadow-md ]">
      {/* <Skeleton className='w-full h-full bg-muted-400'/> */}
    </div>
  );
};
export default Participants;
