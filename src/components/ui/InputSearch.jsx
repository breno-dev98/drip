import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const InputSearch = ({ value, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(value || "");

  useEffect(() => {
    setSearchTerm(value);
  }, [value]); // Atualiza searchTerm se o valor externo mudar

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    onSearch(newValue); // Dispara a função de busca, passando o termo de pesquisa
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); // Limpa a pesquisa
  };

  return (
    <TextField
      variant="outlined"
      value={searchTerm} // Agora o valor é controlado tanto internamente quanto externamente
      size="small"
      placeholder="Buscar categorias..."
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputSearch;
