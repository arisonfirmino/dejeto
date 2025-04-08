import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { getUser } from "@/app/helpers/getUser";

import Menu from "@/app/components/header/menu";
import Search from "@/app/components/header/search";
import NewPost from "@/app/components/header/new-post";
import UserDrawer from "@/app/components/user-drawer";
import Login from "@/app/components/header/login/login";
import Nav from "@/app/components/header/nav";

const Header = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user?.id
    ? await getUser({ id: session.user.id })
    : null;

  return (
    <header className="bg-card border-border/30 border-b">
      <div className="flex items-center justify-between p-2.5">
        <Menu user={user} />
        <div className="flex gap-5">
          <Search />
          <NewPost />
          {user ? (
            <UserDrawer user={user} showLogoutButton={true} />
          ) : (
            <Login />
          )}
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
