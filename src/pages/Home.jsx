import React, { useEffect, useState, useRef } from "react";
import "../styles/home.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import ImageRender from "../components/ImageRender";
import Popup from "../components/popup";
import ResumeButton from "../components/resumeButton";
import ResumePopup from "../components/resumePopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const [profile, setProfile] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const [isPopupResume, setIsPopupResume] = useState(false);
  const [resumePdf, setResumePdf] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();
  const gridApi = useRef(null); 
  const admin = JSON.parse(localStorage.getItem("ADMIN"))

  const autoGroupColumnDef = {
    headerName: "Make",
    field: "make",
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: {
      checkbox: true,
    },
  };

  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([
   
    { field: "name" },
    { field: "mainSkill", rowGroup: true, hide: false },
    // { field: "skills", filter: 'agTextColumnFilter' }, 
    { field: "skills", filter: 'agSetColumnFilter' }, 
    { field: "experience" },
    { field: "engineerType" },
    { field: "resume", cellRenderer: ResumeButton },
    { field: "profile", cellRenderer: ImageRender },
  ]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      setIsAdmin(true);
    }

    axios.get(`https://api.resource.intelliatech.com/api/developers?status=false`,{ withCredentials:true}).then((res) => {
      const data = res.data.data;
      if (data) {
        setRowData(data);
      }
    });
  }, []);

  const handler = (data) => {
    if (data.colDef.field === "profile") {
      setProfile("https://api.resource.intelliatech.com"+ data.data.profile);
      setIsPopup((prev) => !prev);
    }
    if (data.colDef.field === "resume") {
      setIsPopupResume((prev) => !prev);
      setResumePdf("https://api.resource.intelliatech.com" + data.data.resume);
    }
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const onGridReady = (params) => {
    gridApi.current = params.api; 
  };

  const redirectToExternal =()=> {
    window.open('https://intelliatech.com/',"_target");
  }

  const redirectToHirepage = ()=>{
    window.open("https://intelliatech.com/contact-us/","_target")
  }

  return (
    <div className="home">
      <div className="home-nav">
        <img
        onClick={redirectToExternal}
        className="intelliatech-img"
        src="https://intelliatechcom33628.zapwp.com/q:u/r:1/wp:1/w:228/u:https://intelliatech.com/wp-content/uploads/2023/12/Logo-Black-TM.png"
        alt=""
        />

        

       {admin ? <button  className="home-btn"
       onClick={()=> 
        navigate("/admin")
       }>Admin Panel</button> :
        <div className="button-container">
          <button onClick={redirectToHirepage}>
            Hire A Developer
          </button>
          {isAdmin && (
            <button onClick={handleAdminClick}>Admin Page</button>
          )}
        </div>}
      </div>
      {isPopupResume ? (
        <ResumePopup url={resumePdf} setIsOpen={setIsPopupResume} />
      ) : null}
      {isPopup ? <Popup url={profile} setIsOpen={setIsPopup} /> : null}
      <div className="ag-div ag-theme-quartz ag-grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellClicked={handler}
          // defaultColDef={{ flex: 30 }}
          autoGroupColumnDef={autoGroupColumnDef}
          groupSelectsChildren={true}
          rowSelection={"multiple"}
          groupDefaultExpanded={1} 
          pagination={false} 
          paginationPageSize={50} 
          // domLayout='autoHeight' 
          groupDisplayType="groupRows"
          onGridReady={onGridReady} 
        />
       

      </div>
      <Footer />
    </div>
  );
};

export default Home;