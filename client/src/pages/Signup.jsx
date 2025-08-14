import { useState } from "react";
import AuthService from "../services/auth.service.js";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const newUser = await AuthService.register(
        user.username,
        user.name,
        user.email,
        user.password
      );

      if (newUser.status === 200) {
        Swal.fire({
          title: "User Registration",
          text: newUser.data.message,
          icon: "success",
        }).then(() => {
          setUser({
            username: "",
            name: "",
            email: "",
            password: "",
          });
          navigate("/signin");
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: "Registration Failed",
        text: error.response?.data?.message || "Registeration Failed!",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto flex items-center flex-col">
      <h1 className="text-2xl mt-3">NICE TO MEET YOU MY NEW USER</h1>
      <div className="mt-2">
        <legend className="mt-2">USERNAME:</legend>
        <input
          type="text"
          name="username"
          value={user.username}
          className="input"
          placeholder="username"
          onChange={handleChange}
        />
      </div>
      <div className="mt-2">
        <legend className="mt-2">PASSWORD:</legend>
        <input
          type="password"
          name="password"
          value={user.password}
          className="input"
          placeholder="password"
          onChange={handleChange}
        />
      </div>
      <div className="mt-2">
        <legend className="mt-2">NAME:</legend>
        <input
          type="text"
          name="name"
          value={user.name}
          className="input"
          placeholder="name"
          onChange={handleChange}
        />
        <legend className="mt-2">EMAIL:</legend>
        <input
          type="email"
          name="email"
          value={user.email}
          className="input"
          placeholder="email"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3 space-x-2">
        <button onClick={handleSubmit} className="btn btn-soft btn-success">
          SIGN UP
        </button>
        <button className="btn btn-soft btn-error">CANCEL</button>
      </div>
    </div>
  );
};

export default Signup;
