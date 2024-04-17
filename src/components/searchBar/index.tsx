import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  onSearch: (searchTerm: string) => void;
}

const StyledForm = styled.form`
  margin: 20px;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 1rem;
  margin-right: 10px;
`;

const StyledButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  border-radius: 5px;
  cursor: pointer;
`;

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="Search Pokemons..."
        value={searchTerm}
        onChange={handleChange}
      />
      <StyledButton type="submit">Search</StyledButton>
    </StyledForm>
  );
};

export default SearchBar;
