import { type FC } from "react";
import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import StyledLink from "./common/StyledLink";
import AuthForm from "./AuthForm";

const validationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Must be a valid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),

  isRememberMe: z.boolean(),
});

type Inputs = {
  email: string;
  password: string;
  isRememberMe: boolean;
};

type SignInFormProps = {
  onGoToForgotStep: () => void;
};

const SignInForm: FC<SignInFormProps> = ({ onGoToForgotStep }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: "", password: "", isRememberMe: false },
    resolver: zodResolver(validationSchema),
    mode: "onTouched",
  });

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <AuthForm
      title="Sign in"
      description="Please log in to your account using your email and password."
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={3}>
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

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              label="Remember Me"
              control={
                <Controller
                  name="isRememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox checked={field.value} {...field} />
                  )}
                />
              }
            />

            <Typography
              onClick={onGoToForgotStep}
              color="primary"
              sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot Password
            </Typography>
          </Stack>

          <LoadingButton
            loading={false}
            type="submit"
            size="large"
            variant="contained"
          >
            Sign In
          </LoadingButton>

          <Stack direction="row" justifyContent="center" spacing={1}>
            <Typography color="gray">Don't have an account?</Typography>
            <StyledLink to="/auth/sign-up">Sign up</StyledLink>
          </Stack>
        </Stack>
      </form>
    </AuthForm>
  );
};

export default SignInForm;
