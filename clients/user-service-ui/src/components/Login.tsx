import { FcGoogle } from "react-icons/fc";
import style from "../css/login.module.css";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { FiAtSign, FiLock } from "react-icons/fi";
import { useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiWarningFill } from "react-icons/pi";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();
export default function Login({setActiveState}:{
  setActiveState:(activeSate:string)=>void
}) {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: { email: string; password: string }) =>
    console.log(data);
  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)} >
        <h1 className="text-3xl text-center font-bold">Login</h1>
        <div className={style.flexColumn}>
          <label>Email </label>
        </div>
        <div className={style.inputForm}>
          <FiAtSign />

          <input
            type="text"
            className={style.input}
            placeholder="Enter your Email"
            {...register("email")}
          />
        
        </div>
        {errors.email?.message && (
            <p className="alert alert-error p-1 px-4 text-sm">
              <PiWarningFill /> <span>{errors.email?.message}</span>
            </p>
          )}
        <div className={style.flexColumn}>
          <label>Password </label>
        </div>
        <div className={style.inputForm}>
          <FiLock />

          <input
            type={show ? "text" : "password"}
            className={style.input}
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
            <p className="alert alert-error p-1 px-4 text-sm">
              <PiWarningFill /> <span>{errors.password?.message}</span>
            </p>
          )}
        <div className="ml-auto">
          <span className={` ${style.span} `}>Forgot password?</span>
        </div>
        <button type="submit" className={style.btnsub}>Sign In</button>
        <p className={style.p}>
          Don't have an account yet&nbsp;?{" "}
          <span className={style.span} onClick={() => setActiveState("signUp")}>Sign Up</span>
        </p>
        <p className={style.p}>Or sign in with</p>

        <div className="flex justify-around">
          <button className={style.Btn}>
            <span className={style.svgContainer}>
              <FcGoogle />
            </span>
            <span className={style.BGa} />
          </button>
          <button className={style.Btn}>
            <span className={style.svgContainer}>
              <BsTwitterX />
            </span>
            <span className={style.BGa} />
          </button>
          <button className={style.Btn}>
            <span className={style.svgContainer}>
              <AiFillGithub />
            </span>
            <span className={style.BGa} />
          </button>
        </div>
      </form>
    </>
  );
}
