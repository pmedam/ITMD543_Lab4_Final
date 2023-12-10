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
    <div className="min-h-screen flex items-center justify-center bg-gray-600 text-white">
    <div className="p-4 bg-gray-800 rounded-md">
      <Link href="/" className="text-blue-500 hover:underline block mb-2">
        Back to home
      </Link>
      <h1 className="text-3xl font-bold mt-4">
        {name} ({username})
      </h1>
      <h2 className="text-2xl font-semibold mt-2">Posts by {name}</h2>
      <p className="text-lg mt-2 font-medium text-gray-300">{title}</p>
      <p className="mt-2 text-gray-400">{body}</p>
    </div>
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
