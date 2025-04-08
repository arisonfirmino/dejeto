import { MessageCircleIcon } from "lucide-react";

const CommentButton = () => {
  return (
    <button className="flex items-center gap-2 text-sm">
      <MessageCircleIcon size={16} />
      12
    </button>
  );
};

export default CommentButton;
