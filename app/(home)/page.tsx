import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { getUser } from "@/app/helpers/getUser";

import PostsList from "@/app/components/post/posts-list";

const Home = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user?.id
    ? await getUser({ id: session.user.id })
    : null;

  return user && <PostsList user={user} />;
};

export default Home;
