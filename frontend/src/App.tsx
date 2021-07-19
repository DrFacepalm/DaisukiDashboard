import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { default as myData } from "./data/data.json";
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
import LineGraph from "./components/nivo/LineGraph";

const Header = styled.div`
  padding: 40px 0px;
`;

const StyledBackground = styled.div`
  background: var(--bg-color);
  min-height: 100vh;
  max-width: 100vw;
`;

const StyledContainer = styled(Container)`
  overflow-x: clip;
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
  const idToIndex = Object.fromEntries(
    myData.map(({ id }, index) => [id, index])
  );

  const fillRepeatArray = (a: string[], length: number) => {
    if (a.length >= length) {
      return a.slice(0, length);
    } else {
      const repeats = Math.ceil(length / a.length);
      return Array.from({ length: repeats }, () => a)
        .flat()
        .slice(0, length);
    }
  };

  const originalColors = fillRepeatArray(
    [
      "#9e0142",
      "#d53e4f",
      "#f46d43",
      "#fdae61",
      "#fee08b",
      "#ffffbf",
      "#e6f598",
      "#abdda4",
      "#66c2a5",
      "#3288bd",
      "#5e4fa2",
    ], // from nivo colors "spectral"
    myData.length
  );

  const [colors, setColors] = useState(originalColors);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
    console.log(event.target.name, event.target.checked);
  };

  useEffect(() => {
    setChartData(myData.filter(({ id }) => checked[id]));
    setColors(originalColors.filter((_, index) => checked[myData[index].id]));
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
        <StyledContainer maxWidth="xl">
          <Header>
            <Card elevation={0}>
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
            </Card>
          </Header>
          <Card elevation={0}>
            <FormGroup row>
              {myData.map(({ id }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked[id]}
                      onChange={handleCheck}
                      name={id}
                      style={{ color: originalColors[idToIndex[id]] }}
                    />
                  }
                  label={<Typography>{id}</Typography>}
                />
              ))}
            </FormGroup>
          </Card>
          <LineGraph data={chartData} colors={colors} />
          <Card elevation={0}></Card>
        </StyledContainer>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
