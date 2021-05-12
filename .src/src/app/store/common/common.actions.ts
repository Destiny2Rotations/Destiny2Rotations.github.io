import { Action, createAction, props } from '@ngrx/store';
import { AlterOfSorrow } from 'src/app/models/altar-of-sorrow.model';
import { AscendantChallenge } from 'src/app/models/ascendant-challenge.model';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';

export const GET_ROLLS = '[Common] Get Rolls';
export const GET_ROLLS_SUCCESS = '[Common] Get Rolls Success';
export const GET_AC = '[Common] Get Ascendant Challenge';
export const GET_AC_SUCCESS = '[Common] Get Ascendant Challenge Success';
export const GET_ALTERS = '[Common] Get Alter of Sorrows';
export const GET_ALTERS_SUCCESS = '[Common] Get Alter of Sorrows Success';

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
