import { Pipe, PipeTransform } from '@angular/core';
import { WeaponRoll } from '../models/weapon-roll.model';

@Pipe({
    name: 'weaponFilter',
    pure: false
})
export class WeaponFilterPipe implements PipeTransform {
    transform(items: WeaponRoll[], filter: {search:string,season?:number,showUnobtainable?:boolean} ): any {
        items.sort((a,b)=>{
            if(a.season > b.season){
                return -1
            } else if (a.season < b.season) {
                return 1
            } else {
                if(a.drop_source.name == b.drop_source.name){
                    if (a.name > b.name) {
                        return 1
                    } else {
                        return -1
                    }
                } else if (a.drop_source.name > b.drop_source.name) {
                    return 1
                } else {
                    return -1
                }
            }
            
        })

        return items.filter(roll => {
            if(roll.drop_source.name.toLowerCase().includes(filter.search.toLowerCase())
                || roll.name.toLowerCase().includes(filter.search.toLowerCase())) {
                    if(!filter.season || filter.season == roll.season) {
                        if(roll.isObtainable || filter.showUnobtainable)
                            return true
                    }
                        
            }
            return false
          })
    }
}
