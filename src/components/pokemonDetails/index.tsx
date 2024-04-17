import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { IPokemon } from "@/types/pokemon";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { Loader } from "@/styles/common";

interface Props {
  pokemon: IPokemon | null;
}

const StyledPokemonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.paddings.container};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxshadow[5]};
  max-width: 600px;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;
  margin: auto;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxshadow[10]};
  }
`;

const PokemonName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-transform: capitalize;
  font-weight: 700;
  font-family: cursive;
`;
const PropertyTitle = styled.p`
  font-size: 1rem;
  margin: 10px 0;
  display: flex;
  gap: 0.5rem;
`;
const StyledTypeBadge = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
`;

const StyledChartContainer = styled.div`
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const PokemonDetail: React.FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBack = () => {
    setIsLoading(true);
    router.back();
  };

  if (!pokemon) {
    return <p>No data available for this Pokemon.</p>;
  }

  const chartOptions: ApexOptions = {
    theme: {
      mode: "dark",
    },
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: pokemon.stats?.map((item) => item.stat.name.toUpperCase()),
    },
  };

  return (
    <div>
      <StyledPokemonCard>
        <PokemonName>{pokemon.name}</PokemonName>
        <PropertyTitle>Weight: {pokemon.weight}</PropertyTitle>
        <PropertyTitle>
          Types:
          {pokemon.types?.map((typeItem) => (
            <StyledTypeBadge key={typeItem.type.name}>
              {typeItem.type.name}
            </StyledTypeBadge>
          ))}
        </PropertyTitle>
        <PropertyTitle>Stats:</PropertyTitle>
        {isClient && (
          <StyledChartContainer>
            <ReactApexChart
              options={chartOptions}
              series={[
                {
                  data: pokemon.stats?.map((stat) => stat.base_stat),
                },
              ]}
              type="bar"
              height={300}
            />
          </StyledChartContainer>
        )}
        <button onClick={handleBack}>Back</button>
      </StyledPokemonCard>
    </div>
  );
};

export default PokemonDetail;
