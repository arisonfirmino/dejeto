"use client";

import { useSession } from "next-auth/react";

import Menu from "@/app/components/ui/menu";
import Search from "@/app/components/ui/search";
import NewPost from "@/app/components/ui/new-post";
import UserAvatar from "@/app/components/ui/user-avatar";
import SignIn from "@/app/components/signin/signin";
import Nav from "@/app/components/ui/nav";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-card border-border/30 border-b">
      <div className="flex items-center justify-between p-3 pb-5">
        <Menu session={session} />
        <div className="flex items-center gap-5">
          <Search />
          <NewPost session={session} />
          {session ? <UserAvatar user={session.user} /> : <SignIn />}
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
