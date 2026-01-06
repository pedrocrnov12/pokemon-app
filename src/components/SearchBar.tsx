import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { searchPokemon, setSearchTerm, clearSearch, fetchPokemons } from '../store/pokemonSlice';

export const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { itemsPerPage, loading } = useSelector((state: RootState) => state.pokemon);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(setSearchTerm(input));
      dispatch(searchPokemon(input));
    }
  };

  const handleClear = () => {
    setInput('');
    dispatch(clearSearch());
    dispatch(fetchPokemons({ page: 1, limit: itemsPerPage }));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Buscar Pokémon..."
          aria-label="Buscar Pokémon"
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={loading || !input.trim()}>Buscar</button>
      </form>
      {input && (
        <button onClick={handleClear} className="clear-btn">
          Ver Todos
        </button>
      )}
    </div>
  );
};