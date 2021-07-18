import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { default as myData } from "./data/tp.json";
import {
  Typography,
  Container,
  Card,
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import useLocalStorage from "./utils/LocalStorageHook";
import SettingsDialog from "./components/settings/SettingsDialog";
import ThemeProvider from "./themes/ThemeProvider";
import LineGraph, { LineGraphData } from "./components/nivo/LineGraph";

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
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState(myData);
  const [checked, setChecked] = useState(
    Object.fromEntries(myData.map(({ id }) => [id, true]))
  );

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
    console.log(event.target.name, event.target.checked);
  };

  useEffect(() => {
    setChartData(myData.filter(({ id }) => checked[id]));
  }, [checked]);
  return (
    <ThemeProvider themeString={theme}>
      <StyledBackground>
        <SettingsDialog
          open={open}
          setOpen={setOpen}
          theme={theme}
          handleChange={handleChange}
        />
        <Container maxWidth="xl">
          <Card elevation={0}>
            <Header>
              <Grid
                container
                direction="row"
                alignContent="space-between"
                alignItems="flex-end"
                spacing={2}
              >
                <Grid item>
                  <Typography variant="h3">Daisuki Dashboard</Typography>
                </Grid>
                <Grid item>
                  <Button onClick={() => setOpen(true)}>Settings</Button>
                </Grid>
              </Grid>
              <Typography variant="subtitle1">
                Custom Dashboard for Daisuki, The Ultimate Character Collection
                Game!
              </Typography>
            </Header>
          </Card>
          <Card elevation={0}>
            <LineGraph data={chartData} />
            <FormGroup row>
              {myData.map(({ id }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked[id]}
                      onChange={handleCheck}
                      name={id}
                    />
                  }
                  label={id}
                />
              ))}
            </FormGroup>
          </Card>
        </Container>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
