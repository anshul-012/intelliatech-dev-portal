import React, { useRef } from "react";
import "../styles/popup.css";
const Popup = ({ url, setIsOpen }) => {
	const bgRef = useRef();
	const closepop = () => {
		setIsOpen((prev) => !prev)
	}

	console.log("pop url", url);

	const closePopupWhileClickOnBg = (e) => {
		if (bgRef.current === e.target) setIsOpen((prev) => !prev);
	};
	return (
		<div onClick={closePopupWhileClickOnBg
		} ref={bgRef} className="img-popup">
			<button onClick={closepop}>X</button>
			<img src={url} alt="" />
		</div>
	);
};

export default Popup;
