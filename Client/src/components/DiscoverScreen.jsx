import React, { useEffect, useState } from "react";
import { getBlogs, search } from "../services/api";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import Masonry from 'react-masonry-css'; // Import Masonry
import { useSelector } from "react-redux";

const DiscoverScreen = () => {
  const [usersearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newPost, setNewPost] = useState([]); // 'user' or 'blog'
  const user = useSelector((state) => state.user?.userData);

  // Function to fetch search results
  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      // Fetch both user and blog results based on the query
      const userResults = await search(query, "user");
      const blogResults = await search(query, "blog");
      // Combine results and categorize them
      const combinedResults = [
        ...userResults.data.data.map((user) => ({ ...user, type: "user" })),
        ...blogResults.data.data.map((blog) => ({ ...blog, type: "blog" })),
      ];  

      setSearchResults(combinedResults);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { name: "Technology", img: "https://source.unsplash.com/random/800x600/?technology" },
    { name: "Anime", img: "https://source.unsplash.com/random/800x600/?anime" },
    { name: "Lifestyle", img: "https://source.unsplash.com/random/800x600/?lifestyle" },
    { name: "Health", img: "https://source.unsplash.com/random/800x600/?health" },
    { name: "Education", img: "https://source.unsplash.com/random/800x600/?education" },
    { name: "Business", img: "https://source.unsplash.com/random/800x600/?business" },
    { name: "Finance", img: "https://source.unsplash.com/random/800x600/?finance" },
    { name: "Travel", img: "https://source.unsplash.com/random/800x600/?travel" },
    { name: "Food", img: "https://source.unsplash.com/random/800x600/?food" },
    { name: "Fitness", img: "https://source.unsplash.com/random/800x600/?fitness" },
    { name: "Sports", img: "https://source.unsplash.com/random/800x600/?sports" },
    { name: "Entertainment", img: "https://source.unsplash.com/random/800x600/?entertainment" },
    { name: "Politics", img: "https://source.unsplash.com/random/800x600/?politics" },
    { name: "Science", img: "https://source.unsplash.com/random/800x600/?science" },
    { name: "Art", img: "https://source.unsplash.com/random/800x600/?art" },
    { name: "Culture", img: "https://source.unsplash.com/random/800x600/?culture" },
    { name: "Gaming", img: "https://source.unsplash.com/random/800x600/?gaming" },
    { name: "Music", img: "https://source.unsplash.com/random/800x600/?music" },
    { name: "Movies", img: "https://source.unsplash.com/random/800x600/?movies" },
    { name: "Fashion", img: "https://source.unsplash.com/random/800x600/?fashion" },
    { name: "Photography", img: "https://source.unsplash.com/random/800x600/?photography" },
    { name: "Books", img: "https://source.unsplash.com/random/800x600/?books" },
    { name: "News", img: "https://source.unsplash.com/random/800x600/?news" },
    { name: "Marketing", img: "https://source.unsplash.com/random/800x600/?marketing" },
    { name: "History", img: "https://source.unsplash.com/random/800x600/?history" },
    { name: "Religion", img: "https://source.unsplash.com/random/800x600/?religion" },
    { name: "Parenting", img: "https://source.unsplash.com/random/800x600/?parenting" },
    { name: "Environment", img: "https://source.unsplash.com/random/800x600/?environment" },
    { name: "Psychology", img: "https://source.unsplash.com/random/800x600/?psychology" },
    { name: "Self-Improvement", img: "https://source.unsplash.com/random/800x600/?self-improvement" },
    { name: "Startup", img: "https://source.unsplash.com/random/800x600/?startup" },
    { name: "Design", img: "https://source.unsplash.com/random/800x600/?design" },
    { name: "Architecture", img: "https://source.unsplash.com/random/800x600/?architecture" },
    { name: "Real Estate", img: "https://source.unsplash.com/random/800x600/?real-estate" },
    { name: "Automotive", img: "https://source.unsplash.com/random/800x600/?automotive" },
    { name: "Adventure", img: "https://source.unsplash.com/random/800x600/?adventure" },
  ];

  useEffect(() => {
    getBlogs(1, 4)
      .then(res => setNewPost(res.data.data))
      .catch(err => console.log(err));
  }, []);

  // Debounced search function
  const debouncedSearch = debounce((query) => fetchSearchResults(query), 300);

  // Handle input change with debounce
  const handleInputChange = (e) => {
    const query = e.target.value;
    setUserSearch(query);
    debouncedSearch(query);
  };

  return (
    <div className="bg-gray-100 min-h-full pb-16 p-6 w-full">
      <h1 className="text-2xl font-bold">Let's Discover</h1>
      <div className="mt-4 relative">
        <input
          type="text"
          placeholder="Search for users or blogs"
          className="w-full p-3 rounded-lg border border-gray-300"
          value={usersearch}
          onChange={handleInputChange}
        />
        {isLoading && (
          <i className="fa-solid fa-spinner fa-spin absolute right-4 top-4 text-gray-500"></i>
        )}
      </div>

      {/* Categories Section */}
      <div className="mt-4 overflow-auto">
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

      {/* Search Results Section */}
      <div className="mt-6 h-96 overflow-scroll">
        {searchResults.length > 0 ? (
          <>
            <h2 className="font-semibold mb-4">Search Results</h2>
            <div className="space-y-4">
              <Masonry
                breakpointCols={{ 320: 1, 480: 2, 768: 3, 1024: 4 }}
                className="flex gap-4"
                columnClassName="masonry-column"
              >
                {searchResults.map((result, index) => {
                  if (result.type === "user") {
                    if (user._id == result._id ) return ''
                    return (
                      
                      <div
                        key={index}
                        className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-md mb-5 overflow-hidden"
                      ><Link to={`/profile/${result?._id}`}>
                        <img
                          src={result.avatar}
                          alt={result.userName}
                          className="w-12 h-12 rounded-full"
                        />
                        </Link>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {result.userName}
                          </h3>
                          <p className="text-sm text-gray-500">{result.name}</p>
                        </div>
                      </div>
                    );
                  } else if (result.type === "blog") {
                    // Render blog format
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden mb-5"
                      >
                        <Link to={`/details/${result._id}`}>
                          <img
                            src={result.coverImage}
                            alt={result.title}
                            className="h-28 w-full object-cover"
                          />
                        </Link>
                        <div className="p-3">
                          <h3 className="text-sm font-semibold">{result.title}</h3>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </Masonry>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default DiscoverScreen;
