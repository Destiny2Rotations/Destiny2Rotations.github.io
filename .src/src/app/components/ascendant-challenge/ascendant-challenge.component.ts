import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AscendantChallenge } from 'src/app/models/ascendant-challenge.model';
import * as FromApp from 'src/app/store/app.reducer'
import * as CommonActions from 'src/app/store/common/common.actions'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ascendant-challenge',
  templateUrl: './ascendant-challenge.component.html',
  styleUrls: ['./ascendant-challenge.component.scss']
})
export class AscendantChallengeComponent implements OnInit,OnDestroy {

  constructor(private store: Store<FromApp.AppState>) { }

  cmsUrl: string = environment.cmsUrl
  challenges: AscendantChallenge[] = []
  weeklyIndex: number = 0

  subscriptions: Subscription[] = []
  ngOnInit(): void {
    this.subscriptions.push(this.store.select('common','ascendantChallenges').subscribe(ac => {
      if(!ac) {
        this.store.dispatch(CommonActions.Get_AC())
      }
      this.challenges = ac
    }))
    this.subscriptions.push(this.store.select('common','weeklyResets').subscribe(index => {
      if(index)
        this.weeklyIndex = index % 6
    }))
  }

  ngOnDestroy():void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
