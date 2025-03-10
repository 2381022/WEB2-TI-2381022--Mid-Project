import { useEffect, useState } from "react";

const Home = () => {
  const [today, setTime] = useState(new Date());
  const currDate = String(today.getDate()).padStart(2, '0');
  const currMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currHour = String(today.getHours()).padStart(2,'0');
  const currMnt = String(today.getMinutes()).padStart(2,'0');
  const currSec = String(today.getSeconds()).padStart(2,"0");
  const currYear = today.getFullYear();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">

        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold">Welcome!</h2>
            <div className="text-gray-600 text-sm">
              {currDate}/{currMonth}/{currYear} - {currHour}:{currMnt}:{currSec}
            </div>
          </div>
          <p className="max-w-screen-md text-gray-500 md:text-lg">Your daily dose of inspiration and delicious recipes.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1739732119808-0aeef88d14d9?q=80&w=1011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="hero-bg" className="w-full h-48 object-cover object-center" />
            <div className="p-4">
              <h3 className="text-gray-800 font-semibold text-lg mb-2">Featured Recipe</h3>
              <p className="text-gray-500">Delicious and easy recipe to try today.</p>
              {/* Add link/button if applicable */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product" className="w-full h-48 object-cover object-center" />
            <div className="p-4">
              <h3 className="text-gray-800 font-semibold text-lg mb-2">Our Product</h3>
              <p className="text-gray-500">Learn more about our products and services.</p>
              {/* Add link/button if applicable */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D" alt="Recipes" className="w-full h-48 object-cover object-center" />
            <div className="p-4">
              <h3 className="text-gray-800 font-semibold text-lg mb-2">Recipes</h3>
              <p className="text-gray-500">Explore a variety of delicious recipes.</p>
              {/* Add link/button if applicable */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1616509091334-2be806ea7a3b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Post" className="w-full h-48 object-cover object-center" />
            <div className="p-4">
              <h3 className="text-gray-800 font-semibold text-lg mb-2">Recent Post</h3>
              <p className="text-gray-500">Read our latest blog post.</p>
              {/* Add link/button if applicable */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;