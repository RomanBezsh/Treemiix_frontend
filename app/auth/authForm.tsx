"use client"

import { useState } from "react";



interface LoginFormRequest {
  email: string,
  password: number
}

interface RegisterFormRequest {
  firstName: string,
  lastName: string,
  email: string,
  password: number
}

const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true)

  let loginFormRequest: LoginFormRequest
  let registerFormRequest: RegisterFormRequest


  const changeMode = () => isLogin? setIsLogin(false) : setIsLogin(true)
  







  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-C0-9._%+-]+@[a-zA-C0-9.-]+\.[a-zA-C0-9]{2,}$/i;
    return emailRegex.test(email.trim());
  };
  
  const validatePassword = (password: string): boolean => {
    const hasNumberOrSymbol = /[\d[^a-zA-Z0-9]]/.test(password);
    return hasNumberOrSymbol;
  };


  return (
    <form className="flex flex-col bg-[#F8F8F8] w-125.5 h-min-143.5 h-max-190.25 rounded-[50px] px-12 pt-13.75 pb-15 font-normal shadow-[0_2px_4px_0_#00000033]">
        <div className="flex row gap-7.75">
            <h2 onClick={changeMode} className={`text-2xl pb-1.5  ${isLogin? "border-b-2 border-[#7C9BC0]" : ""}`}>Log in</h2>
            <h2 onClick={changeMode} className={`text-2xl pb-1.5  ${!isLogin? "border-b-2 border-[#7C9BC0]" : ""}`}>Sign up</h2>
        </div>


        {!isLogin && (
          <>
            <input className="w-101.5 h-16.5 p-3.75 mt-14.75 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]" type="text" placeholder="First name" name="" id="" />
            <input className="w-101.5 h-16.5 p-3.75 mt-7.5 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]" type="text" placeholder="Last name" name="" id="" />
          </>
        )}


        
        <input className={`w-101.5 h-16.5 p-3.75  mt-${isLogin? "14.75" : "7.5"} rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]`} type="email" placeholder="Email" name="" id="" />
        
        <input className="w-101.5 h-16.5 p-3.75 mt-7.5 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]" type="password" placeholder="Password" name="" id="" />
        
        <div className="flex justify-end mt-2.5 w-full">
          <a className="text-[14px] text-[#E9852A] cursor-pointer">Forgot your password?</a>
        </div>

        <div className="flex items-center pl-8 mt-6 gap-4">
          <input 
            type="checkbox" 
            id="terms"
            className="w-4 h-4 border-2 rounded-2xl border-gray-300 text-[#7C9BC0] focus:ring-[#7C9BC0] cursor-pointer" 
          />
          <label htmlFor="terms" className="text-[14px] text-[#333333] select-none cursor-pointer">
            I agree with{' '}
            <a href="#" className="text-[#7C9BC0]">
              Terms and Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#7C9BC0]">
              Privacy Policy
            </a>
          </label>
        </div>

        <button className="bg-[#7C9BC0] w-101.5 h-15 mt-13.75 text-[20px] text-white font-medium rounded-[10px] shadow-[0_2px_4px_0_#00000033]">Log in</button>
    </form>
  )
}

export default AuthForm;