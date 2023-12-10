import fetch from "isomorphic-unfetch";
import Link from "next/link";

const postsUrl = `https://jsonplaceholder.typicode.com/posts`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;
const getUserPostsUrl = userId => `${postsUrl}?userId=${userId}`;
const getUserUrl = userId => `${usersUrl}/${userId}`;

const Post = ({ posts, user: { name, username } }) => (
<div class="p-4">
  <Link href="/" class="text-blue-500 hover:underline block mb-2">
    Back to home
  </Link>
  <h1 class="text-3xl font-bold mb-2">
    {name} ({username})
  </h1>
  <h2 class="text-2xl font-semibold mb-4">Posts by {name}</h2>
  <ul>
    {posts.map(post => (
      <li key={post.title} class="mb-2">
        <Link href={`/post/[id]`} as={`/post/${post.id}`} class="text-blue-500 hover:underline">
          {post.id} - {post.title}
        </Link>
      </li>
    ))}
  </ul>
</div>

);

Post.getInitialProps = async ctx => {
  const { userId } = ctx.query;
  const postsResponse = await fetch(getUserPostsUrl(userId));
  const posts = await postsResponse.json();

  const userResponse = await fetch(getUserUrl(userId));
  const user = await userResponse.json();

  console.info(`user`, user);

  return { posts, user };
};

export default Post;
