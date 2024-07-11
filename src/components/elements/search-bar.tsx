import React from "react";
import { Box, TextField } from "@mui/material";
import { Search } from "lucide-react";
import styled from "@emotion/styled";

const StyledTextField = styled(TextField)`
  width: 100%;
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: transparent;
    }
    &:hover fieldset {
      border-color: transparent;
    }
    &.Mui-focused fieldset {
      border-color: transparent;
    }
  }
`;

const SearchBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 16px",
        borderRadius: "11px",
      }}
    >
      <Box display="flex" alignItems="center" width="40%">
        <Search size={24} />
        <StyledTextField name="search" placeholder="Search" />
      </Box>
    </Box>
  );
};

export default SearchBar;
