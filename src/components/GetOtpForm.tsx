import { type FC } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AuthForm from "./AuthForm";

const validationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Must be a valid email"),
});

type Inputs = {
  email: string;
};

type CheckOtpFormProps = {
  onSubmit: SubmitHandler<Inputs>;
  onBack: () => void;
};

const GetOtpForm: FC<CheckOtpFormProps> = ({ onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: "" },
    resolver: zodResolver(validationSchema),
    mode: "onTouched",
  });

  return (
    <AuthForm
      title="Get Confirmation Code"
      description="Enter your email and we'll send you a code to into your email."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            variant="filled"
            label="Email"
            helperText={errors.email?.message}
            error={!!errors.email}
            autoComplete="off"
            {...register("email")}
          />

          <LoadingButton
            loading={false}
            type="submit"
            size="large"
            variant="contained"
          >
            Submit
          </LoadingButton>

          <Button size="large" onClick={onBack}>
            Go Back
          </Button>
        </Stack>
      </form>
    </AuthForm>
  );
};

export default GetOtpForm;
