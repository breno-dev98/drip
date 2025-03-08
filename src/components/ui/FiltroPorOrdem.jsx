import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FiltroPorOrdem({ items, defaultValue }) {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box width="200px">
      <FormControl fullWidth>
        <InputLabel id="ordenar-por-label">Ordernar por:</InputLabel>
        <Select defaultValue={defaultValue} labelId="ordenar-por-label" value={value} label="OrdenarPor" onChange={handleChange}>
          {items?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
