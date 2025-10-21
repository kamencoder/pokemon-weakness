// Pokemon type effectiveness data:


export type PokemonTypeName = 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice' | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';
export type Effectiveness = 0 | 0.25 | 0.5 | 1 | 2 | 4;
export type TypeDetailList = {
    [key in PokemonTypeName]: TypeDetail;
};
export type TypeDetail = {
    effectiveness: { [key in PokemonTypeName]: Effectiveness };
    color: string;
    name: PokemonTypeName;
}

// Create a constant object to hold the type effectiveness data based on the attacking pokemon
export const typeDetailList: TypeDetailList = {
    Normal: { 
        name: 'Normal',
        color: '#777',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 } 
    },
    Fire: {
        name: 'Fire',
        color: '#F08030',
         effectiveness: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 1, Grass: 2, Ice: 2, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 2, Fairy: 1 } },
    Water: { 
        name: 'Water',
        color: '#6890F0',
        effectiveness: { Normal: 1, Fire: 2, Water: 0.5, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 1, Ground: 2, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 1, Fairy: 1 } },
    Electric: { 
        name: 'Electric',
        color: '#F8D030',
        effectiveness: { Normal: 1, Fire: 1, Water: 2, Electric: 0.5, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 1, Ground: 0, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 1, Fairy: 1 } },
    Grass: { 
        name: 'Grass',
        color: '#78C850',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 2, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 0.5, Ground: 2, Flying: 0.5, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 0.5, Fairy: 1 } },
    Ice: { 
        name: 'Ice',
        color: '#96D9D6',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 1, Grass: 2, Ice: 0.5, Fighting: 1, Poison: 1, Ground: 2, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 1, Steel: 0.5, Fairy: 1 } },
    Fighting: {
        name: 'Fighting',
        color: '#C22E28',
        effectiveness: { Normal: 2, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 2, Fighting: 1, Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dragon: 1, Dark: 2, Steel: 2, Fairy: 0.5 } },
    Poison: { 
        name: 'Poison',
        color: '#A33EA1',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 2, Ice: 1, Fighting: 1, Poison: 0.5, Ground: 0.5, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0.5, Dragon: 1, Dark: 1, Steel: 0, Fairy: 2 } },
    Ground: { 
        name: 'Ground',
        color: '#E2BF65',
        effectiveness: { Normal: 1, Fire: 2, Water: 1, Electric: 2, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 2, Ground: 1, Flying: 0, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 2, Fairy: 1 } },
    Flying: { 
        name: 'Flying',
        color: '#A98FF3',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 0.5, Grass: 2, Ice: 1, Fighting: 2, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 } },
    Psychic: { 
        name: 'Psychic',
        color: '#F95587',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, Poison: 2, Ground: 1, Flying: 1, Psychic: 0.5, Bug: 1, Rock: 1, Ghost: 1, Dragon: 1, Dark: 0, Steel: 0.5, Fairy: 1 } },
    Bug: { 
        name: 'Bug',
        color: '#A6B91A',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 1, Electric: 1, Grass: 2, Ice: 1, Fighting: 0.5, Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 2, Bug: 1, Rock: 1, Ghost: 0.5, Dragon: 1, Dark: 2, Steel: 0.5, Fairy: 0.5 } },
    Rock: { 
        name: 'Rock',
        color: '#B6A136',
        effectiveness: { Normal: 1, Fire: 2, Water: 1, Electric: 1, Grass: 1, Ice: 2, Fighting: 0.5, Poison: 1, Ground: 0.5, Flying: 2, Psychic: 1, Bug: 2, Rock: 1, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 } },
    Ghost: { 
        name: 'Ghost',
        color: '#735797',
        effectiveness: { Normal: 0, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 1 } },
    Dragon: { 
        name: 'Dragon',
        color: '#6F35FC',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 1, Steel: 0.5, Fairy: 0 } },
    Dark: { 
        name: 'Dark',
        color: '#222',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 0.5, Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 0.5 } },
    Steel: { 
        name: 'Steel',
        color: '#B7B7CE',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 0.5, Grass: 1, Ice: 2, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 2 } },
    Fairy: { 
        name: 'Fairy',
        color: '#D685AD',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, Poison: 0.5, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 2, Steel: 0.5, Fairy: 1 } },
};

export type Matchup = {
    attackingType: TypeDetail;
    defendingTypes: TypeDetail[];
}
export const getRandomMatchup = (maxDefendingTypes: number = 1): Matchup => {
    const types = Object.keys(typeDetailList) as PokemonTypeName[];
    const attackingType = types[Math.floor(Math.random() * types.length)];
    const defendingTypesCount = Math.floor(Math.random() * maxDefendingTypes) + 1;
    const defendingTypes: PokemonTypeName[] = [];
    for (let i = 0; i < defendingTypesCount; i++) {
        let rndDefendingType = types[Math.floor(Math.random() * types.length)];
        while (defendingTypes.includes(rndDefendingType)) {
            console.log('duplicate defending type found, re-rolling');
            rndDefendingType = types[Math.floor(Math.random() * types.length)];
        }
        defendingTypes.push(rndDefendingType);
    }

    return { attackingType: typeDetailList[attackingType], defendingTypes: defendingTypes.map(dt => typeDetailList[dt]) };
}

export type MatchupResults = {
    totalEffectiveness: Effectiveness;   
    totalEffectivenessDescription: string;
    totalEffectivenessColor: string;
    breakdown: EffectivenessAgainstType[];
}
export type EffectivenessAgainstType = {
    defendingType: TypeDetail;
    effectiveness: Effectiveness;
}
export const evaluateMatchup = (matchup: Matchup): MatchupResults => {
    let totalEffectiveness: Effectiveness = 1;
    const attackModifiersPerDefendingType: EffectivenessAgainstType[] = [];
    matchup.defendingTypes.forEach(defType => {
        const effectiveness = typeDetailList[matchup.attackingType.name].effectiveness[defType.name];
        const effectivenessAgainstTypeDetail: EffectivenessAgainstType = {
              defendingType: defType,
              effectiveness,
            };
        attackModifiersPerDefendingType.push(effectivenessAgainstTypeDetail);
        totalEffectiveness = (totalEffectiveness * effectiveness) as Effectiveness;
    });
    return {
        totalEffectiveness,
        totalEffectivenessDescription: getEffectivenessDescription(totalEffectiveness),
        totalEffectivenessColor: getEffectivenessColor(totalEffectiveness),
        breakdown: attackModifiersPerDefendingType
    }
}

export const getEffectivenessDescription = (effectiveness?: Effectiveness): string => {
    const description = effectivenessDetails[effectiveness as Effectiveness]?.description;
    return description || '?????';
}

export const getEffectivenessColor = (effectiveness?: Effectiveness): string => {
    const color = effectivenessDetails[effectiveness as Effectiveness]?.color;
    return color || 'gray';
}

export type EffectivenessDetail = {
    value: Effectiveness;
    description: string;
    color: string;
}   
export const effectivenessDetails: { [key in Effectiveness]: EffectivenessDetail } = {
    0: { value: 0, description: 'No Effect (x0)', color: '#AAA' },
    0.25: { value: 0.25, description: 'Extremely Ineffective (1⁄4)', color: '#FFD93B' },
    0.5: { value: 0.5, description: 'Not Very Effective (1⁄2)', color: '#FFA531' },
    1: { value: 1, description: 'Normal Effectiveness (x1)', color: '#FF6B1A' },
    2: { value: 2, description: 'Super Effective (2x)', color: '#E63946' },
    4: { value: 4, description: 'Extremely Effective (4x)', color: '#dd539fff' },
};

export const effectivenessValues: Effectiveness[] = [0, 0.25, 0.5, 1, 2, 4];

export const effectivenessValueDetailList: EffectivenessDetail[] = effectivenessValues.map(value => effectivenessDetails[value]);