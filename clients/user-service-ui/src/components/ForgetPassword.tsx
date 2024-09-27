import style from "../css/login.module.css";

import { FiAtSign,  } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiWarningFill } from "react-icons/pi";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { FORGET_PASSWORD } from "../graphql/actions/forget-password.action";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
 
  })
  .required();
const ForgetPassword=({setActiveState,setOpenAuth}:{
    setActiveState:(value:string)=>void,setOpenAuth:(value:boolean)=>void
})=>{
    const [forgetPassword,{loading}]=useMutation(FORGET_PASSWORD)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmit = async (data: { email: string}) => {
        try {
           await forgetPassword({
            variables: {
              email: data.email,
            },
          });

          toast.success("Check Inbox email sent successfully");

          reset()
          setOpenAuth(false)    

        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("An unknown error occurred");
          }
        }
      };
return <>
<form className={style.form} onSubmit={handleSubmit(onSubmit)} >
        <h1 className="text-3xl text-center font-bold">Forget Password</h1>
        <p className="text-lg text-center font-base">Enter Your Email</p>
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
        <div className="ml-auto">
          <span onClick={()=>{
            setActiveState("login")
          }} className={` ${style.span} `}>Back To Login ?</span>
        </div>
        <button disabled={loading} type="submit" className={style.btnsub}>
         Submit
        </button>
        </form>
      
</>
}
export default ForgetPassword