import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AlterOfSorrow } from "../models/altar-of-sorrow.model";
import { AscendantChallenge } from "../models/ascendant-challenge.model";
import { CurrentSeason } from "../models/current-season.model";
import { NightfallWeapon } from "../models/nightfall-weapon.model";
import { D2Element } from "../models/element.model";
import { WeaponRoll } from "../models/weapon-roll.model";

@Injectable({
    providedIn: 'root'
})
export class CMSService {
    constructor(private http: HttpClient) { }

    getHeaders(): HttpHeaders{
        let headers = new HttpHeaders()
        headers.set('Access-Control-Allow-Origin',environment.cmsUrl)
        return headers
    }

    get_weaponRolls(): Observable<WeaponRoll[]> {
        return this.http.get(environment.cmsUrl + '/weapons-rolls?_limit=-1').pipe(
            map(resp => {
                return <WeaponRoll[]>resp
            })
        );
    }

    get_elements(): Observable<D2Element[]> {
        return this.http.get(environment.cmsUrl + '/elements?_limit=-1').pipe(
            map(resp => {
                return <D2Element[]>resp
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

    get_currentSeason(): Observable<CurrentSeason> { 
        return this.http.get(environment.cmsUrl + '/current-season').pipe(
            map(resp => {
                return <CurrentSeason>resp
            })
        );
    }

    get_nightfallWeapons(): Observable<NightfallWeapon[]> { 
        return this.http.get(environment.cmsUrl + '/nightfall-rotations').pipe(
            map(resp => {
                return <NightfallWeapon[]>resp
            })
        );
    }
}