import React, { useLayoutEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import rawThemes from "./themes.json";

type MyThemeProviderProps = {
  children?: React.ReactNode;
  themeString: string;
};

type themeType = {
  "--bg-color"?: string;
  "--main-color"?: string;
  "--caret-color"?: string;
  "--sub-color"?: string;
  "--text-color"?: string;
  "--error-color"?: string;
  "--error-extra-color"?: string;
  "--colorful-error-color"?: string;
  "--colorful-error-extra-color"?: string;
};

const themes: {
  [key: string]: themeType;
} = rawThemes;

const get = (key: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(key).trim();

const set = (key: string, value: string) =>
  document.documentElement.style.setProperty(key, value);

const MyThemeProvider = ({ children, themeString }: MyThemeProviderProps) => {
  const GlobalStyle = createGlobalStyle`
    html {
        --bg-color: #323437;
        --main-color: #e2b714;
        --caret-color: #e2b714;
        --sub-color: #646669;
        --text-color: #d1d0c5;
        --error-color: #ca4754;
        --error-extra-color: #7e2a33;
        --colorful-error-color: #ca4754;
        --colorful-error-extra-color: #7e2a33;
        transition-duration: 1s;
    }
    
    body {
      background: var(--bg-color);
    }
  `;
  const [theme, setTheme] = React.useState(createMuiTheme());

  useLayoutEffect(() => {
    // set the theme based on themeString
    if (themes[themeString]) {
      Object.entries(themes[themeString]).map((value: [string, string]) =>
        set(value[0], value[1])
      );
    }

    const cssTheme = createMuiTheme({
      palette: {
        primary: {
          main: get("--main-color"),
          contrastText: get("--text-color"),
        },
        background: {
          default: get("--bg-color"),
          paper: get("--bg-color"),
        },
        secondary: {
          main: get("--caret-color"),
          contrastText: get("--text-color"),
        },
        error: {
          main: get("--error-color"),
          contrastText: get("--text-color"),
        },
        warning: {
          main: get("--colorful-error-color"),
          contrastText: get("--text-color"),
        },
        info: {
          main: get("--colorful-error-color"),
          contrastText: get("--text-color"),
        },
        text: {
          primary: get("--text-color"),
          secondary: get("--sub-color"),
          disabled: get("--sub-color"),
          hint: get("--sub-color"),
        },
      },
    });

    setTheme(cssTheme);
  }, [themeString]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle /> {children}
    </ThemeProvider>
  );
};

export default MyThemeProvider;
