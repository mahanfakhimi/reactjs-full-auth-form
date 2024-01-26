import { useRef, useState } from "react";

import SignInForm from "../components/SignInForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import GetOtpForm from "../components/GetOtpForm";

import { type ApiForgotPassword } from "../types/ApiForgotPassword";

type Step = "SIGN_UP" | "FORGOT_PASSWORD" | "GET_OTP";

const SignIn = () => {
  const [step, setStep] = useState<Step>("SIGN_UP");

  const emailRef = useRef<string | null>(null);

  const handleResetPassword = (payload: ApiForgotPassword) => {
    const data = {
      ...payload,
      email: emailRef.current,
    };

    console.log(data);
  };

  const handleGetOtp = ({ email }: { email: string }) => {
    emailRef.current = email;
    setStep("FORGOT_PASSWORD");
  };

  const handleBack = () =>
    setStep((currStep) =>
      currStep === "FORGOT_PASSWORD" ? "GET_OTP" : "SIGN_UP"
    );

  const handleGoToForgotStep = () => setStep("GET_OTP");

  const renderCurrentStep = () => {
    switch (step) {
      case "GET_OTP":
        return <GetOtpForm onSubmit={handleGetOtp} onBack={handleBack} />;

      case "FORGOT_PASSWORD":
        return (
          <ForgotPasswordForm
            onSubmit={handleResetPassword}
            onBack={handleBack}
            email={emailRef.current!}
          />
        );

      default:
        return <SignInForm onGoToForgotStep={handleGoToForgotStep} />;
    }
  };

  return renderCurrentStep();
};

export default SignIn;
