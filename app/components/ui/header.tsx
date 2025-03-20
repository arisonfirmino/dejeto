import Menu from "@/app/components/ui/menu";
import Search from "@/app/components/ui/search";
import NewPost from "@/app/components/ui/new-post";
import SignIn from "@/app/components/signin/signin";
import Nav from "@/app/components/ui/nav";

const Header = () => {
  return (
    <header className="bg-card border-border/30 border-b">
      <div className="flex items-center justify-between p-3 pb-5">
        <Menu />
        <div className="flex items-center gap-5">
          <Search />
          <NewPost />
          <SignIn />
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
