import { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import Cookies from 'js-cookie';
const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });


  const loginHandler = async () => {
    try {
      const res = await axios.post(`https://api.resource.intelliatech.com/api/admin/signin`, userData);

      console.log("Response data:", res?.data);

      localStorage.setItem("ADMIN", JSON.stringify(res?.data))

      if (res?.data?.role === "ADMIN") {
        navigate("/admin")
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Login error:", error);

    }
  };

  const backHandler = async () => {
    navigate("/");
  };
  return (
    <div className="login">
      <img
        className="intelliatech-img"
        src="https://intelliatechcom33628.zapwp.com/q:u/r:1/wp:1/w:228/u:https://intelliatech.com/wp-content/uploads/2023/12/Logo-Black-TM.png"
        alt=""
      />

      <div className="outer-div">
        <div className="inner-div">
          <labal className="login-label">Email</labal>
          <input
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
            className="login-input"
            placeholder="Email..."
            type="text"
          />
        </div>
        <div className="inner-div">
          <labal className="login-label">Password</labal>
          <input
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="login-input"
            placeholder="Password..."
            type="text"
          />
        </div>

        <div className="inner-div">
          <button onClick={loginHandler}> Login</button>
          <button onClick={backHandler}> Back To Home</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
