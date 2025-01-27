import React, { useState, useEffect } from "react";



const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]); // To store the list of Pokémon
    const [err, setErr] = useState(null); // To handle errors
    const [offset,setOffset] = useState(0);  
    let limit = 5;


    const getPokeMeta = async(url) => {
        let data;
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`Error : ${response.status}`)
        }

        data = await response.json()
        return {
            abilities: data.abilities,
            sprites: data.sprites.other['official-artwork'].front_default
        }
    }


    const getPokemons = async () => {
        let pokemons;
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            const data = await response.json(); 
            const pokemonData = data.results; 
            pokemons = await Promise.all (pokemonData.map( async (pokemon)=> {
                return {name :pokemon.name.trim(), 
                        metadata: await getPokeMeta(pokemon.url)
                    }
                })); 
            // debugger
            return pokemons;
        } catch (error) {
            setErr(error.message);
            return [] 
        }
    };


    const getNextPokemons = () =>{
        setOffset(offset+limit);
    }



    useEffect(() => {
        const fetchData = async () => {
            const pokemons = await getPokemons(); // Wait for the async function
            setPokemonList(pokemons); // Update the state with fetched data

        };
        fetchData(); 
    }, [offset]); 

    return (
        <div>
            <h1>Pokemon List</h1>
            <ul>
                {pokemonList.map((pokemon,index) => (
                    <li key={index}>{pokemon.name} <img src = {pokemon.metadata.sprites}/></li> 
                ))}
            </ul>
            <button onClick={getNextPokemons}>Load more</button>
        </div>
    );
};

export default PokemonList;
