import pokemonApi from "@/api/pokemonApi"

const getPokemons = () => {
    
    const pokemonsArr =  Array.from(Array(650))
    

    return pokemonsArr.map((_ , index ) => index + 1)
}

const getPokemonOptions =  async () => {

    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5)
    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4))
    
    return pokemons
}

const getPokemonNames = async ([a,b,c,d] = []) => {

    

    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
    ]

    const [optionA,optionB,optionC,optionD] = await Promise.all(promiseArr)
    
    return [
        {
            name: optionA.data.name, id: optionA.data.id
        },
        {
            name: optionB.data.name, id: optionB.data.id
        },
        {
            name: optionC.data.name, id: optionC.data.id
        },
        {
            name: optionD.data.name, id: optionD.data.id
        }
    ]

}


export default getPokemonOptions;