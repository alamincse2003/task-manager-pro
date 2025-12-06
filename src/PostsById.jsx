import { useQuery } from "@tanstack/react-query";

const fetchPosts = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const PostsById = ({ id }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPosts(id),
    staleTime: 1000,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-green-500">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl">
        Error: {error.message}
      </div>
    );

  return (
    <>
      <h3 className="text-center">{data.title}</h3>
    </>
  );
};

export default PostsById;
