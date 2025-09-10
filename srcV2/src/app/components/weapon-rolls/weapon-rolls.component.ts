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
  
  selectedSource: any = null
  sourceArray: any[] = []
  sourceGroupArray: any [] = []
  sourceExpanded:number = -1

  quickSearchValue: string = ''
  showCurrentSeason: boolean = true
  showUnobtainable: boolean = false
  showCurrentRotation: boolean = true
  currentSeason?: CurrentSeason

  constructor(private store: Store<FromApp.AppState>) { }

  subscriptions: Subscription[] = []
  ngOnInit(): void {
    this.subscriptions.push(this.store.select('common','weaponRolls').subscribe(rolls => {
      this.allWeaponRolls = rolls
      this.weaponRolls = [...this.allWeaponRolls]
      this.generateSourceArray(this.allWeaponRolls)
    }))
    this.subscriptions.push(this.store.select('common','currentSeason').subscribe(season => {
      this.currentSeason = season
    }))
  }


  ngOnDestroy():void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  generateSourceArray(allWeaponRolls: WeaponRoll[]) {
    let sourceHash : any = {}
    allWeaponRolls.forEach(w => {
      if(!(w.drop_source.name in sourceHash)) {
        sourceHash[w.drop_source.name] = []
      }
      sourceHash[w.drop_source.name].push(w)
    })

    for (var source_name in sourceHash) {
      this.sourceArray.push({
        name: source_name,
        weapons: sourceHash[source_name]
      })
    }
    this.sourceArray = this.sourceArray.sort((a,b) => {
      return a.name.localeCompare(b.name)
    })

    let groupedSourceHash : any = {}
    this.sourceArray.forEach(source => {
      let nameSplit = source.name.split(" - ")
      let groupName = nameSplit.length > 1 ? nameSplit[0] : "Other"
      source.name = nameSplit.length > 1 ? nameSplit[1] : source.name
      if (!groupedSourceHash[groupName]) {
        groupedSourceHash[groupName] = {
          name: groupName,
          sources: []
        }
      }
      groupedSourceHash[groupName].sources.push(source)
    })

    for(var key in groupedSourceHash) {
      this.sourceGroupArray.push(groupedSourceHash[key])
    }

    const sortOrder: any = {Core:1,Episode:2,Dungeon:3,Raid:4,Gunsmith:5,Destination:6,Event:7,Other:8}
    this.sourceGroupArray = this.sourceGroupArray.sort((a,b) => {
      const sortA = sortOrder[a.name] ? sortOrder[a.name] : 999
      const sortB = sortOrder[b.name] ? sortOrder[b.name] : 999
      return sortA - sortB
    })
  }

  drop_source_clicked(drop_source : any) {
    this.selectedSource = drop_source
    this.showCurrentRotation = true
    this.sourceExpanded = 1
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
