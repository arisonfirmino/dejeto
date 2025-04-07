"use client";

import { useEffect, useState } from "react";

import { getUser } from "@/app/helpers/getUser";

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import Identity from "@/app/components/identity";
import Count from "@/app/components/header/count";
import Location from "@/app/components/location";
import { Button } from "@/app/components/ui/button";
import UserDataSkeleton from "@/app/components/user-data-skeleton";

import { MailIcon, LinkIcon, GithubIcon, LinkedinIcon } from "lucide-react";

import { User } from "@prisma/client";

const UserData = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const findUser = async () => {
      const user = await getUser({ id });
      setUser(user);
    };

    findUser();
  }, [id]);

  const userLinks = [
    {
      label: "Email",
      icon: <MailIcon />,
      href: `mailto:${user?.email}`,
      display: user?.email,
    },
    {
      label: "Portfolio",
      icon: <LinkIcon />,
      href: user?.portfolio,
      display: user?.portfolio ? new URL(user.portfolio).hostname : "",
    },
    {
      label: "GitHub",
      icon: <GithubIcon />,
      href: user?.github,
      display: user?.github?.replace("https://github.com/", "github/"),
    },
    {
      label: "LinkedIn",
      icon: <LinkedinIcon />,
      href: user?.linkedin,
      display: user?.linkedin?.replace("https://www.linkedin.com/", ""),
    },
  ];

  return user ? (
    <Card className="space-y-2.5">
      <CardHeader className="flex items-center justify-between p-2.5">
        <Identity user={user} />
        <div className="flex gap-5">
          <Count type="followers" count={250} />
          <Count type="following" count={80} />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-2 px-2.5">
        {user.location && <Location user={user} />}
        {userLinks.map(
          (link) =>
            link.href && (
              <Button key={link.label} size="link" variant="link" asChild>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <span className="text-primary">{link.icon}</span>
                  {link.display}
                </a>
              </Button>
            ),
        )}
      </CardContent>
    </Card>
  ) : (
    <UserDataSkeleton />
  );
};

export default UserData;
