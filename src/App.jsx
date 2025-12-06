import { useState } from "react";
import Posts from "./Posts";
import PostsById from "./PostsById";
import CreatePost from "./CreatePost";

function App() {
  const [isMounted, setIsMounted] = useState(false);
  return (
    <>
      <div className="min-h-screen  py-10">
        {/* <button
          className="flex   mx-auto text-green-500 p-3 rounded-xl button border"
          onClick={() => setIsMounted((prev) => !prev)}
        >
          Toggle
        </button>
        {isMounted && <Posts />}
        <PostsById id={3} /> */}
        <CreatePost />
        <Posts />
      </div>
    </>
  );
}

export default App;
