import React, { useLayoutEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import useLocalStorage from "../utils/LocalStorageHook";
// import { default as rawThemes } from "./themes.json";
import * as themes from "./themes.json";
import { themeKeys } from "./themeKeys";

type MyThemeProviderProps = {
  children?: React.ReactNode;
  themeString: //themeKeys;
  | "8008"
    | "cyberspace"
    | "hammerhead"
    | "miami"
    | "olive"
    | "serika_dark"
    | "80s_after_dark"
    | "dark"
    | "honey"
    | "miami_nights"
    | "olivia"
    | "shadow"
    | "9009"
    | "dark_magic_girl"
    | "horizon"
    | "midnight"
    | "onedark"
    | "shoko"
    | "aether"
    | "darling"
    | "iceberg_dark"
    | "milkshake"
    | "our_theme"
    | "solarized_dark"
    | "alduin"
    | "deku"
    | "iceberg_light"
    | "mint"
    | "paper"
    | "solarized_light"
    | "alpine"
    | "dollar"
    | "ishtar"
    | "mizu"
    | "pastel"
    | "sonokai"
    | "arch"
    | "dots"
    | "joker"
    | "modern_dolch"
    | "peaches"
    | "stealth"
    | "bento"
    | "dracula"
    | "laser"
    | "monokai"
    | "pulse"
    | "strawberry"
    | "bingsu"
    | "drowning"
    | "lavender"
    | "mountain"
    | "red_dragon"
    | "striker"
    | "bliss"
    | "dualshot"
    | "lil_dragon"
    | "mr_sleeves"
    | "red_samurai"
    | "superuser"
    | "blueberry_dark"
    | "ez_mode"
    | "lime"
    | "ms_cupcakes"
    | "repose_dark"
    | "sweden"
    | "blueberry_light"
    | "fledgling"
    | "luna"
    | "muted"
    | "repose_light"
    | "taro"
    | "botanical"
    | "froyo"
    | "magic_girl"
    | "nausea"
    | "retro"
    | "terminal"
    | "bouquet"
    | "fundamentals"
    | "mashu"
    | "nautilus"
    | "retrocast"
    | "terra"
    | "bushido"
    | "future_funk"
    | "matcha_moccha"
    | "nebula"
    | "rose_pine"
    | "vaporwave"
    | "cafe"
    | "graen"
    | "matrix"
    | "night_runner"
    | "rose_pine_dawn"
    | "voc"
    | "camping"
    | "grand_prix"
    | "menthol"
    | "nord"
    | "rose_pine_moon"
    | "vscode"
    | "carbon"
    | "gruvbox_dark"
    | "metaverse"
    | "norse"
    | "rudy"
    | "watermelon"
    | "copper"
    | "gruvbox_light"
    | "metropolis"
    | "oblivion"
    | "serika"
    | "wavez";
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

// const themes: {
//   [key: string]: themeType;
// } = rawThemes;

const get = (key: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(key).trim();

const set = (key: string, value: string) => {
  document.documentElement.style.setProperty(key, value);
  console.log(key, value);
};

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
  `;
  const [theme, setTheme] = React.useState(createMuiTheme());

  useLayoutEffect(() => {
    // set the theme based on themeString
    // const themes = rawThemes as { [key: string]: themeType };
    console.log(themeString);
    console.log(themes["8008"]);
    console.log(themes);
    themes["8008"] &&
      Object.entries(themes["8008"]).map((value: [string, string]) =>
        set(value[0], value[1])
      );

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
