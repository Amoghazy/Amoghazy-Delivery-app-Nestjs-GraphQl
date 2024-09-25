import ResetPassword from "@/src/components/ResetPassword";

export default function Page({searchParams}: {searchParams: {verify: string}}) {
 
const activeToken= searchParams['verify']

  return (
    <><div className="flex justify-center items-center h-screen">
        <ResetPassword activeToken={activeToken}/></div></>
  );
}
