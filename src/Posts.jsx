import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Posts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Posts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.map((post) => (
          <div
            key={post.id}
            className="border rounded-xl shadow-md p-5 bg-white hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {post.title}
            </h3>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
