import React, { useEffect, useState } from 'react'
import "../styles/updatedev.css"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateDev = () => {

    const { devId } = useParams();
    const [oldDeveloperData, setOldDeveloperData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem("ADMIN"))

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading((prev) => !prev);
        const form = e.target;
        const formData = new FormData(form);

        try {
            const res = await axios.put(
                `https://api.resource.intelliatech.com/api/admin/update-developer/${devId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("ADMIN"))?.token}`
                    },
                    withCredentials: true
                }
            );
            toast.success(res?.data?.message);
            setLoading((prev) => !prev);
            navigate("/admin/change-status")
        } catch (error) {
            setLoading((prev) => !prev);
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    const changeHanlder = (e) => {
        setOldDeveloperData({ ...oldDeveloperData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios
            .get(`https://api.resource.intelliatech.com/api/developers/${devId}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("ADMIN"))?.token}`
                },
                withCredentials: true,
            })
            .then((res) => {
                setOldDeveloperData(res.data?.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])


    if (loading) {
        return <div className='loading-div'>
            <div className='spiner'></div>
        </div>
    }


    return (
        <div className='update-dev-main-div'>

            <form onSubmit={submitHandler} >

                <div className="outer-div">

                    <div className="input-div">
                        <label htmlFor="">Name</label>
                        <input name="name" onChange={changeHanlder} value={oldDeveloperData?.name} type="text" placeholder="Name" />
                    </div>
                    <div className="input-div">
                        <label htmlFor="">Email</label>
                        <input name="email" onChange={changeHanlder} value={oldDeveloperData?.email} type="text" placeholder="Email" />
                    </div>
                    <div className="input-div">
                        <label htmlFor="">Main Skill</label>
                        <input name="mainSkill" onChange={changeHanlder} value={oldDeveloperData?.mainSkill} type="text" placeholder="Eg React.js" />
                    </div>
                    <div className="input-div">
                        <label htmlFor="">Skill</label>
                        <input name="skills" onChange={changeHanlder} value={oldDeveloperData?.skills} type="text" placeholder="Skill" />
                    </div>
                    <div className="input-div">
                        <label htmlFor="">Experience</label>
                        <input name="experience" onChange={changeHanlder} value={oldDeveloperData?.experience} type="text" placeholder="Experience" />
                    </div>
                    <div className="input-div">
						<label htmlFor="">Experience Range</label>
						<input name="experienceRange" type="text" placeholder="2 - 5 Years" />
					</div>

                </div>
                <div className="outer-div">
                    <div className="input-div">
                        <label htmlFor="">Engineer Type</label>
                        <select name="engineerType" onChange={changeHanlder} value={oldDeveloperData?.engineerType} id="">
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
                        <select name="status" onChange={changeHanlder} value={oldDeveloperData?.status} id="">
                            <option selected value="SHOW">
                                SHOW
                            </option>
                            <option value="HIDE">HIDE</option>
                        </select>
                    </div>
                    <div className="input-div">
                        <label htmlFor="">Name</label>
                        <select name="bench" onChange={changeHanlder} value={oldDeveloperData?.bench} id="">
                            <option selected value="ONBENCH">
                                ON BENCH
                            </option>
                            <option value="ONPROJECT">ON PROJECT</option>
                        </select>					</div>
                    <div className="input-div">
                        <label htmlFor="">Profile</label>
                        <input name="profile" accept='image/*' type="file" placeholder="Name" />
                    </div>

                    <div className="input-div">
                        <label htmlFor="">Resume</label>
                        <input name="resume" accept=" .pdf" type="file" placeholder="Name" />
                    </div>

                    <div className="input-div">
                        <label htmlFor=""></label>
                        <button>Update Developer</button>
                    </div>

                </div>

            </form>

        </div>
    )
}

export default UpdateDev
