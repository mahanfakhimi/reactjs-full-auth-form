import { createTheme, css } from "@mui/material";

import poppinsFontUrl from "/fonts/poppins-medium.ttf";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: () => css`
        @font-face {
          font-family: "poppins";
          font-style: normal;
          font-display: block;
          font-weight: 500;
          src: local("poppins"), url(${poppinsFontUrl});
        }
      `,
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiTouchRipple: {
      styleOverrides: {
        root: {
          opacity: 0.5,
        },
      },
    },
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: "poppins",

    button: {
      textTransform: "initial",
    },
  },
});

export default theme;
