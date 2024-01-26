import { type FC } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import StyledLink from "./common/StyledLink";
import AuthForm from "./AuthForm";

import { type ApiSignUp } from "../types/ApiSignUp";

const validationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .max(16, "First Name must be at most 16 characters"),

  userName: z
    .string()
    .min(1, "User Name is required")
    .max(16, "User Name must be at most 16 characters"),

  email: z.string().min(1, "Email is required").email("Must be a valid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
});

type SignUpFormProps = {
  onSubmit: SubmitHandler<ApiSignUp>;
};

const SignUpForm: FC<SignUpFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApiSignUp>({
    defaultValues: { firstName: "", userName: "", email: "", password: "" },
    resolver: zodResolver(validationSchema),
    mode: "onTouched",
  });

  return (
    <AuthForm
      title="Sign up"
      description="To get started, please create a new user account."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            variant="filled"
            label="First Name"
            helperText={errors.firstName?.message}
            error={!!errors.firstName}
            autoComplete="off"
            {...register("firstName")}
          />

          <TextField
            variant="filled"
            label="User Name"
            helperText={errors.userName?.message}
            error={!!errors.userName}
            autoComplete="off"
            {...register("userName")}
          />
          <TextField
            variant="filled"
            label="Email Address"
            helperText={errors.email?.message}
            error={!!errors.email}
            autoComplete="off"
            {...register("email")}
          />

          <TextField
            variant="filled"
            label="Password"
            helperText={errors.password?.message}
            error={!!errors.password}
            autoComplete="off"
            {...register("password")}
          />

          <LoadingButton
            loading={false}
            type="submit"
            size="large"
            variant="contained"
          >
            Sign Up
          </LoadingButton>

          <Stack direction="row" justifyContent="center" spacing={1}>
            <Typography color="gray">Already have an account?</Typography>
            <StyledLink to="/auth/sign-in">Sign in</StyledLink>
          </Stack>
        </Stack>
      </form>
    </AuthForm>
  );
};

export default SignUpForm;
