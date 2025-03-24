import { UsersIcon, UserIcon } from "lucide-react";

interface FollowCountProps {
  followersCount: number;
  followingCount: number;
}

const FollowCount = ({ followersCount, followingCount }: FollowCountProps) => {
  const counts = [
    {
      label: "Seguidores",
      icon: <UsersIcon size={16} />,
      count: followersCount,
    },
    { label: "Seguindo", icon: <UserIcon size={16} />, count: followingCount },
  ];

  return (
    <div className="flex flex-col items-start">
      {counts.map((count) => (
        <span
          key={count.label}
          className="flex h-6 items-center gap-2 font-medium"
        >
          {count.icon} {count.count}
        </span>
      ))}
    </div>
  );
};

export default FollowCount;
