import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const createPost = async (newPost) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  return response.json();
};

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    // optimistic
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (oldPosts) => [
        ...oldPosts,
        { id: Date.now(), ...newPost },
      ]);
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(["posts"], context.previousPosts);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title, body: "This is a new post." });
  };
  return (
    <>
      <form>
        <div className="flex  ml-4 flex-col max-w-md mx-auto gap-4">
          <input
            type="text"
            placeholder="Post title..."
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <button
            onClick={handleSubmit}
            className=" ml-4 text-green-500 p-2 rounded-xl button border"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
