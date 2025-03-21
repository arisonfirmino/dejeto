import UserCard from "@/app/components/ui/user-card";
import PostsList from "@/app/components/post/posts-list";

import { getPosts } from "@/app/helpers/getPosts";

const Home = async () => {
  const posts = await getPosts();

  return (
    <>
      <UserCard />
      <PostsList posts={posts} />
    </>
  );
};

export default Home;
