"use client";

import { useState, FormEvent } from "react";

interface LoginFormRequest {
  email: string;
  password: string;
}

interface RegisterFormRequest extends LoginFormRequest {
  firstName: string;
  lastName: string;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/i;
  return emailRegex.test(email.trim());
};

const validatePassword = (password: string): boolean => {
  return /[\d\W_]/.test(password);
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    terms?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTabSwitch = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setErrors({});
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must contain at least one number or special character.";
    }

    if (!isLogin && !formData.agreeTerms) {
      newErrors.terms = "You must agree to the Terms and Service.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (isLogin) {
      const loginPayload: LoginFormRequest = {
        email: formData.email,
        password: formData.password,
      };
      console.log("Submit Login:", loginPayload);
    } else {
      const registerPayload: RegisterFormRequest = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      console.log("Submit Register:", registerPayload);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-[#F8F8F8] w-125.5 h-min-143.5 h-max-190.25 rounded-[50px] px-12 pt-13.75 pb-15 font-normal shadow-[0_2px_4px_0_#00000033]"
    >
      <div className="flex row gap-7.75">
        <h2
          onClick={() => handleTabSwitch(true)}
          className={`text-2xl pb-1.5 cursor-pointer select-none ${isLogin ? "border-b-2 border-[#7C9BC0]" : ""}`}
        >
          Log in
        </h2>
        <h2
          onClick={() => handleTabSwitch(false)}
          className={`text-2xl pb-1.5 cursor-pointer select-none ${!isLogin ? "border-b-2 border-[#7C9BC0]" : ""}`}
        >
          Sign up
        </h2>
      </div>

      {!isLogin && (
        <>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-101.5 h-16.5 p-3.75 mt-14.75 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]"
            type="text"
            placeholder="First name"
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-101.5 h-16.5 p-3.75 mt-7.5 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]"
            type="text"
            placeholder="Last name"
          />
        </>
      )}

      <input
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className={`w-101.5 h-16.5 p-3.75 mt-${isLogin ? "14.75" : "7.5"} rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]`}
        type="email"
        placeholder="Email"
      />
      {errors.email && (
        <span className="text-red-500 text-xs mt-1 pl-2">{errors.email}</span>
      )}

      <input
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="w-101.5 h-16.5 p-3.75 mt-7.5 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]"
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <span className="text-red-500 text-xs mt-1 pl-2">{errors.password}</span>
      )}

      {isLogin && (
        <div className="flex justify-end mt-2.5 w-full">
          <a className="text-[14px] text-[#E9852A] cursor-pointer">Forgot your password?</a>
        </div>
      )}

      <div className="flex items-center pl-8 mt-6 gap-4">
        <input
          type="checkbox"
          id="terms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleInputChange}
          className="w-4 h-4 border-2 rounded-2xl border-gray-300 text-[#7C9BC0] focus:ring-[#7C9BC0] cursor-pointer"
        />
        <label htmlFor="terms" className="text-[14px] text-[#333333] select-none cursor-pointer">
          I agree with{" "}
          <a href="#" className="text-[#7C9BC0]">Terms and Service</a>
          {" "}and{" "}
          <a href="#" className="text-[#7C9BC0]">Privacy Policy</a>
        </label>
      </div>
      {errors.terms && (
        <span className="text-red-500 text-xs mt-1 pl-8">{errors.terms}</span>
      )}

      <button
        type="submit"
        className="bg-[#7C9BC0] w-101.5 h-15 mt-13.75 text-[20px] text-white font-medium rounded-[10px] shadow-[0_2px_4px_0_#00000033]"
      >
        {isLogin ? "Log in" : "Sign up"}
      </button>
    </form>
  );
};

export default AuthForm;