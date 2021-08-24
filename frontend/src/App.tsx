import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {default as myData} from './data/data.json';
import {
  Typography,
  Container,
  Card,
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import {useLocalStorage, fillRepeatArray} from './utils';
import SettingsDialog from './components/settings/SettingsDialog';
import ThemeProvider from './themes/ThemeProvider';
import LineGraph from './components/nivo/LineGraph';

type ChartData = typeof myData;

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

function Graph(props: { ready: any; labelData: any; chartData: any }) {
  const [checked, setChecked] = useState(
      Object.fromEntries(props.labelData.map((id) => [id, true])),
  );
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({...checked, [event.target.name]: event.target.checked});
  };
  const idToIndex = Object.fromEntries(
      props.labelData.map((id, index) => [id, index]),
  );

  const [displayData, setDisplayData] = useState(props.chartData); // [] as ChartData);

  const originalColors = fillRepeatArray(
      [
        '#9e0142',
        '#d53e4f',
        '#f46d43',
        '#fdae61',
        '#fee08b',
        '#ffffbf',
        '#e6f598',
        '#abdda4',
        '#66c2a5',
        '#3288bd',
        '#5e4fa2',
      ], // from nivo colors "spectral"
      props.chartData.length,
  );
  const [colors, setColors] = useState(originalColors);

  useEffect(() => {
    setDisplayData(props.chartData.filter(({id}) => checked[id]));
    setColors(originalColors.filter((_, i) => checked[props.chartData[i].id]));
  }, [checked]);

  if (props.ready) {
    // Not sure what this is for, commented out to prevent re-rendering loop
    // setDisplayData(props.chartData);
    console.log(displayData);
    return (
      <div>
        <Card elevation={0}>
          <FormGroup row>
            {props.labelData.map((id) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    checked={checked[id]}
                    onChange={handleCheck}
                    name={id}
                    style={{color: colors[idToIndex[id]]}}
                  />
                }
                label={<Typography>{id}</Typography>}
              />
            ))}
          </FormGroup>
        </Card>
        <LineGraph data={displayData} colors={colors} />;
      </div>
    );
  }
  return <div>Not Ready</div>;
}

/**
 *
 * @returns
 */
function App() {
  const [theme, setTheme] = useLocalStorage('theme', '8008');
  const [chartData, setChartData] = useState([] as ChartData);
  const [labelData, setLabelData] = useState([] as Array<string>);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTheme(event.target.value as string);
  };

  const [checked, setChecked] = useState(
      Object.fromEntries(labelData.map((id) => [id, true])),
  );
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({...checked, [event.target.name]: event.target.checked});
  };
  const idToIndex = Object.fromEntries(
      labelData.map((id, index) => [id, index]),
  );

  const originalColors = fillRepeatArray(
      [
        '#9e0142',
        '#d53e4f',
        '#f46d43',
        '#fdae61',
        '#fee08b',
        '#ffffbf',
        '#e6f598',
        '#abdda4',
        '#66c2a5',
        '#3288bd',
        '#5e4fa2',
      ], // from nivo colors "spectral"
      labelData.length,
  );
  const [colors, setColors] = useState(originalColors);

  useEffect(() => {
    const x = async () => {
      const d = await fetch('http://13.238.204.77:4433/tp_scores');
      const data = await d.json();
      const labels = data.map(({id}) => id);

      setChartData(data);
      setLabelData(labels);
      setReady(true);
    };
    x();
  }, []);

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
          {/* <Card elevation={0}>
            <FormGroup row>
              {labelData.map((id) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox
                      checked={checked[id]}
                      onChange={handleCheck}
                      name={id}
                      style={{color: colors[idToIndex[id]]}}
                    />
                  label={<Typography>{id}</Typography>}
                />
              ))}
            </FormGroup>
          </Card> */}
          {ready && (
            <Graph chartData={chartData} labelData={labelData} ready={true} />
          )}
          <Card elevation={0}></Card>
        </StyledContainer>
      </StyledBackground>
    </ThemeProvider>
  );
}

export default App;
