import { getPosts } from "@/app/helpers/getPosts";

import PostsList from "@/app/components/post/posts-list";

const Home = async () => {
  const posts = await getPosts();

  return <PostsList posts={posts} />;
};

export default Home;
