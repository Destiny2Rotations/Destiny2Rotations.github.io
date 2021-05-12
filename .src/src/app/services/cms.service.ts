import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AlterOfSorrow } from "../models/altar-of-sorrow.model";
import { AscendantChallenge } from "../models/ascendant-challenge.model";
import { WeaponRoll } from "../models/weapon-roll.model";

@Injectable({
    providedIn: 'root'
})
export class CMSService {
    constructor(private http: HttpClient) { }

    get_weaponRolls(): Observable<WeaponRoll[]> {
        return this.http.get(environment.cmsUrl + '/weapons-rolls').pipe(
            map(resp => {
                return <WeaponRoll[]>resp
            })
        );
    }

    get_ascendantChallenge(): Observable<AscendantChallenge[]> {
        return this.http.get(environment.cmsUrl + '/ascendant-challenges').pipe(
            map(resp => {
                return <AscendantChallenge[]>resp
            })
        );
    }

    get_alterOfSorrows(): Observable<AlterOfSorrow[]> { 
        return this.http.get(environment.cmsUrl + '/altar-of-sorrows').pipe(
            map(resp => {
                return <AlterOfSorrow[]>resp
            })
        );
    }
}