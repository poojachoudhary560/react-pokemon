import React, { useEffect, useState } from 'react';

const List = () => {
  const [pokemons, setPokemons] = useState([]);
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((res) => res.json())
      .then((res) => {
        let resultArr = [];
        console.log(res.results);
        for (let pokemon of res.results) {
          let resultObj = {};
          resultObj.name = pokemon.name;
          let abilityUrl = `${apiUrl}${pokemon.name}`;
          console.log(abilityUrl);
          fetch(abilityUrl)
            .then((abilities) => abilities.json())
            .then((abilities) => {
              //console.log(abilities);
              let allAbilities = abilities.abilities;
              let pokemonAbilityList = [];
              for (let j of allAbilities) {
                pokemonAbilityList.push(j.ability.name);
              }
              resultObj.abilities = pokemonAbilityList.join(',');
              console.log(resultObj);
            });
          resultArr.push({ ...resultObj });
          console.log('---', JSON.stringify(resultArr));
        }
        setPokemons(resultArr);
      });
  };

  return (
    <>
      {JSON.stringify(pokemons)}
      <table></table>
    </>
  );
};

export default List;
