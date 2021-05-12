import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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

  constructor(private store: Store<FromApp.AppState>) { }

  subscriptions: Subscription[] = []
  ngOnInit(): void {
    this.store.dispatch(CommonActions.Get_Rolls())
    this.subscriptions.push(this.store.select('common','weaponRolls').subscribe(rolls => {
      this.allWeaponRolls = rolls
      this.onQuickSearch()
    }))
  }

  onQuickSearch(): void {
    this.weaponRolls = this.allWeaponRolls.filter(roll => {
      if(roll.drop_source.name.toLowerCase().includes(this.quickSearchValue.toLowerCase())
          || roll.name.toLowerCase().includes(this.quickSearchValue.toLowerCase())) {
            return true
      }
      return false
    })

  }

  ngOnDestroy():void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
