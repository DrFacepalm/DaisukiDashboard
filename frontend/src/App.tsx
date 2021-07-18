import React, { useState } from "react";
import styled from "styled-components";
import { default as myData } from "./data/tp_min.json";
import {
  Typography,
  Container,
  Card,
  Select,
  MenuItem,
} from "@material-ui/core";
import useLocalStorage from "./utils/LocalStorageHook";
import ThemeProvider from "./themes/ThemeProvider";
// import { createGlobalStyle } from "styled-components";
// import "./App.css";
import themesList from "./themes/_list.json";
type themesType = {
  name: string;
  bgColor: string;
  textColor: string;
};

const Header = styled.div`
  padding: 40px 0px;
`;

const StyledBackground = styled.div`
  background: var(--bg-color);
  min-height: 100vh;
  min-width: 100vw;
`;

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "8008");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTheme(event.target.value as string);
  };
  return (
    <ThemeProvider themeString={theme}>
      <StyledBackground>
        <Container maxWidth="xl">
          <Card elevation={0}>
            <Header>
              <Typography variant="h3">Daisuki Dashboard</Typography>
              <Typography variant="overline">
                Custom Dashboard for Daisuki, The Ultimate Character Collection
                Game!
              </Typography>
            </Header>
          </Card>
          <Select value={theme} onChange={handleChange}>
            {themesList.map((theme: themesType) => (
              <MenuItem
                style={{ color: theme.textColor, background: theme.bgColor }}
                value={theme.name}
              >
                {theme.name}
              </MenuItem>
            ))}
          </Select>
        </Container>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
