import Image from "next/image";
import React from "react";

function EmptyFavorite() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <Image
        src={"/empty-favorite.svg"}
        alt="empty-favorite"
        width={140}
        height={140}
        className="font-bold"
      />
      <h2 className="font-semibold mt-4 text-2xl">No Favorite Board</h2>
    </div>
  );
}

export default EmptyFavorite;
