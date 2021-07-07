import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NightfallWeapon } from 'src/app/models/nightfall-weapon.model';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';
import * as FromApp from 'src/app/store/app.reducer'

import * as CommonActions from 'src/app/store/common/common.actions'


@Component({
  selector: 'nightfall-weapon',
  templateUrl: './nightfall-weapon.component.html',
  styleUrls: ['./nightfall-weapon.component.scss']
})
export class NightfallWeaponComponent implements OnInit {

  rolls: WeaponRoll[] = []
  dailyIndex: number = 0

  dailyWeapons?: WeaponRoll[]
  subscriptions: Subscription[] = []
  constructor(private store: Store<FromApp.AppState>) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select('common','currentNightfallWeapon').subscribe(weapon => {
      this.dailyWeapons = weapon
      if(this.dailyWeapons && this.rolls.length > 0)
        this.assignWeapons()
    }))

    this.subscriptions.push(this.store.select('common','weaponRolls').subscribe(store_rolls => {
      this.rolls = store_rolls
      if(this.dailyWeapons && this.rolls.length > 0)
        this.assignWeapons()
    }))
  }

  assignWeapons(){
    let weapons: WeaponRoll[] = []
    this.dailyWeapons?.forEach(weap => {
      let curRoll = this.rolls.find(roll => roll.id == weap?.id)
      if(curRoll){
        weapons.push(curRoll)
      }      
    }) 
    this.dailyWeapons = weapons
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }

}
