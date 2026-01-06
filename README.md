# Pokemon Codex
# creado por Pedro Cruz novelo como prueba tecnica para la empresa Blue Axe

Una aplicación web construida con React, TypeScript y Redux.

## Descripcion

Pokemon Codex es una Pokedex interactiva que permite a los usuarios buscar, filtrar y ver detalles de diferentes Pokémon. La aplicación consume la [PokeAPI](https://pokeapi.co/) para obtener información actualizada y precisa.

## Tecnologias Utilizadas (Front end)

Este proyecto fue desarrollado utilizando las siguientes tecnologías y librerías:

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React-Redux
- Axios
- CSS3

### Características Principales

1.  Listado de Pokémon: Muestra una cuadrícula de tarjetas con Pokémon, incluyendo su imagen, nombre y tipos.
2.  Búsqueda Inteligente:
     Permite buscar Pokémon por Nombre (ej. "Pikachu").
     Permite buscar Pokémon por ID (ej. "25").
3.  Paginación: Navegación sencilla a través de la lista de Pokemon para optimizar la carga de datos.
4.  Diseño Responsivo: La interfaz se adapta a dispositivos móviles, tablets y escritorio.

### Guía de Uso

1.  Inicio: Al abrir la aplicación, verás la primera página de Pokémon disponibles.
2.  Buscar: Escribe el nombre o número del Pokémon en la barra de búsqueda superior y presiona "Enter" o el botón de búsqueda.
3.  Navegar: Utiliza los botones "Anterior" y "Siguiente" al final de la página para ver más Pokémon.           
4.  Limpiar Búsqueda: Si has realizado una búsqueda, puedes borrar el texto y buscar nuevamente para volver al listado completo (o usar un botón de limpiar si está disponible).                                                                                                                                                                                                  

## Documentación Técnica

### Estructura del Proyecto

```
src/
├── assets/         # Recursos estáticos (imágenes, svg)
├── components/     # Componentes reutilizables de UI
│   ├── Pagination.tsx
│   ├── PokemonCard.tsx
│   └── SearchBar.tsx
├── services/       # Cliente HTTP (Axios) y manejo de errores
│   └── pokeApi.ts
├── store/          # Configuración de Redux
│   ├── pokemonSlice.ts  # Lógica de estado (reducers, thunks)
│   └── store.ts         # Configuración del store global
├── App.tsx         # Componente principal y layout
├── App.css         # Estilos globales y específicos de la app
├── main.tsx        # Punto de entrada de la aplicación
└── index.css       # Estilos base y reset
```

### Gestión de Estado (Redux)

La aplicación utiliza un slice principal `pokemonSlice` que maneja:
- `list`: Array de Pokémon actuales.
- `loading`: Estado de carga para mostrar spinners/loaders.
- `error`: Manejo de errores en las peticiones.
- `currentPage`: Control de la paginación actual.
- `totalCount`: Total de Pokémon disponibles (para calcular páginas).

### Mejoras Implementadas

- Configuración por entorno: uso de `VITE_API_BASE_URL` y `VITE_API_TIMEOUT` con fallbacks seguros.
- Unificación del cliente HTTP: todas las peticiones con `pokeApi` + interceptores y mensajes de error consistentes.
- UX y accesibilidad: `aria-label` en búsqueda, botón deshabilitado durante carga o sin texto, textos del UI en español.
- Rendimiento: imágenes con `loading="lazy"` en las tarjetas.
- Consistencia: botón "Ver Todos" usa `itemsPerPage` del store.
- Manejo de errores: mensajes diferenciados por timeout/red/404 desde el interceptor.

### Instalación y Ejecución Local

Para instrucciones detalladas, ver el archivo `INSTRUCCIONES_LOCAL.txt`.

1.  Clonar el repositorio.
2.  Instalar dependencias: `npm install`
3.  Crear archivo `.env` en la raíz con variables de entorno:
```
VITE_API_BASE_URL=https://pokeapi.co/api/v2
VITE_API_TIMEOUT=8000
```

4.  Correr el servidor de desarrollo: `npm run dev`


Notas:
- Las variables con prefijo VITE_ se exponen al cliente.
- Reinicia el servidor si modificas `.env`.

