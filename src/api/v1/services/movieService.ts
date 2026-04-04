/**
 * In-memory storage for movies
 */
let movies: { id: string; title: string; genre: string; releaseYear: number; description: string; rating: number }[] = [];

/**
 * Retrieves all movies
 * @returns Array of all movies
 */
export const getAllMovies = () => {
  return movies;
};

/**
 * Retrieves a single movie by ID
 * @param id - Movie ID
 * @returns Movie object or undefined
 */
export const getMovieById = (id: string) => {
  return movies.find((movie) => movie.id === id);
};

/**
 * Creates a new movie
 * @param movie - Movie data
 * @returns Created movie
 */
export const createMovie = (movie: { title: string; genre: string; releaseYear: number; description: string; rating: number }) => {
  const newMovie = { id: Date.now().toString(), ...movie };
  movies.push(newMovie);
  return newMovie;
};

/**
 * Updates an existing movie
 * @param id - Movie ID
 * @param movie - Updated movie data
 * @returns Updated movie or undefined
 */
export const updateMovie = (id: string, movie: { title: string; genre: string; releaseYear: number; description: string; rating: number }) => {
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) return undefined;
  movies[index] = { id, ...movie };
  return movies[index];
};

/**
 * Deletes a movie
 * @param id - Movie ID
 * @returns Deleted movie or undefined
 */
export const deleteMovie = (id: string) => {
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) return undefined;
  const deleted = movies[index];
  movies.splice(index, 1);
  return deleted;
};