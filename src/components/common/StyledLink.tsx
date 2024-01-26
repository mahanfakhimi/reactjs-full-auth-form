import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export default StyledLink;
