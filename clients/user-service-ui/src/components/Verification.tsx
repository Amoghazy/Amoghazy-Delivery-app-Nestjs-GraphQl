import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent, FocusEventHandler } from "react";
import { LuClipboardCheck } from "react-icons/lu";
import { activeUser } from "../graphql/actions/active.action";
import { toast } from "react-toastify";

export default function Verification({
  setActiveState,
}: {
  setActiveState: (activeSate: string) => void;
}) {
  const [otp, setOtp] = useState<Array<string>>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [activeUserMutation, { loading }] = useMutation(activeUser);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target as HTMLInputElement);
      if (index >= 0) {
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[index] = "";

          return newOtp;
        });

        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target as HTMLInputElement);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    (e.target as HTMLInputElement).select();
  };

  const handlePaste = (
    e:
      | React.ClipboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    let pastedText = "";
    if ("clipboardData" in e) {
      pastedText = e.clipboardData?.getData("text") || "";
    } else {
      navigator.clipboard.readText().then((text) => {
        handlePasteText(text);
      });
      return;
    }

    handlePasteText(pastedText);
  };

  const handlePasteText = (text: string) => {
    if (text) {
      const digits = text.slice(0, otp.length).split("");
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];

        digits.forEach((digit, i) => {
          if (/^[0-9]{1}$/.test(digit)) {
            newOtp[i] = digit;
          }
        });

        return newOtp;
      });

      const nextIndex =
        digits.length < otp.length ? digits.length : otp.length - 1;
      inputRefs.current[nextIndex]?.focus();
    }
  };
  const handleVerify = async () => {
    try {
      await activeUserMutation({
        variables: {
          activationCode: otp.join(""),
          activationToken: localStorage.getItem("token")!,
        },
      });
      localStorage.removeItem("token");
      toast.success("User activated successfully");
      setActiveState("login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  return (
    <div className="bg-[#213853] w-[350px] h-[350px] relative p-4 rounded-lg">
      <h1 className="text-center text-xl font-bold">Enter your OTP</h1>
      <p className="text-lg mt-3 underline text-center">
        Please check your email
      </p>
      <section className="bg-transparent py-10  ">
        <div className="container">
          <form className="flex justify-between gap-2  mx-auto">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onPaste={handlePaste}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="shadow-xs flex w-[40px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
              />
            ))}
          </form>
          <button
            type="button"
            onClick={handlePaste}
            className="block ml-auto text-white mt-2 pe-2"
          >
            <LuClipboardCheck size={25} className="hover:text-info" />
          </button>
        </div>
        <button
          className="absolute bottom-5  btn w-11/12 btn-info text-white"
          onClick={handleVerify}
          disabled={otp.join("").length !== otp.length || loading}
        >
          {" "}
          Verify
        </button>
      </section>
    </div>
  );
}
