/**
 * In-memory storage for series
 */
let series: { id: string; title: string; genre: string; seasons: number; status: string; description: string }[] = [];

/**
 * Retrieves all series
 * @returns Array of all series
 */
export const getAllSeries = () => {
  return series;
};

/**
 * Retrieves a single series by ID
 * @param id - Series ID
 * @returns Series object or undefined
 */
export const getSeriesById = (id: string) => {
  return series.find((s) => s.id === id);
};

/**
 * Creates a new series
 * @param s - Series data
 * @returns Created series
 */
export const createSeries = (s: { title: string; genre: string; seasons: number; status: string; description: string }) => {
  const newSeries = { id: Date.now().toString(), ...s };
  series.push(newSeries);
  return newSeries;
};

/**
 * Updates an existing series
 * @param id - Series ID
 * @param s - Updated series data
 * @returns Updated series or undefined
 */
export const updateSeries = (id: string, s: { title: string; genre: string; seasons: number; status: string; description: string }) => {
  const index = series.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  series[index] = { id, ...s };
  return series[index];
};

/**
 * Deletes a series
 * @param id - Series ID
 * @returns Deleted series or undefined
 */
export const deleteSeries = (id: string) => {
  const index = series.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  const deleted = series[index];
  series.splice(index, 1);
  return deleted;
};