import React, { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  usePokemonCategories,
  usePokemonsAll,
  usePokemonsByCategory,
} from "@/queries";
import PokemonCategoryList from "@/components/pokemonCategoryList";
import SearchBar from "@/components/searchBar";
import { searchPokemons } from "@/utils/search";
import { ITypical } from "@/types/pokemon";
import PaginationControls from "@/components/paginationControls";

import { Loader } from "@/styles/common";

const PokemonList = dynamic(() => import("@/components/pokemonList"));

const PAGE_SIZE = 20;

export const Home: React.FC<any> = ({ initialPokemons, initialCategories }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPokemons, setFilteredPokemons] = useState<ITypical[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const { query } = router;
    if (query.categoryId) {
      setSelectedCategory(query.categoryId as string);
    } else {
      setSelectedCategory("");
    }
  }, [router.query.categoryId]);

  const handleCategoryChange = (category: string) => {
    const updatedCategory = selectedCategory === category ? "" : category;
    setSelectedCategory(updatedCategory);
    router.push(
      { pathname: "/", query: { categoryId: updatedCategory } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = usePokemonCategories(initialCategories);

  const { data: pokemonAll } = usePokemonsAll(initialPokemons);
  const {
    data: pokemonsByCategory,
    isLoading: pokemonByCategoryLoading,
    isError: pokemonByCategoryError,
  } = usePokemonsByCategory(selectedCategory);

  console.log("slectedCategory", selectedCategory);
  useEffect(() => {
    const pokemonData =
      selectedCategory === "" ? pokemonAll : pokemonsByCategory;

    if (searchTerm === "") {
      setFilteredPokemons(pokemonsByCategory || []);
      console.log("setted!!!!");
    } else {
      searchPokemons(searchTerm, pokemonData || []).then((result) => {
        setFilteredPokemons(result);
      });
    }

    console.log(
      "pokemonData",
      pokemonData,
      pokemonsByCategory,
      filteredPokemons
    );
  }, [searchTerm, selectedCategory, pokemonAll, pokemonsByCategory]);

  const paginatedPokemons = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredPokemons.slice(startIndex, endIndex);
  }, [filteredPokemons, page]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPokemons.length / PAGE_SIZE),
    [filteredPokemons]
  );
  return (
    <>
      {categoriesLoading && <Loader />}
      {categoriesError && <p>Error fetching categories</p>}
      {categories && (
        <>
          <SearchBar onSearch={handleSearch} />
          <PokemonCategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {paginatedPokemons.length !== 0 ? (
          <>
            <PokemonList pokemons={paginatedPokemons} />
            {totalPages > 1 && (
              <div>
                <PaginationControls
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        ) : selectedCategory?.length !== 0 || searchTerm !== "" ? (
          <p>Nothing is found</p>
        ) : null}
      </div>
    </>
  );
};

export default Home;
