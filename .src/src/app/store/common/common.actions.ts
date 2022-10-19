import { Action, createAction, props } from '@ngrx/store';
import { AlterOfSorrow } from 'src/app/models/altar-of-sorrow.model';
import { AscendantChallenge } from 'src/app/models/ascendant-challenge.model';
import { CurrentSeason } from 'src/app/models/current-season.model';
import { D2Element } from 'src/app/models/element.model';
import { NightfallWeapon } from 'src/app/models/nightfall-weapon.model';
import { Nightfall } from 'src/app/models/nightfall.model';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';

//These actions fire before others
export const GET_ELEMENTS = '[Common] Get Elements';
export const GET_ELEMENTS_SUCCESS = '[Common] Get Elements Success';
export const GET_ROLLS_SUCCESS = '[Common] Get Rolls Success';
export const GET_CURRENTSEASON_SUCCESS = '[Common] Get Current Season Success';

export const GET_AC_SUCCESS = '[Common] Get Ascendant Challenge Success';
export const GET_ALTERS = '[Common] Get Alter of Sorrows';
export const GET_ALTERS_SUCCESS = '[Common] Get Alter of Sorrows Success';
export const GET_NIGHTFALL_SUCCESS = '[Common] Get Nightfall Success';


export const Get_Elements = createAction(
    GET_ELEMENTS
);
export const Get_Elements_Success = createAction(
    GET_ELEMENTS_SUCCESS,
    props<{ elements: D2Element[] }>()
);

export const Get_CurrentSeason_Success = createAction(
    GET_CURRENTSEASON_SUCCESS,
    props<{ season: CurrentSeason }>()
);

export const Get_Rolls_Success = createAction(
    GET_ROLLS_SUCCESS,
    props<{ rolls: WeaponRoll[] }>()
);


export const Get_AC_Success = createAction(
    GET_AC_SUCCESS,
    props<{ acs: AscendantChallenge[] }>()
);

export const Get_Alters_Success = createAction(
    GET_ALTERS_SUCCESS,
    props<{ alters: AlterOfSorrow[] }>()
);

export const Get_Nightfall_Success = createAction(
    GET_NIGHTFALL_SUCCESS,
    props<{ nightfalls: Nightfall[] }>()
);
