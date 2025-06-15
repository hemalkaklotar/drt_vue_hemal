import { Column } from "@/utils/types/common"

export const satelliteColumns: Column[] = [
    { key: 'noradCatId', label: 'Cat ID', },
    {key:'intlDes',label:"Int Des"},
    { key: 'name', label: "Name" },
    { key: 'launchDate', label: 'Launch Date' },
    { key: 'decayDate', label: 'Decay Date' },
    { key: 'objectType', label: "Object Type" },
    { key: 'launchSiteCode', label: "Launch-site Code" },
    { key: 'countryCode', label: "Country Code" },
    { key: 'orbitCode', label: "Orbit Code" },
]
export const orbitCodes: Column[] = [
            { key:'LEO', label:'LEO' },
            { key:'LEO1', label:'LEO1' },
            { key:'LEO2', label:'LEO2' },
            { key:'LEO3', label:'LEO3' },
            { key:'MEO', label:'MEO' },
            { key:'GEO', label:'GEO' },
            { key:'HEO', label:'HEO' },
            { key:'IGO', label:'IGO' },
            { key:'EGO', label:'EGO' },
            { key:'NSO', label:'NSO' },
            { key:'GTO', label:'GTO' },
            { key:'GHO', label:'GHO' },
            { key:'HAO', label:'HAO' },
            { key:'MGO', label:'MGO' },
            { key:'LMO', label:'LMO' },
            { key:'UFO', label:'UFO' },
            { key:'ESO', label:'ESO' },
            { key:'UNKNOWN', label:'UNKNOWN' },
          ]

export const orbitTypes:Column[] = [
            { key:'ROCKET BODY', label:'ROCKET BODY' },
            { key:'DEBRIS', label:'DEBRIS' },
            { key:'UNKNOWN', label:'UNKNOWN' },
            { key:'PAYLOAD', label:'PAYLOAD' },
          ]
