import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import "./form.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Form = () => {
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
          const formData = new FormData();
          formData.append("fname", data.fname);
          formData.append("mname", data.mname);
          formData.append("lname", data.lname);
          formData.append("profilePic", data.profilePic[0]);
      
          const response = await axios.post("http://127.0.0.1:8000/person/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          const P_id=response.data.P_id;
          navigate(`/form2?P_id=${P_id}`);
        } catch (error) {
          console.log(error);
        }
      };
      
    return (
        <>
            <form style={{ display:'flex' ,justifyContent:'center',alignItems:'center',height:'500px'}} onSubmit={handleSubmit(onSubmit)}>
                <div className="f">
                    {/* <span>UserName : </span><input type="text" {...register("name")}/>
            <p className='error '>{errors?.name?.message}</p>
            <span>Password : </span><input type="text" {...register("password")}></input>
            <p className='error'>{errors?.password?.message}</p>
            <span>confirmPassword : </span><input type="text" {...register("confirmPassword")}></input>
            <p className='error'>{errors?.confirmPassword?.message}</p>
        <span>age : </span><input type="text" {...register("age")}></input>
            <p className='error'>{errors?.age?.message}</p> */}
            <br></br>
                    <span>fname : </span><input type="text" {...register("fname")} />
                    <span>mname : </span><input type="text" {...register("mname")} />
                    <span>lname : </span><input type="text" {...register("lname")} /><br></br><br></br>
                    <span>profilePic : </span><input type="file"{...register("profilePic")} /><br></br>
<br></br>
                    <button type="submit">Submit  & next</button>
                </div>
            </form>
        </>
    )
}


export default Form;