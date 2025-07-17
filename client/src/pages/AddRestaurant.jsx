import React, { useState } from "react";

const AddRestaurant = () => {
  const [restaurant, setRestaurants] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurants({ ...restaurant, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurants/",
        {
          method: "POST",
          body: JSON.stringify(restaurant),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        alert("Restaurant added to successfully!");
        setRestaurants({
          name: "",
          type: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto flex items-center flex-col">
      <h1 className="text-2xl mt-3">Add New Restaurant</h1>
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
        <legend className="text-center">What is your restaurant image?</legend>
        <label className="input">
          <input
            type="text"
            name="imageUrl"
            value={restaurant.imageUrl}
            className="grow"
            placeholder="your image link"
            onChange={handleChange}
          />
          <span className="badge badge-neutral badge-xs">*Must Type</span>
        </label>
      </div>
      {restaurant.imageUrl && (
        <div className="flex items-center gap-2">
          <img className="h-32" src={restaurant.imageUrl}></img>
        </div>
      )}
      <div className="mt-3 space-x-2">
        <a
          href="/"
          onClick={handleSubmit}
          className="btn btn-soft btn-success "
        >
          Add
        </a>
        <button className="btn btn-soft btn-error">Cancel</button>
      </div>
    </div>
  );
};

export default AddRestaurant;
