import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateRestaurant = () => {
  const { id } = useParams();

  const [restaurant, setRestaurants] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/restaurants/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setRestaurants(response);
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          icon: "error",
          title: "Error fetching data",
          text: "error",
        });
      });
  }, [id]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/restaurants/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(restaurant),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Update Successfully",
          text: `Name: ${restaurant.name}\nType: ${restaurant.type}\nImage URL: ${restaurant.imageUrl}`,
        });
      } else {
        const err = await response.json();
        throw new Error(err.message || "Something went wrong");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="container mx-auto flex items-center flex-col">
      <h1 className="text-2xl mt-3">Update Your Restaurant</h1>

      <div className="mt-2">
        <legend className="mt-2">What is your restaurant name?</legend>
        <input
          type="text"
          name="name"
          value={restaurant.name}
          className="input"
          placeholder="Type here"
          onChange={handleChange}
        />
      </div>

      <div className="mt-2">
        <legend className="text-center mt-2">
          What is your restaurant type?
        </legend>
        <input
          type="text"
          name="type"
          value={restaurant.type}
          className="input"
          placeholder="Type here"
          onChange={handleChange}
        />
      </div>

      <div className="mt-2">
        <legend className="text-center">
          What is your restaurant imageUrl?
        </legend>
        <label className="input">
          <input
            type="text"
            name="imageUrl"
            value={restaurant.imageUrl}
            className="grow"
            placeholder="Your image URL link"
            onChange={handleChange}
          />
          <span className="badge badge-neutral badge-xs">*Must Type</span>
        </label>
      </div>

      {restaurant.imageUrl && (
        <div className="flex items-center gap-2">
          <img className="h-32" src={restaurant.imageUrl} alt="Restaurant" />
        </div>
      )}

      <div className="mt-3 space-x-2">
        <button onClick={handleSubmit} className="btn btn-soft btn-success">
          Update
        </button>
        <a href="/" className="btn btn-soft btn-error">
          Cancel
        </a>
      </div>
    </div>
  );
};

export default UpdateRestaurant;
