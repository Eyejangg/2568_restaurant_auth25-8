import React from "react";
//card
const Card = (props) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurants/" + id,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        alert("Restaurant had been deleted!!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={props.imageUrl} alt="IMAGE" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.type}</p>
        <div className="card-actions justify-end">
          <a href={"/update/" + props.id} className="btn btn-warning">
            Edit
          </a>
          <button
            onClick={() => handleDelete(props.id)}
            className="btn btn-error"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
