import React, { FC } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
//import "bootstrap/dist/css/bootstrap.min.css";

export const filterId = 'freq'
export const freqEventLowChanged = 'freqEventLowChanged'
export const freqEventHighChanged = 'freqEventHighChanged'
export const freqEventUnitChanged = 'freqEventUnitChanged'
export const freqEventExpandChanged = 'freqEventExpandChanged'
export const freqEventCheckedChanged = 'freqEventCheckedChanged'
export const freqEventChecksCleared = 'freqEventChecksCleared'
export const freqBandSelectionChanged = 'freqBandSelectionChanged'
export const freqEventFilterSwitch = 'freqEventFilterSwitch'
interface CardDropdownProps {
  label?: string;
  choices?: [
    {
      label: string;
      value: any;
    }
  ];
}

const CardDropdown: FC<CardDropdownProps> = ({label, choices}: CardDropdownProps ) => {
  const [selection, setSelection] = React.useState("");

  const handleChange = (event: SelectChangeEvent) =>
    setSelection(event.target.value);

    label = label || 'Choose'
  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: 120 }}
      data-testid="CardDropdown"
    >
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        onChange={handleChange}
        label="What"
        value={selection}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CardDropdown;
