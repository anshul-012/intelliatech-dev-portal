import React, { useState } from "react";
import "../styles/adddev.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const AddDev = () => {
	const [loading, setLoading] = useState(false);
	const Navigate = useNavigate();
	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading((prev) => !prev);
		const form = e.target;
		const formData = new FormData(form);

		try {
			const res = await axios.post(
				`https://api.resource.intelliatech.com/api/admin/create-developer`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem("ADMIN"))?.token}`
					},
					withCredentials: true,
				}
			);
			toast.success(res?.data?.message);
			setLoading((prev) => !prev);
			Navigate("/admin/change-status");
		} catch (error) {
			toast.error(error.response.data.message);
			setLoading((prev) => !prev);
			console.log(error);
		}
	};

	if (loading) {
		return (
			<div className="add-dev">
				<div className="loader"></div>
			</div>
		);
	}
	return (
		<div className="add-dev">
			<form onSubmit={submitHandler}>

				<div className="outer-div">

					<div className="input-div">
						<label htmlFor="">Name</label>
						<input name="name" type="text" placeholder="Name" />
					</div>
					<div className="input-div">
						<label htmlFor="">Email</label>
						<input name="email" type="text" placeholder="Email" />
					</div>
					<div className="input-div">
						<label htmlFor="">Main Skill</label>
						<input name="mainSkill" type="text" placeholder="Eg React.js" />
					</div>
					<div className="input-div">
						<label htmlFor="">Skill</label>
						<input name="skills" type="text" placeholder="Skill" />
					</div>
					<div className="input-div">
						<label htmlFor="">Experience</label>
						<input name="experience" type="text" placeholder="Experience" />
					</div>

				</div>
				<div className="outer-div">
					<div className="input-div">
						<label htmlFor="">Engineer Type</label>
						<select name="engineerType" id="">
							<option selected value="Frontend">
								Frontend
							</option>
							<option value="Backend">Backend</option>
							<option value="Full Stack">Full Stack</option>
							<option value="QA">QA</option>
						</select>
					</div>
					<div className="input-div">
						<label htmlFor="">Status</label>
						<select name="status" id="">
							<option selected value="SHOW">
								SHOW
							</option>
							<option value="HIDE">HIDE</option>
						</select>
					</div>
					<div className="input-div">
						<label htmlFor="">Name</label>
						<select name="bench" id="">
							<option selected value="ONBENCH">
								ON BENCH
							</option>
							<option value="ONPROJECT">ON PROJECT</option>
						</select>					</div>
					<div className="input-div">
						<label htmlFor="">Profile</label>
						<input name="profile" accept="image/*" type="file" placeholder="Name" />
					</div>

					<div className="input-div">
						<label htmlFor="">Resume</label>
						<input name="resume" accept=" .pdf" type="file" placeholder="Name" />
					</div>

					<div className="input-div">
						<label htmlFor=""></label>
						<button>Add Developer</button>
					</div>

				</div>

			</form>
			<Footer />
		</div>
	);
};

export default AddDev;
