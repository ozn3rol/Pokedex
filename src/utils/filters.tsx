import { getGeneration } from "./generation";

export const filterPokemon = (
  pokemonList: Array<{ id: number; name: string; types: Array<{ type: { name: string } }> }>,
  search: string,
  letter: string,
  type: string
) => {

  const text = search.toLowerCase();

  return pokemonList.filter((p) => {

    const matchSearch =
      p.name.includes(text) ||
      p.id.toString().includes(text);

    const matchLetter =
      letter === "" ||
      p.name.startsWith(letter.toLowerCase());

    const matchType =
      type === "" ||
      p.types.some(t => t.type.name === type);

    return matchSearch && matchLetter && matchType;

  });

};

export const groupByGeneration = (pokemonList: Array<{ id: number; name: string; types: Array<{ type: { name: string } }> }>) => {

  return pokemonList.reduce((acc: Record<number, Array<{ id: number; name: string; types: Array<{ type: { name: string } }> }>>, p) => {

    const gen = getGeneration(p.id);

    if (!acc[gen]) acc[gen] = [];

    acc[gen].push(p);

    return acc;

  }, {});

};