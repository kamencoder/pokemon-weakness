

export type PokemonTypeName = 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice' | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';
export type Effectiveness = 0 | 0.25 | 0.5 | 1 | 2 | 4;
export type TypeDetailList = {
    [key in PokemonTypeName]: TypeDetail;
};
export type TypeDetail = {
    effectiveness: { [key in PokemonTypeName]: Effectiveness };
    color: string;
    name: PokemonTypeName;
    icon: any;
}
import BugTypeIcon from '../assets/type-icons/bug.svg';
import DarkTypeIcon from '../assets/type-icons/dark.svg';
import DragonTypeIcon from '../assets/type-icons/dragon.svg';
import ElectricTypeIcon from '../assets/type-icons/electric.svg';
import FairyTypeIcon from '../assets/type-icons/fairy.svg';
import FightingTypeIcon from '../assets/type-icons/fighting.svg';
import FireTypeIcon from '../assets/type-icons/fire.svg';
import FlyingTypeIcon from '../assets/type-icons/flying.svg';
import GhostTypeIcon from '../assets/type-icons/ghost.svg';
import GrassTypeIcon from '../assets/type-icons/grass.svg';
import GroundTypeIcon from '../assets/type-icons/ground.svg';
import IceTypeIcon from '../assets/type-icons/ice.svg';
import NormalTypeIcon from '../assets/type-icons/normal.svg';
import PoisonTypeIcon from '../assets/type-icons/poison.svg';
import PsychicTypeIcon from '../assets/type-icons/psychic.svg';
import RockTypeIcon from '../assets/type-icons/rock.svg';
import SteelTypeIcon from '../assets/type-icons/steel.svg';
import WaterTypeIcon from '../assets/type-icons/water.svg';

// Create a constant object to hold the type effectiveness data based on the attacking pokemon
export const typeDetailList: TypeDetailList = {
    Normal: {
        name: 'Normal',
        color: '#777',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 },
        icon: NormalTypeIcon,
    },
    Fire: {
        name: 'Fire',
        color: '#F08030',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 1, Grass: 2, Ice: 2, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 2, Fairy: 1 },
        icon: FireTypeIcon,
    },
    Water: {
        name: 'Water',
        color: '#6890F0',
        effectiveness: { Normal: 1, Fire: 2, Water: 0.5, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 1, Ground: 2, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 1, Fairy: 1 },
        icon: WaterTypeIcon,
    },
    Electric: {
        name: 'Electric',
        color: '#F8D030',
        effectiveness: { Normal: 1, Fire: 1, Water: 2, Electric: 0.5, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 1, Ground: 0, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 1, Fairy: 1 },
        icon: ElectricTypeIcon,
    },
    Grass: {
        name: 'Grass',
        color: '#78C850',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 2, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 0.5, Ground: 2, Flying: 0.5, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 0.5, Fairy: 1 },
        icon: GrassTypeIcon,
    },
    Ice: {
        name: 'Ice',
        color: '#96D9D6',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 1, Grass: 2, Ice: 0.5, Fighting: 1, Poison: 1, Ground: 2, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 1, Steel: 0.5, Fairy: 1 },
        icon: IceTypeIcon,
    },
    Fighting: {
        name: 'Fighting',
        color: '#C22E28',
        effectiveness: { Normal: 2, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 2, Fighting: 1, Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dragon: 1, Dark: 2, Steel: 2, Fairy: 0.5 },
        icon: FightingTypeIcon,
    },
    Poison: {
        name: 'Poison',
        color: '#A33EA1',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 2, Ice: 1, Fighting: 1, Poison: 0.5, Ground: 0.5, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0.5, Dragon: 1, Dark: 1, Steel: 0, Fairy: 2 },
        icon: PoisonTypeIcon,
    },
    Ground: {
        name: 'Ground',
        color: '#E2BF65',
        effectiveness: { Normal: 1, Fire: 2, Water: 1, Electric: 2, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 2, Ground: 1, Flying: 0, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 2, Fairy: 1 },
        icon: GroundTypeIcon,
    },
    Flying: {
        name: 'Flying',
        color: '#A98FF3',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 0.5, Grass: 2, Ice: 1, Fighting: 2, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 },
        icon: FlyingTypeIcon,
    },
    Psychic: {
        name: 'Psychic',
        color: '#F95587',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, Poison: 2, Ground: 1, Flying: 1, Psychic: 0.5, Bug: 1, Rock: 1, Ghost: 1, Dragon: 1, Dark: 0, Steel: 0.5, Fairy: 1 },
        icon: PsychicTypeIcon,
    },
    Bug: {
        name: 'Bug',
        color: '#A6B91A',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 1, Electric: 1, Grass: 2, Ice: 1, Fighting: 0.5, Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 2, Bug: 1, Rock: 1, Ghost: 0.5, Dragon: 1, Dark: 2, Steel: 0.5, Fairy: 0.5 },
        icon: BugTypeIcon,
    },
    Rock: {
        name: 'Rock',
        color: '#B6A136',
        effectiveness: { Normal: 1, Fire: 2, Water: 1, Electric: 1, Grass: 1, Ice: 2, Fighting: 0.5, Poison: 1, Ground: 0.5, Flying: 2, Psychic: 1, Bug: 2, Rock: 1, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 },
        icon: RockTypeIcon,
    },
    Ghost: {
        name: 'Ghost',
        color: '#735797',
        effectiveness: { Normal: 0, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 1 },
        icon: GhostTypeIcon,
    },
    Dragon: {
        name: 'Dragon',
        color: '#6F35FC',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 1, Steel: 0.5, Fairy: 0 },
        icon: DragonTypeIcon,
    },
    Dark: {
        name: 'Dark',
        color: '#222',
        effectiveness: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 0.5, Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 0.5 },
        icon: DarkTypeIcon,
    },
    Steel: {
        name: 'Steel',
        color: '#B7B7CE',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 0.5, Grass: 1, Ice: 2, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 2 },
        icon: SteelTypeIcon,
    },
    Fairy: {
        name: 'Fairy',
        color: '#D685AD',
        effectiveness: { Normal: 1, Fire: 0.5, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, Poison: 0.5, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 2, Steel: 0.5, Fairy: 1 },
        icon: FairyTypeIcon,
    },
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