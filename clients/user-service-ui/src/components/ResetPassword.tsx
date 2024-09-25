"use client"
import style from "../css/login.module.css";

import { FiAtSign, FiLock } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiWarningFill } from "react-icons/pi";
import { loginUser } from "../graphql/actions/login.action";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { RESET_PASSWORD } from "../graphql/actions/reset-password.action";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useState } from "react";

const schema = yup
  .object({
    password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
  
 
  })
  .required();
const ResetPassword=({activeToken}:{activeToken:string})=>{
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [resetetPassword,{loading}]=useMutation(RESET_PASSWORD)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors,isSubmitting },
      } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmit = async (data: { password: string}) => {
        try {
          const { data: response } = await resetetPassword({
            variables: {
              password: data.password,
              token:activeToken
            },
          });
    console.log(response)
          toast.success("Password Updated Successfully");
    
          reset()

        } catch (error: any) {
          toast.error(error.message);
         
        }
      };
return <>
<form className={style.form} onSubmit={handleSubmit(onSubmit)} >
        <h1 className="text-3xl text-center font-bold">Reset Password</h1>
     
          <div>
            <div className={style.flexColumn}>
              <label>Password </label>
            </div>
            <div className={`${style.inputForm} !pl-0 `}>
              <input
                type={show ? "text" : "password"}
                className={` ${style.input} !ml-2`}
                placeholder="Enter your Password"
                {...register("password")}
              />

              {show ? (
                <BiSolidShow
                  className="mr-3 cursor-pointer hover:text-slate-900 "
                  onClick={() => setShow(!show)}
                  size={20}
                />
              ) : (
                <BiSolidHide
                  className="mr-3 cursor-pointer hover:text-slate-900"
                  onClick={() => setShow(!show)}
                  size={20}
                />
              )}
            </div>
            {errors.password?.message && (
              <p className="alert alert-error p-1 px-4 text-sm mt-2">
                <PiWarningFill /> <span>{errors.password?.message}</span>
              </p>
            )}
          </div>{" "}
          <div>
            <div className={style.flexColumn}>
              <label>Confirm Password </label>
            </div>
            <div className={`${style.inputForm} !pl-0 `}>
              <input
                type={showConfirm ? "text" : "password"}
                className={` ${style.input} !ml-2`}
                placeholder="Enter your confirm Password"
                {...register("confirmPassword")}
              />
              {showConfirm ? (
                <BiSolidShow
                  className="mr-3 cursor-pointer hover:text-slate-900 "
                  onClick={() => setShowConfirm(!showConfirm)}
                  size={20}
                />
              ) : (
                <BiSolidHide
                  className="mr-3 cursor-pointer hover:text-slate-900"
                  onClick={() => setShowConfirm(!showConfirm)}
                  size={20}
                />
              )}
            </div>
            {errors.confirmPassword?.message && (
              <p className="alert alert-error p-1 px-4 text-sm mt-2">
                <PiWarningFill /> <span>{errors.confirmPassword?.message}</span>
              </p>
            )}
          </div>
    
    
        <button type="submit" disabled={isSubmitting||loading} className={style.btnsub}>
         Submit
        </button>
        </form>
      
</>
}
export default ResetPassword