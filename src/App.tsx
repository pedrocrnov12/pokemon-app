import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { fetchPokemons, setPage } from './store/pokemonSlice';
import { PokemonCard } from './components/PokemonCard';
import { SearchBar } from './components/SearchBar';
import { Pagination } from './components/Pagination';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error, currentPage, totalCount, itemsPerPage } = useSelector(
    (state: RootState) => state.pokemon
  );

  useEffect(() => {
    // Initial fetch
    dispatch(fetchPokemons({ page: 1, limit: itemsPerPage }));
  }, [dispatch, itemsPerPage]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchPokemons({ page, limit: itemsPerPage }));
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="title-container">
          <h1>Pokémon Codex</h1>
          <p className="author-name">Pedro Antonio Cruz Novelo</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-wrapper">
          <div className="search-wrapper-center">
            <SearchBar />
          </div>
          
          {loading && <div className="loader">Cargando...</div>}
          {error && <div className="error">{error}</div>}
          
          {!loading && !error && (
            <div className="pokemon-grid">
              {list.map((poke) => (
                <PokemonCard key={poke.id} pokemon={poke} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {!loading && !error && list.length > 0 && totalCount > itemsPerPage && (
          <div className="pagination-wrapper">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
      )}
    </div>
  );
}

export default App;
