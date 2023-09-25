import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import "./form.css"
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Form2 = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const P_id = params.get('P_id');

    const navigate = useNavigate();
    const schema = yup.object().shape({
        // name: yup.string().required(),

        // age: yup.number().typeError('Enter valid age').required("please enter age")
        //     .min(18, "min 18")
        //     .max(23, 'max 23!'),
        // password: yup.string().min(4, "Password must be at least 4 characters").max(20, "Password must  be max 20 characters").required(),

        // confirmPassword: yup.string().oneOf([yup.ref("password"), null], "password not match").required("write password"),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        try {
            const formData =   {
                "contactId": 2,
                "emailId":data.emailId,
                "mobile": data.mobile,
                "P_id": P_id,
            };
            const response = await axios.post("http://127.0.0.1:8000/contact_api/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error);
        }


        const formData1 =
        {
            "id": 5,
            "birthdate": data.birthdate,
            "emailId": data.email,
            "P_id": P_id
        };
            try {
         const response = await axios.post("http://127.0.0.1:8000/user/", formData1, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate(`/form3?P_id=${P_id}`);
        }catch(error){}
    };

    return (
        <>
            <form  style={{ display:'flex' ,justifyContent:'center',alignItems:'center',height:'500px'}}onSubmit={handleSubmit(onSubmit)}>
                <div className="f"><br></br>
                    <span>emailId : </span><input type="email" {...register("emailId")} /><br></br><br></br>
                    <span>mobile : </span><input type="text" {...register("mobile")} /><br></br><br></br>
                    <span>Bithdate : </span><input type='date' {...register("birthdate")} /><br></br><br></br>

                    <button type="submit">submit & Next</button>
                </div>
            </form>
        </>
    )
}


export default Form2;