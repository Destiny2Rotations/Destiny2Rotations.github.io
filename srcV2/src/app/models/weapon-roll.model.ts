import { Archetype } from "./archetype.model";
import { DropSource } from "./drop-source.model";
import { Perk } from "./perk.model";
import { WeaponAttribute } from "./weapon-attributes.model";
import { D2Element } from "./element.model";
import { WeaponType } from "./weapon-type.model";

export class WeaponRoll {
    constructor (
        public id: number,
        public name: string,
        public img_url: string,
        public description: string,
        public isObtainable: boolean,
        public isCraftable: boolean,
        public archetype: Archetype,
        public element: D2Element,
        public perk_1: Perk[],
        public perk_2: Perk[],
        public perk_3: Perk[],
        public perk_4: Perk[],
        public weapon_type: WeaponType,
        public masterwork: WeaponAttribute[],
        public drop_source: DropSource,
        public season: number
    ) {}
}
