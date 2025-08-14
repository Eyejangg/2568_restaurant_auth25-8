import { useState } from "react";
import AuthService from "../services/auth.service.js";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const Signin = () => {
  const [signin, setSignin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignin((signin) => ({ ...signin, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(
        signin.username,
        signin.password
      );
      if (currentUser.status === 200) {
        Swal.fire({
          title: "USER SIGNIN",
          text: "Signin Successfully",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "USER SIGNIN",
        text: error?.response?.data?.message || "Signin Failed!",
        icon: "error",
      });
    }
  };
  return (
    <div className="container mx-auto flex items-center flex-col">
      <h6 className="text-2xl mt-3">WELCOME TO GRAB RESTAURANT!</h6>
      <div className="mt-2">
        <legend className="mt-2">USERNAME:</legend>
        <input
          type="text"
          name="username"
          value={signin.username}
          className="input"
          placeholder="username"
          onChange={handleChange}
        />
      </div>
      <div className="mt-2">
        <legend className="mt-2">PASSWORD:</legend>
        <input
          type="text"
          name="password"
          value={signin.password}
          className="input"
          placeholder="password"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3 space-x-2">
        <a onClick={handleSubmit} className="btn btn-soft btn-success ">
          SIGN IN
        </a>
        <button className="btn btn-soft btn-error">CANCEL</button>
      </div>
      <h2>you have an account yet?</h2>
      <a href="/signup" className="link link-success text-center">
        Click Here!
      </a>
    </div>
  );
};

export default Signin;
