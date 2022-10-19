import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from 'src/app/store/app.reducer'
import * as CommonActions from 'src/app/store/common/common.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'd2-curation';

  constructor(private store: Store<FromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(CommonActions.Get_Elements())
  }

}
