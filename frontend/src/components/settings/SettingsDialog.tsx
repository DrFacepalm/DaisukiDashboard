import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Link,
  Typography,
} from "@material-ui/core";

import themesList from "../../themes/_list.json";

type SettingsDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  theme: string;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
};

type themesType = {
  name: string;
  bgColor: string;
  textColor: string;
};

const SettingsDialog = ({
  open,
  setOpen,
  theme,
  handleChange,
}: SettingsDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      scroll={"body"}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle>
        <Typography variant="h5" color="primary">
          Settings
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText>
          <Typography variant="h6" color="primary">
            About us:
          </Typography>
          <Typography>
            Daisuki Dashboard is an open source project aiming to bring more
            statistics and data to the Daisuki Discord Bot game.
          </Typography>
          <Typography variant="h6" color="primary">
            Select Theme:
          </Typography>
          <Select value={theme} onChange={handleChange}>
            {themesList
              .sort((lhs: themesType, rhs: themesType) =>
                lhs.name > rhs.name ? 1 : rhs.name > lhs.name ? -1 : 0
              )
              .map((theme: themesType) => (
                <MenuItem
                  style={{ color: theme.textColor, background: theme.bgColor }}
                  value={theme.name}
                >
                  {theme.name}
                </MenuItem>
              ))}
          </Select>
          <Typography variant="h6" color="primary">
            Creators:
          </Typography>
          <ul>
            <li>
              <Typography>
                <Link href="https://github.com/xpire">xpire</Link>
              </Typography>
            </li>
            <li>
              <Typography>
                <Link href="https://github.com/DrFacepalm">DrFacepalm</Link>
              </Typography>
            </li>
          </ul>
          <Typography variant="h6" color="primary">
            Source:
          </Typography>
          <Typography>
            <Link href="https://github.com/DrFacepalm/DaisukiDashboard">
              https://github.com/DrFacepalm/DaisukiDashboard
            </Link>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Exit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
