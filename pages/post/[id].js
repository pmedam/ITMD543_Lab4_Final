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
  <div>
    <Link href="/">
      <a>Back to home</a>
    </Link>
    <h1>
      {id} - {title}
    </h1>
    <h2>
      <Link href={`/user/[userId]`} as={`/user/${userId}`}>
        <a>
          By {name} ({username})
        </a>
      </Link>
    </h2>
    <p>{body}</p>
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
