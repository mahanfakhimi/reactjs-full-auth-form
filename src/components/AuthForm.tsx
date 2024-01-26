import { type FC, type ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

type AuthFormProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const AuthForm: FC<AuthFormProps> = ({ title, description, children }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={3}
    >
      <Stack spacing={3} width="max(550px)">
        <Stack spacing={1.5}>
          <Typography variant="h5" fontWeight="900">
            {title}
          </Typography>

          <Typography variant="subtitle2" color="gray">
            {description}
          </Typography>
        </Stack>

        {children}
      </Stack>
    </Box>
  );
};

export default AuthForm;
