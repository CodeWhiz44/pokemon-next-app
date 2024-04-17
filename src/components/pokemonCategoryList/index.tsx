import React from "react";
import { ITypical } from "@/types/pokemon";
import styled from "styled-components";

interface Props {
  categories: ITypical[];
  selectedCategory: string;
  onCategoryChange: (categoryName: string) => void;
}

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  flex-wrap: wrap;
  width: 100%;
`;

const StyledListItem = styled.li`
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-family:Poppins
  text-decoration: none;
  border: 1px solid grey;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.dark};
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &.selected {
    background-color: ${({ theme }) => theme.colors.dark};
    box-shadow: ${({ theme }) => theme.boxshadow[5]};
  }
`;

const PokemonCategoryList: React.FC<Props> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <StyledList>
      {categories.map((category) => (
        <StyledListItem key={category.url}>
          <StyledButton
            className={selectedCategory === category.name ? "selected" : ""}
            onClick={() => onCategoryChange(category.name)}
          >
            {category.name}
          </StyledButton>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default PokemonCategoryList;
