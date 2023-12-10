import fetch from "isomorphic-unfetch";
import Link from "next/link";

const postsUrl = `https://jsonplaceholder.typicode.com/posts`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;
const getPostUrl = id => `${postsUrl}/${id}`;
const getUserUrl = id => `${usersUrl}/${id}`;

const Post = ({
  post: { id, title, body },
  user: { id: userId, name, username }
}) => (
<div class="p-4">
  <Link href="/" class="text-blue-500 hover:underline">Back to home</Link>
  <h1 class="text-3xl font-bold mt-4">
    {name} ({username})
  </h1>
  <h2 class="text-2xl font-semibold mt-2">Posts by {name}</h2>
  {/* <p class="text-lg mt-2 font-medium text-gray-700">{post.title}</p>
  <p class="mt-2 text-gray-600">{post.body}</p> */}
</div>


);

Post.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const postResponse = await fetch(getPostUrl(id));
  const post = await postResponse.json();

  console.info(`post`, post);

  const userResponse = await fetch(getUserUrl(post.userId));
  const user = await userResponse.json();

  return { post, user };
};

export default Post;
