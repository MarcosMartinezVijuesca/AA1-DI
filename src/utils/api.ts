const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacters = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/character?page=${page}`);
  if (!res.ok) throw new Error("Error al cargar personajes");
  return res.json();
};

export const getCharacterById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  if (!res.ok) throw new Error("Personaje no encontrado");
  return res.json();
};

export const getLocations = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/location?page=${page}`);
  if (!res.ok) throw new Error("Error al cargar ubicaciones");
  return res.json();
};

export const getEpisodes = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/episode?page=${page}`);
  if (!res.ok) throw new Error("Error al cargar episodios");
  return res.json();
};