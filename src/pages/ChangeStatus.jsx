import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ImageRender from "../components/ImageRender";
import Popup from "../components/popup";
import ResumeButton from "../components/resumeButton";
import ResumePopup from "../components/resumePopup";
import axios from "axios";
import '../styles/changeStatus.css';
import EditButton from "../components/editButton";

const ChangeStatus = () => {
	const [profile, setProfile] = useState("");
	const [isPopup, setIsPopup] = useState(false);
	const [isPopupResume, setIsPopupResume] = useState(false);
	const [resumePdf, setResumePdf] = useState("");

	const [rowData, setRowData] = useState([
		//mock data
	]);

	const [colDefs, setColDefs] = useState([
		{ field: "name" },
		{ field: "mainSkill" },
		{ field: "skills" },
		{ field: "experience" },
		{ field: "engineerType" },
		{ field: "email" },
		{
			field: "bench",
			editable: true,
			cellEditor: "agSelectCellEditor",
			cellEditorParams: { values: ["ONBENCH", "ONPROJECT"] },
		},
		{
			field: "status",
			editable: true,
			cellEditor: "agSelectCellEditor",
			cellEditorParams: { values: ["SHOW", "HIDE"] },
		},
		{ field: "resume", cellRenderer: ResumeButton },
		{ field: "profile", cellRenderer: ImageRender },
		{ field: "edit", cellRenderer: EditButton }
	]);

	useEffect(() => {
		axios.get(`https://api.resource.intelliatech.com/api/developers`, {
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("ADMIN"))?.token}`
			}, withCredentials: true
		}).then((res) => {

			const data = res.data.data;
			if (data) {
				setRowData(data);
			}
		});
	}, []);

	const handler = (data) => {
		if (data.colDef.field === "profile") {
			setProfile("https://api.resource.intelliatech.com" + data.data.profile);
			setIsPopup((prev) => !prev);
		}
		if (data.colDef.field === "resume") {
			setIsPopupResume((prev) => !prev);
			setResumePdf("https://api.resource.intelliatech.com" + data.data.resume);
		}
	};

	const changeStatus = async (data) => {

		if (data?.colDef?.field === "bench") {
			await axios.patch(`https://api.resource.intelliatech.com/api/developers/${data?.data?._id}`, {}, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem("ADMIN"))?.token}`
				}, withCredentials: true
			});
		}
		if (data?.colDef?.field === "status") {
			await axios.patch(`https://api.resource.intelliatech.com/api/developers/status/${data?.data?._id}`, {}, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem("ADMIN"))?.token}`
				}, withCredentials: true
			});

		}
	};

	return (
		<div className="home">
			<div className="change-status">
				<div className="change-status-scroll">
					{isPopupResume ? (

						<ResumePopup
							url={resumePdf}
							setIsOpen={setIsPopupResume}
						/>
					) : null}
					{isPopup ? (
						<Popup url={profile} setIsOpen={setIsPopup} />
					) : null}
					<div className="ag-theme-quartz ag-grid-container">
						<AgGridReact
							rowData={rowData}
							columnDefs={colDefs}
							onCellClicked={handler}
							onCellValueChanged={changeStatus}
							pagination={true}
							paginationPageSize={10}
							domLayout='autoHeight'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangeStatus;

