import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

import * as CommonActions from './common.actions';
import { map, tap, switchMap, catchError, finalize, withLatestFrom, delay, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CMSService } from '../../services/cms.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'
import { state } from '@angular/animations';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';

@Injectable()
export class CommonEffects {
    constructor(
        private actions$: Actions, 
        private router: Router,
        private store: Store<fromApp.AppState>,
        private cmsService: CMSService
    ) {}

    get_rolls$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_ROLLS),
          mergeMap(() => this.cmsService.get_weaponRolls().pipe(
              map(resp => { 
                  return { type: CommonActions.GET_ROLLS_SUCCESS, rolls: resp }
            })
          ))
        )
    )
    
    get_acs$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_ROLLS),
          mergeMap(() => this.cmsService.get_ascendantChallenge().pipe(
              map(resp => ({ type: CommonActions.GET_AC_SUCCESS, acs: resp }))
          ))
        )
    )
    
    get_alters$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_ALTERS),
          mergeMap(() => this.cmsService.get_alterOfSorrows().pipe(
              map(resp => ({ type: CommonActions.GET_ALTERS_SUCCESS, alters: resp }))
          ))
        )
    )

    get_currentSeason$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_ROLLS),
          mergeMap(() => this.cmsService.get_currentSeason().pipe(
              map(resp => ({ type: CommonActions.GET_CURRENTSEASON_SUCCESS, season: resp }))
          ))
        )
    )

    get_currentNightfallWeapon$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_ROLLS),
          mergeMap(() => this.cmsService.get_nightfallWeapons().pipe(
              map(resp => ({ type: CommonActions.GET_NIGHTFALLWEAPONS_SUCCESS, weapons: resp }))
          ))
        )
    )
}
