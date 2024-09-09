// "use client"
import { FcGoogle } from "react-icons/fc";
import style from "../css/login.module.css";
import { BsTwitterX } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

import { useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiWarningFill } from "react-icons/pi";
import { useMutation } from "@apollo/client";
import { registerUser } from "../graphql/actions/register.action";
import { toast } from "react-toastify";

const schema = yup
  .object({
    username: yup.string().required("username is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();
export default function SignUp({
  setActiveState,
}: {
  setActiveState: (activeSate: string) => void;
}) {
  const [registerUserMutation, { loading, error }] = useMutation(registerUser);
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: {
    email: string;
    password: string;
    username: string;
    phone: string;
  }) => {
    try {
      const { data: response } = await registerUserMutation({
        variables: {
          email: data.email,
          password: data.password,
          username: data.username,
          phone: data.phone,
        },
      });
      localStorage.setItem("token", response.activationToken);
      toast.success("User created successfully");
      reset()
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <form
        className={`${style.form} !w-[500px]`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl text-center font-bold">Register</h1>
        <section className="grid grid-cols-2 gap-2">
          <div>
            <div className={style.flexColumn}>
              <label>Name </label>
            </div>
            <div className={`${style.inputForm} !pl-0 `}>
              <input
                type="text"
                className={` ${style.input} !ml-2`}
                placeholder="Enter your Name"
                {...register("username")}
              />
            </div>
            {errors.username?.message && (
              <p className="alert alert-error p-1 px-4 text-sm mt-2">
                <PiWarningFill /> <span>{errors.username?.message}</span>
              </p>
            )}
          </div>
          <div>
            <div className={style.flexColumn}>
              <label>Email </label>
            </div>
            <div className={`${style.inputForm} !pl-0 `}>
              <input
                type="email"
                className={` ${style.input} !ml-2`}
                placeholder="Enter your Email"
                {...register("email")}
              />
            </div>
            {errors.email?.message && (
              <p className="alert alert-error p-1 px-4 text-sm mt-2">
                <PiWarningFill /> <span>{errors.email?.message}</span>
              </p>
            )}
          </div>
        </section>
        <div className={style.flexColumn}>
          <label>Phone </label>
        </div>
        <div className={`${style.inputForm} !pl-0 `}>
          <input
            type="string"
            className={` ${style.input} !ml-2`}
            placeholder="Enter your Phone"
            {...register("phone")}
          />
        </div>
        {errors.phone?.message && (
          <p className="alert alert-error p-1 px-4 text-sm">
            <PiWarningFill /> <span>{errors.phone?.message}</span>
          </p>
        )}
        <section className="grid grid-cols-2 gap-2">
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
                type={"password"}
                className={` ${style.input} !ml-2`}
                placeholder="Enter your confirm Password"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword?.message && (
              <p className="alert alert-error p-1 px-4 text-sm mt-2">
                <PiWarningFill /> <span>{errors.confirmPassword?.message}</span>
              </p>
            )}
          </div>
        </section>

        <button
          disabled={loading || isSubmitting}
          type="submit"
          className={style.btnsub}
        >
          Sign Up
        </button>

        <p className={style.p}> or sign with</p>

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
        <p className={style.p}>
          Already have an account&nbsp;?{" "}
          <span className={style.span} onClick={() => setActiveState("login")}>
            SignIn
          </span>
        </p>
      </form>
    </>
  );
}
