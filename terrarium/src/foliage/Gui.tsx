import * as React from "react";
import { Box, Slider } from "@mui/material";
type Props = {};

const Gui = (props: Props) => {
  return (
    <div style={{ width: 200 }}>
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default Gui;
