import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { useState } from "react";

const postsUrl = `https://jsonplaceholder.typicode.com/posts`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;

const Users = ({ users }) => (
<section class="p-4">
  <h1 class="text-3xl font-bold mb-4">Users</h1>
  <ul class="list-disc pl-6">
    {users.map(user => (
      <li key={user.id} class="mb-2">
        <Link className="text-blue-500 hover:underline" href={`/user/[userId]`} as={`/user/${user.id}`}>
            {user.id} - {user.name} ({user.username})
        </Link>
      </li>
    ))}
  </ul>
</section>

);

const getUsers = url => fetch(url).then(_ => _.json());

const Index = ({ posts }) => {
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false);

  const { data: users } = useSWR(
    () => (shouldFetchUsers ? usersUrl : null),
    getUsers
  );

  return <>
<section className="p-4">
  <button
    onClick={() => setShouldFetchUsers(true)}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
  >
    Users?
  </button>
  <h1 className="text-3xl font-bold mt-4 mb-2">Posts</h1>
  <ul className="list-disc pl-6">
    {posts.map(post => (
      <li key={post.title} className="mb-2">
        <Link className="text-blue-500 hover:underline" href={`/post/[id]`} as={`/post/${post.id}`}>
            {post.id} - {post.title}
        </Link>
      </li>
    ))}
  </ul>
</section>

    {users && <Users users={users} />}
  </>;
};

Index.getInitialProps = async function() {
  const postsResponse = await fetch(postsUrl);
  const posts = (await postsResponse.json()).slice(0, 5);

  // const usersResponse = await fetch(usersUrl);
  // const users = (await usersResponse.json()).slice(0, 5);

  // console.info(`users`, users);
  // return { posts, users };
  return { posts };
};

export default Index;
