import React, { useState } from "react";
import "../styles/button.css"
const ImageRender = (data) => {

	console.log(data);

	const [isOpen, setIsOpen] = useState(false);
	const modelHandler = () => {
		setIsOpen(!isOpen);
	};

	return <button className="profile-bt" onClick={modelHandler}>
		<img src={"https://api.resource.intelliatech.com" + data?.data?.profile} className="img-pro" alt="" />
		View </button>;
};

export default ImageRender;
