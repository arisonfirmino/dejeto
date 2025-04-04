import Menu from "@/app/components/header/menu";
import Search from "@/app/components/header/search";
import NewPost from "@/app/components/header/new-post";
import Login from "@/app/components/header/login/login";
import Nav from "@/app/components/header/nav";

const Header = () => {
  return (
    <header className="bg-card border-border/30 border-b">
      <div className="flex items-center justify-between p-2.5">
        <Menu />
        <div className="flex gap-5">
          <Search />
          <NewPost />
          <Login />
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
