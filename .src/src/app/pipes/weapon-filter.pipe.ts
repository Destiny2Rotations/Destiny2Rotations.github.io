import { Pipe, PipeTransform } from '@angular/core';
import { WeaponRoll } from '../models/weapon-roll.model';

@Pipe({
    name: 'weaponFilter',
    pure: false
})
export class WeaponFilterPipe implements PipeTransform {
    transform(items: WeaponRoll[], filter: {search:string,showUnobtainable?:boolean} ): any {
        if (!items || !filter || items.length == 0) {
            return items;
        }
        items.sort((a,b)=>{
            if(a.drop_source.name > b.drop_source.name) {
                return 1
            } else {
                return -1
            }
        })

        return items.filter(roll => {
            if(roll.drop_source.name.toLowerCase().includes(filter.search.toLowerCase())
                || roll.name.toLowerCase().includes(filter.search.toLowerCase())) {
                  return true
            }
            return false
          })
    }
}
