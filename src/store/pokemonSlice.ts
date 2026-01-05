import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface PokemonState {
  list: Pokemon[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
  searchTerm: string;
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 6,
  totalCount: 0,
  searchTerm: '',
};

// Asynchronous action to obtain the paginated list
export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async ({ page, limit }: { page: number; limit: number }) => {
    const offset = (page - 1) * limit;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const results = response.data.results;
    const total = response.data.count;

    // We obtain the details of each Pokémon to have its image and types 
    const detailedPokemons = await Promise.all(
      results.map(async (pokemon: { url: string }) => {
        const detailResponse = await axios.get(pokemon.url);
        return {
          id: detailResponse.data.id,
          name: detailResponse.data.name,
          image: detailResponse.data.sprites.front_default || detailResponse.data.sprites.other['official-artwork'].front_default,
          types: detailResponse.data.types.map((t: any) => t.type.name),
        };
      })
    );

    return { results: detailedPokemons, total };
  }
);

// Asynchronous action to search by name
export const searchPokemon = createAsyncThunk(
  'pokemon/searchPokemon',
  async (name: string) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const data = response.data;
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default || data.sprites.other['official-artwork'].front_default,
      types: data.types.map((t: any) => t.type.name),
    };
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Cases for fetchPokemons
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
        state.totalCount = action.payload.total;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar Pokémon';
      })
      //Cases for searchPokemon
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [action.payload];
        state.totalCount = 1;
      })
      .addCase(searchPokemon.rejected, (state) => {
        state.loading = false;
        state.error = 'Pokémon no encontrado';
        state.list = [];
      });
  },
});

export const { setPage, setSearchTerm, clearSearch } = pokemonSlice.actions;
export default pokemonSlice.reducer;