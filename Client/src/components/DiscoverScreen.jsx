import React from "react";

const DiscoverScreen = () => {
  const categories = [
    { name: "Ocean", img: "https://via.placeholder.com/60" },
    { name: "Mountain", img: "https://via.placeholder.com/60" },
    { name: "Camp", img: "https://via.placeholder.com/60" },
    { name: "Forest", img: "https://via.placeholder.com/60" },
  ];

  const blogs = [
    {
      title: "The Island Shrine of Itsukushima",
      image: "https://via.placeholder.com/200",
    },
    {
      title: "Osaka",
      image: "https://via.placeholder.com/200",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pb-16 p-6">
      <h1 className="text-2xl font-bold">Let's Discover</h1>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search destination"
          className="w-full p-3 rounded-lg border border-gray-300"
        />
      </div>
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Categories</h2>
        <div className="flex space-x-4">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <img
                src={category.img}
                alt={category.name}
                className="w-12 h-12 rounded-full"
              />
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold mb-4">Popular</h2>
        <div className="grid grid-cols-2 gap-4">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-28 w-full object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold">{blog.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverScreen;
