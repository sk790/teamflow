"use client";

import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Icon, LucideIcon } from "lucide-react";

interface Props {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

function ToolButton({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: Props) {
  return (
    <Hint label={label} side="right" sideOffset={12}>
      <Button
        disabled={isDisabled}
        className="transition-all duration-300"
        variant={isActive ? "toolButton" : "ghost"}
        onClick={onClick}
        size={"icon"}
      >
        <Icon />
      </Button>
    </Hint>
  );
}

export default ToolButton;
