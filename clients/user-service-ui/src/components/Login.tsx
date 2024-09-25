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
import { loginUser } from "../graphql/actions/login.action";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
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
export default function Login({
  setActiveState,
  setOpenAuth,
}: {
  setActiveState: (activeSate: string) => void;
  setOpenAuth: (val: boolean) => void;
}) {
  const [show, setShow] = useState(false);
  const [loginUserMutation, { loading }] = useMutation(loginUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { data: response } = await loginUserMutation({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      toast.success("User logged in successfully");
      Cookies.set("refreshToken", response.loginUser.refreshToken);
      Cookies.set("accessToken", response.loginUser.accessToken);
      setOpenAuth(false);
      reset()
     setTimeout(()=>{ window.location.reload()},2000)
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
          <span onClick={()=>{
            setActiveState("forget-password")
          }} className={` ${style.span} `}>Forgot password?</span>
        </div>
        <button type="submit" className={style.btnsub}>
          Sign In
        </button>
        <p className={style.p}>
          Don't have an account yet&nbsp;?{" "}
          <span className={style.span} onClick={() => setActiveState("signUp")}>
            Sign Up
          </span>
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
