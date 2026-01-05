import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { searchPokemon, setSearchTerm, clearSearch, fetchPokemons } from '../store/pokemonSlice';

export const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();

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
    //reload the first page of the full list
    dispatch(fetchPokemons({ page: 1, limit: 6 }));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Buscar Pokémon..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Buscar</button>
      </form>
      {input && (
        <button onClick={handleClear} className="clear-btn">
          Ver Todos
        </button>
      )}
    </div>
  );
};