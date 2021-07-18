import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
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
      <DialogTitle>Settings</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText>
          <Typography>Select Theme: </Typography>
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
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Exit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
