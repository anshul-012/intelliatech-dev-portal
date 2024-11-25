import React, { useState } from "react";
import "../styles/button.css";

const ResumeButton = () => {
	return (
		<button className="profile-bt">
			{" "}
			<img
				className="img-pro"
				src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-resume-icon-png-image_4267336.jpg"
				alt=""
			/>{" "}
			Resume
		</button>
	);
};

export default ResumeButton;
