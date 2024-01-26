import { type FC } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AuthForm from "./AuthForm";

import { type ApiForgotPassword } from "../types/ApiForgotPassword";

const validationSchema = z.object({
  confirmationCode: z
    .string()
    .min(1, "Confirmation Code is required")
    .length(6, "The confirmation code must be 6 characters long"),

  newPassword: z
    .string()
    .min(1, "New Password is required")
    .min(8, "New Password must be at least 8 characters")
    .max(16, "New Password must be at most 16 characters"),
});

type ForgotPasswordFormProps = {
  onSubmit: SubmitHandler<ApiForgotPassword>;
  onBack: () => void;
  email: string;
};

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onBack,
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApiForgotPassword>({
    defaultValues: {
      confirmationCode: "",
      newPassword: "",
    },

    resolver: zodResolver(validationSchema),
    mode: "all",
  });

  return (
    <AuthForm
      title="Forgot password"
      description={`Reset password and enter the confirmation code we sent to ${email}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            variant="filled"
            label="Confirmation Code"
            helperText={errors.confirmationCode?.message}
            error={!!errors.confirmationCode}
            autoComplete="off"
            {...register("confirmationCode")}
          />

          <TextField
            variant="filled"
            label="New Password"
            helperText={errors.newPassword?.message}
            error={!!errors.newPassword}
            autoComplete="off"
            {...register("newPassword")}
          />

          <LoadingButton
            loading={false}
            type="submit"
            size="large"
            variant="contained"
          >
            Reset Password
          </LoadingButton>

          <Button size="large" onClick={onBack}>
            Go Back
          </Button>
        </Stack>
      </form>
    </AuthForm>
  );
};

export default ForgotPasswordForm;
