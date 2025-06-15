import { ObjectType,OrbitCode } from "./common";

export interface Satellites{
    noradCatId: string,
 intlDes:string,
 name: string,
 launchDate: string,
 decayDate: null | string,
 objectType: ObjectType,
 launchSiteCode: string,
 countryCode: string,
 orbitCode: OrbitCode
}