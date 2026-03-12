export const fetchPokemonList = async () => {

  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1025"
  );

  const data = await res.json();

  const details = await Promise.all(
    data.results.map(async (p: { url: string }) => {

      const r = await fetch(p.url);
      const pokemon = await r.json();

      if (!pokemon.is_default) return null;

      return pokemon;

    })
  );

  return details.filter((p: any) => p !== null);

};

export const fetchPokemonForms = async (speciesUrl: string) => {

  const species = await fetch(speciesUrl).then(r => r.json());

  const otherForms = species.varieties.filter((v: any) => !v.is_default);

  const forms = await Promise.all(
    otherForms.map(async (v: any) => {

      const res = await fetch(v.pokemon.url);

      return res.json();

    })
  );

  return forms;

};