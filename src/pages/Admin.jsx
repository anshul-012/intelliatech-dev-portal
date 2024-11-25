import React from "react";
import "../styles/admin.css";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
const Admin = () => {
	const navigate = useNavigate();
	const user = localStorage.getItem("ADMIN");

	// if (user?.role !== "ADMIN") {
	// 	navigate("/");
	// }

	const logoutHandler = () => {
		localStorage.clear();
		navigate("/login");
	};
	return (
		<div className="admin">
			<nav>
				<img
					className="intelliatech-img"
					src="https://intelliatechcom33628.zapwp.com/q:u/r:1/wp:1/w:228/u:https://intelliatech.com/wp-content/uploads/2023/12/Logo-Black-TM.png"
					alt=""
				/>
				<button className="ad-btn side-bar-btn" onClick={logoutHandler}>Logout</button>
			</nav>
			<div className="main-div">
				<div className="left">
					<button className="side-bar-btn" onClick={() => navigate("/admin")}>Add Dev</button>
					<button className="side-bar-btn" onClick={() => navigate("/admin/change-status")}>Change Status</button>
					<button className="side-bar-btn" onClick={() => navigate("/")}>Home</button>
				</div>
				<div className="right">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Admin;
