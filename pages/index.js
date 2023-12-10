import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { useState } from "react";

const postsUrl = `https://jsonplaceholder.typicode.com/posts`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;

const Users = ({ users }) => (
  <section className="p-4">
    <h1 className="text-3xl font-bold mb-4">Users</h1>
    <div className="flex flex-wrap">
      {users.map(user => (
        <div key={user.id} className="w-1/2 mb-2 pr-2">
          <div className="bg-white p-4 rounded-md hover:shadow-md">
            <p className="text-sm text-gray-700">{user.id} - {user.name}</p>
            <p className="text-xs text-gray-500">{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const getUsers = url => fetch(url).then(_ => _.json());

const Index = ({ posts }) => {
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const resetToDefault = () => {
    setDarkMode(false);
  };

  const { data: users } = useSWR(
    () => (shouldFetchUsers ? usersUrl : null),
    getUsers
  );

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-600 shadow-md'}`}>
      <section className="flex-grow p-4 flex justify-center">
        <div className="w-full md:w-1/2">
          <button
            onClick={() => setShouldFetchUsers(true)}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mb-4`}
          >
            Users
          </button>

          <h1 className="text-3xl font-bold mt-4 mb-2">Posts</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map(post => (
              <div key={post.title} className="bg-white p-4 rounded-md hover:shadow-md">
                <p className="text-lg font-medium text-gray-700">{post.id} - {post.title}</p>
                <Link className="text-blue-500 hover:underline mt-2 block" href={`/post/[id]`} as={`/post/${post.id}`}>
                  Read more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {users && <Users users={users} />}

      <button
        onClick={toggleDarkMode}
        className={`bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 mt-4 ml-4 md:ml-0`}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <link rel="icon" href={darkMode ? '/dark-mode-icon.ico' : '/light-mode-icon.ico'} onClick={resetToDefault} />
    </div>
  );
};

Index.getInitialProps = async function () {
  const postsResponse = await fetch(postsUrl);
  const posts = (await postsResponse.json()).slice(0, 5);

  return { posts };
};

export default Index;
