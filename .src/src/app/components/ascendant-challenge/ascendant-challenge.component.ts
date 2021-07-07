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
  challenge?: AscendantChallenge
  img_url: string = ''
  vid_url: string = ''

  subscriptions: Subscription[] = []
  ngOnInit(): void {
    this.subscriptions.push(this.store.select('common','currentAscendantChallenge').subscribe(ac => {
      this.challenge = ac
      if(this.challenge) {
        this.img_url = this.challenge.map.url
        this.vid_url = this.challenge.url
      }
    }))
  }

  ngOnDestroy():void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
