import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlterOfSorrow } from 'src/app/models/altar-of-sorrow.model';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';
import * as FromApp from 'src/app/store/app.reducer'
import * as CommonActions from 'src/app/store/common/common.actions'
import { WeaponRollsComponent } from '../weapon-rolls/weapon-rolls.component';

@Component({
  selector: 'alter-sorrows',
  templateUrl: './alter-sorrows.component.html',
  styleUrls: ['./alter-sorrows.component.scss']
})
export class AlterSorrowsComponent implements OnInit,OnDestroy {

  alters: AlterOfSorrow[] = []
  rolls: WeaponRoll[] = []
  dailyIndex: number = 0

  dailyWeapon?: WeaponRoll
  subscriptions: Subscription[] = []
  constructor(private store: Store<FromApp.AppState>) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select('common','AltersOfSorrow').subscribe(store_alts => {
      if(store_alts)
        this.alters = store_alts
      if(this.dailyIndex >= 0 && this.rolls.length > 0 && this.alters.length > 0)
        this.assignWeapon()
    }))

    this.subscriptions.push(this.store.select('common','dailyResets').subscribe(index => {
      if(index)
        this.dailyIndex = index % 3
      if(this.dailyIndex >= 0 && this.rolls.length > 0 && this.alters.length > 0)
        this.assignWeapon()
    }))

    this.subscriptions.push(this.store.select('common','weaponRolls').subscribe(store_rolls => {
      this.rolls = store_rolls
      if(this.dailyIndex >= 0 && this.rolls.length > 0 && this.alters.length > 0)
        this.assignWeapon()
    }))
  }

  assignWeapon(){
    let weapon = this.rolls.find(roll => roll.id == this.alters[this.dailyIndex].weapons_roll.id)
    if(weapon)
      this.dailyWeapon = weapon
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }

}
