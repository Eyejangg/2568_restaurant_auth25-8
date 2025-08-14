import React, { useState, useEffect } from "react";
import Restaurant from "../components/Restaurants";
import RestaurantService from "../services/restaurant.service";
import Swal from "sweetalert2";
const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  // const [keyword, setKeyword] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleSearch = (keyword) => {
    if (keyword === "") {
      setFilteredRestaurants(restaurants);
      return;
    }
    const result = restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    setFilteredRestaurants(result);
  };
  useEffect(() => {
    const getAllRestaurants = async () => {
      try {
        const response = await RestaurantService.getAllRestaurants();
        console.log(response);
        if (response.status === 200) {
          setRestaurants(response.data);
          console.log(response.data);
          setFilteredRestaurants(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All restaurant",
          icon: "error",
          text: error?.response?.data.message || error.message,
        });
      }
    };

    getAllRestaurants();
  }, []);
  return (
    <div className="container mx-auto ">
      {
        //Navigation Bar
      }
      {
        //Header
      }
      <div>
        <h1 className="title justify-center text-3xl text-center m-5 p-5">
          Grab Restaurant
        </h1>
      </div>
      {
        //Sreach Bar
      }
      <div className="mb-5 flex justify-center item-center">
        <label className="input flex item-center gap-2 w-2xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            required
            placeholder="Search"
          />
        </label>
      </div>
      <Restaurant restaurants={filteredRestaurants} />
    </div>
  );
};

export default Home;
