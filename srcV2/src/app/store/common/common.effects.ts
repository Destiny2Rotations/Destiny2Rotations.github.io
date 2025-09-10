import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as CommonActions from './common.actions';
import { map, tap, switchMap, catchError, finalize, withLatestFrom, delay, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CMSService } from '../../services/cms.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'
import { state } from '@angular/animations';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';
import { D2Element } from 'src/app/models/element.model';
import { WeaponType } from 'src/app/models/weapon-type.model';
import { DropSource } from 'src/app/models/drop-source.model';

@Injectable()
export class CommonEffects {
    constructor(
        private actions$: Actions, 
        private router: Router,
        private store: Store<fromApp.AppState>,
        private cmsService: CMSService
    ) {}

    
    // getting the element will populate all other fields
    get_elements$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_ELEMENTS),
          mergeMap(() => this.cmsService.get_elements().pipe(
              map(resp => { 
                  return { type: CommonActions.GET_ELEMENTS_SUCCESS, rolls: resp }
            })
          ))
        )
    )
    get_currentSeason$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_ELEMENTS_SUCCESS),
          mergeMap(() => this.cmsService.get_currentSeason().pipe(
              map(resp => ({ type: CommonActions.GET_CURRENTSEASON_SUCCESS, season: resp }))
          ))
        )
    )
    get_rolls$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_CURRENTSEASON_SUCCESS),
          mergeMap(() => this.cmsService.get_weaponRolls().pipe(
              map(resp => {

                  //add isPve && isPvp
                  let formattedRolls = resp.map(roll => {
                    roll.isPve = false
                    roll.isPvp = false
                    let nameSplit = roll.name.split(" - ")
                    if(nameSplit.length > 0) {
                      if (nameSplit[nameSplit.length-1].toLowerCase().includes("pve")) {
                        roll.isPve = true
                      }
                      if (nameSplit[nameSplit.length-1].toLowerCase().includes("pvp")) {
                        roll.isPvp = true
                      }
                      roll.name = nameSplit[0]
                    }

                    if(!roll.drop_source) {
                      roll.drop_source = new DropSource(-1,"Core - Unknown")
                    }
                    if(!roll.element) {
                      roll.element = new D2Element(-1,"unknown","WHITE")
                    }
                    if(!roll.weapon_type) {
                      roll.weapon_type = new WeaponType(-1,"")
                    }

                    return roll
                  })

                  return { 
                    type: CommonActions.GET_ROLLS_SUCCESS, 
                    rolls: formattedRolls
                  }
            })
          ))
        )
    )
    
    // All other calls wait for the previous calls to finish
    get_acs$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_ROLLS_SUCCESS),
          mergeMap(() => this.cmsService.get_ascendantChallenge().pipe(
              map(resp => ({ type: CommonActions.GET_AC_SUCCESS, acs: resp }))
          ))
        )
    )
    
    get_alters$ = createEffect(
        () => this.actions$.pipe(
          ofType(CommonActions.GET_ROLLS_SUCCESS),
          mergeMap(() => this.cmsService.get_alterOfSorrows().pipe(
              map(resp => ({ type: CommonActions.GET_ALTERS_SUCCESS, alters: resp }))
          ))
        )
    )
}
