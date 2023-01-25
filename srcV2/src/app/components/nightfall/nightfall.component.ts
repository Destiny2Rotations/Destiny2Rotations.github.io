import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NightfallWeapon } from 'src/app/models/nightfall-weapon.model';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';
import * as FromApp from 'src/app/store/app.reducer'

import * as CommonActions from 'src/app/store/common/common.actions'

@Component({
  selector: 'nightfall',
  templateUrl: './nightfall.component.html',
  styleUrls: ['./nightfall.component.scss']
})
export class NightfallComponent implements OnInit {

  rolls: WeaponRoll[] = []
  dailyIndex: number = 0

  dailyWeapons?: WeaponRoll[]
  subscriptions: Subscription[] = []
  constructor(private store: Store<FromApp.AppState>) { }

  ngOnInit(): void {
    // this.subscriptions.push(this.store.select('common','weaponRolls').subscribe(store_rolls => {
    //   this.rolls = store_rolls
    //   this.assignWeapons()
    // }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }

}
