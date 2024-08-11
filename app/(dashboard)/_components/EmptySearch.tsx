import Image from "next/image";
import React from "react";

function EmptySearch() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <Image
        src={"/search-not-found.svg"}
        alt="empty"
        width={200}
        height={140}
      />

      <h2 className="font-semibold mt-4 text-2xl">No results found</h2>
      <p className="text-muted-foreground mt-2 text-sm">Try different keywords</p>
    </div>
  );
}

export default EmptySearch;
