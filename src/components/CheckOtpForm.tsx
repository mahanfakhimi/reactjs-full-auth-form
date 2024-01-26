import { type FC } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AuthForm from "./AuthForm";

const validationSchema = z.object({
  confirmationCode: z
    .string()
    .min(1, "Confirmation Code is required")
    .length(6, "The confirmation code must be 6 characters long"),
});

type Inputs = {
  confirmationCode: string;
};

type CheckOtpFormProps = {
  onSubmit: SubmitHandler<Inputs>;
  onBack: () => void;
  email: string;
};

const CheckOtpForm: FC<CheckOtpFormProps> = ({ onSubmit, onBack, email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { confirmationCode: "" },
    resolver: zodResolver(validationSchema),
    mode: "onTouched",
  });

  return (
    <AuthForm
      title="Check Confirmation Code"
      description={`Enter the confirmation code we sent to ${email}`}
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

          <LoadingButton
            loading={false}
            type="submit"
            size="large"
            variant="contained"
          >
            Check
          </LoadingButton>

          <Button size="large" onClick={onBack}>
            Go Back
          </Button>
        </Stack>
      </form>
    </AuthForm>
  );
};

export default CheckOtpForm;
