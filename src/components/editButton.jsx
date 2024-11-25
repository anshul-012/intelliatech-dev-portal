import React from 'react'
import { useNavigate } from 'react-router-dom'

const EditButton = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => {
            navigate(`/admin/update/${data?._id}`)
        }}>
            Edit
        </div>
    )
}

export default EditButton
