import { WeaponRoll } from "./weapon-roll.model";

export class NightfallWeapon {
    constructor (
        public id: number,
        public order: number,
        public name: string,
        public weapons_roll: WeaponRoll
    ) {}
}
