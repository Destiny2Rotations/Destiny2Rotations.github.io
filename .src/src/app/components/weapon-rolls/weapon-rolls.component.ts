import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CurrentSeason } from 'src/app/models/current-season.model';
import { WeaponRoll } from 'src/app/models/weapon-roll.model';
import * as FromApp from 'src/app/store/app.reducer'
import * as CommonActions from 'src/app/store/common/common.actions'

@Component({
  selector: 'weapon-rolls',
  templateUrl: './weapon-rolls.component.html',
  styleUrls: ['./weapon-rolls.component.scss']
})
export class WeaponRollsComponent implements OnInit,OnDestroy {

  allWeaponRolls: WeaponRoll[] = []
  weaponRolls: WeaponRoll[] = []
  quickSearchValue: string = ''
  showCurrentSeason: boolean = true
  showUnobtainable: boolean = false
  currentSeason?: CurrentSeason

  constructor(private store: Store<FromApp.AppState>) { }

  subscriptions: Subscription[] = []
  ngOnInit(): void {
    this.subscriptions.push(this.store.select('common','weaponRolls').subscribe(rolls => {
      this.allWeaponRolls = rolls
      this.weaponRolls = [...this.allWeaponRolls]
    }))
    this.subscriptions.push(this.store.select('common','currentSeason').subscribe(season => {
      this.currentSeason = season
    }))
  }


  ngOnDestroy():void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
