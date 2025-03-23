"use client";

import { useState, useEffect } from "react";

import { Prisma } from "@prisma/client";

interface PostCommentsProps {
  comments: Prisma.CommentGetPayload<{
    include: {
      user: true;
    };
  }>[];
}

const PostComments = ({ comments }: PostCommentsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (comments.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [comments]);

  if (comments.length === 0) return null;

  return (
    <ul>
      <li
        key={comments[currentIndex].id}
        className="animate-fade-left animate-duration-800"
      >
        <p className="line-clamp-2 text-xs">
          <span className="font-medium">
            {comments[currentIndex].user.username}
          </span>{" "}
          {comments[currentIndex].content}
        </p>
      </li>
    </ul>
  );
};

export default PostComments;
