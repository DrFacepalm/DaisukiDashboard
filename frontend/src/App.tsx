import React, { useState } from "react";
import styled from "styled-components";
import { default as myData } from "./data/tp_min.json";
import { Typography, Container, Card } from "@material-ui/core";
import ThemeProvider from "./themes/ThemeProvider";
// import { createGlobalStyle } from "styled-components";
// import "./App.css";

const Header = styled.div`
  padding: 40px 0px;
`;

const StyledBackground = styled.div`
  background: var(--bg-color);
  min-height: 100vh;
  min-width: 100vw;
`;

function App() {
  return (
    <ThemeProvider themeString="8008">
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
        </Container>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
