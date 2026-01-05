import type { Pokemon } from '../store/pokemonSlice';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  return (
    <div className="pokemon-card">
      <div className="card-image-container">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className="card-content">
        <h3>{pokemon.name}</h3>
        <div className="types">
          {pokemon.types.map((type) => (
            <span key={type} className={`type-badge ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};