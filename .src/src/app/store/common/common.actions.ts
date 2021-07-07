import { Action, createAction, props } from '@ngrx/store';
import { AlterOfSorrow } from 'src/app/models/altar-of-sorrow.model';
import { AscendantChallenge } from 'src/app/models/ascendant-challenge.model';
import { CurrentSeason } from 'src/app/models/current-season.model';
import { NightfallWeapon } from 'src/app/models/nightfall-weapon.model';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';

export const GET_ROLLS = '[Common] Get Rolls';
export const GET_ROLLS_SUCCESS = '[Common] Get Rolls Success';
export const GET_AC = '[Common] Get Ascendant Challenge';
export const GET_AC_SUCCESS = '[Common] Get Ascendant Challenge Success';
export const GET_ALTERS = '[Common] Get Alter of Sorrows';
export const GET_ALTERS_SUCCESS = '[Common] Get Alter of Sorrows Success';
export const GET_CURRENTSEASON = '[Common] Get Current Season';
export const GET_CURRENTSEASON_SUCCESS = '[Common] Get Current Season Success';
export const GET_NIGHTFALLWEAPONS_SUCCESS = '[Common] Get Nightfall Weapons Success';

export const Get_Rolls = createAction(
    GET_ROLLS
);

export const Get_Rolls_Success = createAction(
    GET_ROLLS_SUCCESS,
    props<{ rolls: WeaponRoll[] }>()
);

export const Get_AC = createAction(
    GET_AC
);

export const Get_AC_Success = createAction(
    GET_AC_SUCCESS,
    props<{ acs: AscendantChallenge[] }>()
);

export const Get_Alters = createAction(
    GET_ALTERS
);

export const Get_Alters_Success = createAction(
    GET_ALTERS_SUCCESS,
    props<{ alters: AlterOfSorrow[] }>()
);

export const Get_CurrentSeason = createAction(
    GET_CURRENTSEASON
);

export const Get_CurrentSeason_Success = createAction(
    GET_CURRENTSEASON_SUCCESS,
    props<{ season: CurrentSeason }>()
);

export const Get_NightfallWeapons_Success = createAction(
    GET_NIGHTFALLWEAPONS_SUCCESS,
    props<{ weapons: NightfallWeapon[] }>()
);
