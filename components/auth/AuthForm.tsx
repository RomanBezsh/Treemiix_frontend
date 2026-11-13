"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { saveAuthSession } from "@/lib/authSession";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

interface AuthUser {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

interface AuthResponse {
  token?: string;
  refreshToken?: string;
  emailConfirmationRequired?: boolean;
  user?: AuthUser;
  message?: string;
}

function getNextPath(): string {
  if (typeof window === "undefined") return "/account";

  const next = new URLSearchParams(window.location.search).get("next");
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }

  return "/account";
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/i;
  return emailRegex.test(email.trim());
};

const validatePassword = (password: string): boolean => {
  return /[\d\W_]/.test(password);
};

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [pendingEmail, setPendingEmail] = useState("");
  const [codeInput, setCodeInput] = useState("");

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
    code?: string;
  }>({});

  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const handleTabSwitch = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setStep("form");
    setCodeInput("");
    setErrors({});
    setServerError(null);
  };

  const handleBackToForm = () => {
    setStep("form");
    setCodeInput("");
    setErrors({});
    setServerError(null);
  };

  const persistSession = (data: AuthResponse, fallbackEmail: string) => {
    if (!data.token) {
      throw new Error("The server did not return an access token.");
    }

    saveAuthSession({
      token: data.token,
      refreshToken: data.refreshToken,
      userRole: data.user?.role || "User",
      userEmail: data.user?.email || fallbackEmail,
      userFirstName: data.user?.firstName ?? formData.firstName,
      userLastName: data.user?.lastName ?? formData.lastName,
    });
  };

  const handleConfirmCode = async () => {
    const code = codeInput.trim();
    if (!/^\d{6}$/.test(code)) {
      setErrors({ code: "Enter the 6-digit code." });
      return;
    }

    setErrors({});
    setServerError(null);
    setIsLoading(true);

    try {
      const confirmRes = await fetch(`${API_BASE_URL}/auth/confirm-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, code }),
      });

      let confirmData: { message?: string } = {};
      try {
        confirmData = await confirmRes.json();
      } catch {
        confirmData = {};
      }

      if (!confirmRes.ok) {
        throw new Error(
          confirmData.message || "The code is invalid or has expired.",
        );
      }

      // Confirmation does not return tokens, so sign in with the password
      // the user just entered and store the real JWT.
      const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pendingEmail,
          password: formData.password,
        }),
      });

      let loginData: AuthResponse = {};
      try {
        loginData = await loginRes.json();
      } catch {
        loginData = {};
      }

      if (!loginRes.ok) {
        throw new Error(loginData.message || "Could not sign in after confirmation.");
      }

      persistSession(loginData, pendingEmail);
      router.push(getNextPath());
    } catch (error) {
      setServerError(errorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === "confirm") {
      await handleConfirmCode();
      return;
    }

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
    setServerError(null);
    setIsLoading(true);

    try {
      const endpoint = isLogin ? `${API_BASE_URL}/auth/login` : `${API_BASE_URL}/auth/register`;
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            firstName: formData.firstName || "User",
            lastName: formData.lastName || "Treemiix",
            email: formData.email,
            password: formData.password,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: AuthResponse = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        if (res.status === 500) {
          throw new Error(
            "The server is waking up. Please wait about 30 seconds and try again.",
          );
        }
        if (
          isLogin &&
          typeof data.message === "string" &&
          data.message.toLowerCase().includes("not confirmed")
        ) {
          setServerError(
            `${data.message} Check your inbox for the 6-digit code, or sign up again to request a new one.`,
          );
          return;
        }
        throw new Error(
          data.message ||
            (isLogin ? "Invalid email or password." : "Registration failed."),
        );
      }

      if (!isLogin) {
        setPendingEmail(formData.email);

        // When email confirmation is disabled the API returns tokens right
        // away; do not ask for a code that was never sent.
        if (!data.emailConfirmationRequired && data.token) {
          persistSession(data, formData.email);
          router.push(getNextPath());
          return;
        }

        setCodeInput("");
        setStep("confirm");
        return;
      }

      persistSession(data, formData.email);
      router.push(getNextPath());
    } catch (error) {
      setServerError(errorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-[#F8F8F8] w-full max-w-125.5 h-min-143.5 h-max-190.25 rounded-[32px] px-6 pt-10 pb-10 sm:rounded-[50px] sm:px-12 sm:pt-13.75 sm:pb-15 font-normal shadow-[0_2px_4px_0_#00000033]"
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

      {serverError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded-[10px]">
          {serverError}
        </div>
      )}

      {step === "confirm" ? (
        <>
          <div className="mt-6">
            <h3 className="text-lg font-medium text-[#333333]">Confirm your email</h3>
            <p className="text-[13px] text-[#555555] mt-2">
              Enter the 6-digit code to finish signing up for{" "}
              <span className="font-medium">{pendingEmail}</span>.
            </p>
          </div>

          <input
            name="code"
            value={codeInput}
            onChange={(e) => {
              setCodeInput(e.target.value.replace(/\D/g, "").slice(0, 6));
              if (errors.code) {
                setErrors((prev) => ({ ...prev, code: undefined }));
              }
              if (serverError) setServerError(null);
            }}
            className="w-full h-16.5 p-3.75 mt-5 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] text-center text-[20px] tracking-[0.4em]"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="123456"
            required
          />
          {errors.code && (
            <span className="text-red-500 text-xs mt-1 pl-2">{errors.code}</span>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#7C9BC0] w-full h-15 mt-8 text-[20px] text-white font-medium rounded-[10px] shadow-[0_2px_4px_0_#00000033] hover:opacity-95 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Verify code"}
          </button>

          <div className="flex justify-start items-center mt-4 w-full text-[14px]">
            <button
              type="button"
              onClick={handleBackToForm}
              className="text-[#7C9BC0] cursor-pointer hover:underline"
            >
              ← Back
            </button>
          </div>
        </>
      ) : (
        <>
          {!isLogin && (
            <>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full h-16.5 p-3.75 mt-8 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]"
                type="text"
                placeholder="First name"
                required
              />

              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full h-16.5 p-3.75 mt-5 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]"
                type="text"
                placeholder="Last name"
                required
              />
            </>
          )}

          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full h-16.5 p-3.75 mt-${isLogin ? "12" : "5"} rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]`}
            type="email"
            placeholder="Email"
            required
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 pl-2">{errors.email}</span>
          )}

          <input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full h-16.5 p-3.75 mt-5 rounded-[10px] shadow-[0_2px_4px_0_rgba(0,0,0,0.2)]"
            type="password"
            placeholder="Password"
            required
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1 pl-2">{errors.password}</span>
          )}

          {isLogin && (
            <div className="flex justify-end mt-2.5 w-full">
              <a className="text-[14px] text-[#E9852A] cursor-pointer">Forgot your password?</a>
            </div>
          )}

          <div className="flex items-center pl-8 mt-5 gap-4">
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
            disabled={isLoading}
            className="bg-[#7C9BC0] w-full h-15 mt-10 text-[20px] text-white font-medium rounded-[10px] shadow-[0_2px_4px_0_#00000033] hover:opacity-95 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : isLogin ? "Log in" : "Sign up"}
          </button>
        </>
      )}
    </form>
  );
}
