import React from "react";
import Link from "next/link";
import { ITypical } from "@/types/pokemon";
import styled from "styled-components";

interface Props {
  pokemons: ITypical[];
}

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  flex-wrap: wrap;
  width: 100%;
  flex-grow: 1;
  border-top: 1px solid white;
  paddingx: 100px;
`;

const StyledListItem = styled.li`
  margin-bottom: 10px;
`;

const StyledCard = styled.div`
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  transition: all 0.3s ease;
  font-family: cursive;
  text-transform: capitalize;
  font-weight: 700;
  padding: 4rem 1rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  &:hover {
    // background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.light};
  }
`;

const PokemonList: React.FC<Props> = ({ pokemons }) => {
  return (
    <StyledList>
      {pokemons.map((pokemon) => (
        <StyledListItem key={pokemon.url}>
          <Link href={`/pokemon/${pokemon.name}`}>
            <StyledCard>{pokemon.name}</StyledCard>
          </Link>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default PokemonList;
