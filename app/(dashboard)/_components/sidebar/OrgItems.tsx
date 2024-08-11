"use client";

import { Hint } from "@/components/Hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface itemProps {
  name: string;
  id: string;
  imageUrl: string;
}

function OrgItems({ name, id, imageUrl }: itemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative">
      <Hint label={name} side="left" bgColor="black">
      <Image
        fill
        src={imageUrl}
        alt={name}
        onClick={onClick}
        className={cn(
          "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition-all",
          isActive && "opacity-100"
        )}
      />
      </Hint>
    </div>
  );
}

export default OrgItems;
