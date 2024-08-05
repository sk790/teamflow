import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";

interface Props {
  authorLabel: string;
  createdAtLabel: string;
  title: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function Footer({
  authorLabel,
  createdAtLabel,
  title,
  isFavorite,
  onClick,
  disabled,
}: Props) {

  const onClickStar = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel},{createdAtLabel}
      </p>

      <button
        disabled={disabled}
        onClick={onClickStar}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 hover:text-blue-500 text-muted-foreground",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star className={cn("w-4 h-4", isFavorite && "fill-blue-500")}/>
      </button>
    </div>
  );
}

export default Footer;
