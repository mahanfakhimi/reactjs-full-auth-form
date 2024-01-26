import { useState, useRef } from "react";

import SignUpForm from "../components/SignUpForm";
import CheckOtpForm from "../components/CheckOtpForm";

import { type ApiSignUp } from "../types/ApiSignUp";

const SignUp = () => {
  const [step, setStep] = useState<"SIGN_UP" | "CHECK_OTP">("SIGN_UP");

  const signUpDataRef = useRef<ApiSignUp | null>(null);

  const handleGetOtp = (data: ApiSignUp) => {
    signUpDataRef.current = data;
    setStep("CHECK_OTP");
  };

  const handleSignUp = (data: { confirmationCode: string }) => {
    console.log({ ...data, ...signUpDataRef.current });
  };

  const handleBack = () => setStep("SIGN_UP");

  const renderCurrentStep = () => {
    switch (step) {
      case "CHECK_OTP":
        return (
          <CheckOtpForm
            onSubmit={handleSignUp}
            onBack={handleBack}
            email={signUpDataRef.current!.email}
          />
        );

      default:
        return <SignUpForm onSubmit={handleGetOtp} />;
    }
  };

  return renderCurrentStep();
};

export default SignUp;
