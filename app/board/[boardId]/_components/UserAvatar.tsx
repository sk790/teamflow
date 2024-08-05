import { Hint } from "@/components/Hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  src?: string;
  name?: string;
  borderColor?: string;
  fallback?: string;
}

function UserAvatar({ borderColor, src, name, fallback }: Props) {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffset={12}>
      <Avatar className="w-8 h-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
}

export default UserAvatar;
