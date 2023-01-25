import { D2Element } from "./element.model";
import { WeaponRoll } from "./weapon-roll.model";

export class Nightfall {
    constructor (
        public id: number,
        public name: string,
        public arc_shields: number,
        public solar_shields: number,
        public void_shields: number,
        public stasis_shields: number,
        public barrier_champions: number,
        public overload_champions: number,
        public unstoppable_champions: number,
        public weapons: WeaponRoll[],
        public element_burns: D2Element,
        public order?: number
    ) {}
}
