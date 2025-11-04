import bugIcon from '../assets/type-icons/bug.svg';
import darkIcon from '../assets/type-icons/dark.svg';
import dragonIcon from '../assets/type-icons/dragon.svg';
import electricIcon from '../assets/type-icons/electric.svg';
import fairyIcon from '../assets/type-icons/fairy.svg';
import fightingIcon from '../assets/type-icons/fighting.svg';
import fireIcon from '../assets/type-icons/fire.svg';
import flyingIcon from '../assets/type-icons/flying.svg';
import ghostIcon from '../assets/type-icons/ghost.svg';
import grassIcon from '../assets/type-icons/grass.svg';
import groundIcon from '../assets/type-icons/ground.svg';
import iceIcon from '../assets/type-icons/ice.svg';
import normalIcon from '../assets/type-icons/normal.svg';
import poisonIcon from '../assets/type-icons/poison.svg';
import psychicIcon from '../assets/type-icons/psychic.svg';
import rockIcon from '../assets/type-icons/rock.svg';
import steelIcon from '../assets/type-icons/steel.svg';
import waterIcon from '../assets/type-icons/water.svg';

import type { PokemonTypeName } from '../data/weaknesses';

type TypeIconProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
    className?: string;
    style?: React.CSSProperties;
};

export const TypeIcon: React.FC<{ type: PokemonTypeName } & TypeIconProps> = ({ type, style, className, ...props }) => {
    const iconSrc = typeIcons[type];
    return <img src={iconSrc} className={className} style={style} {...props} alt={`${type} type`} />;
};

export const typeIcons: { [key in PokemonTypeName]: string } = {
    Bug: bugIcon,
    Dark: darkIcon,
    Dragon: dragonIcon,
    Electric: electricIcon,
    Fairy: fairyIcon,
    Fighting: fightingIcon,
    Fire: fireIcon,
    Flying: flyingIcon,
    Ghost: ghostIcon,
    Grass: grassIcon,
    Ground: groundIcon,
    Ice: iceIcon,
    Normal: normalIcon,
    Poison: poisonIcon,
    Psychic: psychicIcon,
    Rock: rockIcon,
    Steel: steelIcon,
    Water: waterIcon,
};