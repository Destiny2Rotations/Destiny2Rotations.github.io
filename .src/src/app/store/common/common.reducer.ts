import * as CommonActions from './common.actions'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Action, createReducer, INITIAL_REDUCERS, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';
import { AscendantChallenge } from 'src/app/models/ascendant-challenge.model';
import { AlterOfSorrow } from 'src/app/models/altar-of-sorrow.model';

function calculateHowManyWeeks () {
    var today = new Date();
    var firstReset = new Date('2019-01-01');
    firstReset.setUTCHours(17, 0, 0, 0);
    //how many weeks have passed since jan 1 2019
    var weeksIn = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(firstReset.getFullYear(), firstReset.getMonth(), firstReset.getDate()) ) /(1000 * 60 * 60 * 24)) / 7;
    var todaysReset = new Date(today);
    todaysReset.setUTCHours(17, 0, 0, 0);
    //if the day is reset day check the time
    if(weeksIn % 1 == 0){ 
        if(today.getHours() < todaysReset.getHours()){
            weeksIn--;
        }
    }else{
        weeksIn = Math.floor(weeksIn)
    }

    return weeksIn;
}

function calculateWhatDay() {
    var today = new Date();
    var constReset = new Date('2019-01-01');
    constReset.setUTCHours(17, 0, 0, 0);
    var Difference_In_Time = today.getTime() - constReset.getTime();
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days
}

export interface State {
    weaponRolls: WeaponRoll[];
    ascendantChallenges: AscendantChallenge[];
    weeklyResets?: number;
    dailyResets?: number;
    AltersOfSorrow: AlterOfSorrow[];
}

const intialState: State = {
    weaponRolls: [],
    ascendantChallenges: [],
    weeklyResets: undefined,
    dailyResets: undefined,
    AltersOfSorrow: []
}

const commonReducer = createReducer(
    intialState,
    on(CommonActions.Get_Rolls_Success, (state, { rolls }) => {
        return { 
            ...state,
            weaponRolls: rolls
         }
    }),
    on(CommonActions.Get_AC_Success, (state, { acs }) => {
        return { 
            ...state,
            weeklyResets: state.weeklyResets ? state.weeklyResets : calculateHowManyWeeks(),
            dailyResets: state.dailyResets ? state.dailyResets : calculateWhatDay(),
            ascendantChallenges: acs
         }
    }),
    on(CommonActions.Get_Alters_Success, (state, { alters }) => {
        return { 
            ...state,
            weeklyResets: state.weeklyResets ? state.weeklyResets : calculateHowManyWeeks(),
            dailyResets: state.dailyResets ? state.dailyResets : calculateWhatDay(),
            AltersOfSorrow: alters
         }
    })
)


export function reducer(state: State | undefined, action: Action) {
    return commonReducer(state, action);
  }
