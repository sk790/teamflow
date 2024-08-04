"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import OverLay from "./overLay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Footer from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";

interface Props {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUr: string;
  orgId: string;
  isFavorite: boolean;
}

function BoardCard({
  id,
  title,
  authorName,
  authorId,
  createdAt,
  imageUr,
  orgId,
  isFavorite,
}: Props) {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/board/${id}`}>
      <div className="group rounded-lg aspect-[100/127] border flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUr} alt={title} fill className="object-fit" />
          <OverLay />
          <Actions 
            id={id}
            side="right"
            sideOffset={10}
            title={title}
          >
            <button className="absolute top-1 right-1 z-50 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100"/>
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="rounded-lg aspect-[100/127] overflow-hidden">
      <Skeleton className="w-full h-full"/>
    </div>
  );
};

export default BoardCard;
