// types/Pokemon.ts

export interface ITypical {
  name: string;
  url: string;
}

export interface IPokemon {
  id: number;
  name: string;
  stats: IState[];
  weight: number;
  types: { slot: number; type: ITypical }[];
}
export interface IPokemonItem {
  pokemon: ITypical;
  slot: number;
}

export interface IState {
  base_stat: number;
  effort: number;
  stat: ITypical;
}
