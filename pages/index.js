import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { useState } from "react";

const postsUrl = `https://jsonplaceholder.typicode.com/posts`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;

const Users = ({ users }) => (
  <section>
    <h1>Users</h1>
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <Link href={`/user/[userId]`} as={`/user/${user.id}`}>
            <a>
              {user.id} - {user.name} ({user.username})
            </a>
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

  return (
    <>
      <section>
        <button onClick={() => setShouldFetchUsers(true)}>Users?</button>
        <h1>Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.title}>
              <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                <a>
                  {post.id} - {post.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {users && <Users users={users} />}
    </>
  );
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
