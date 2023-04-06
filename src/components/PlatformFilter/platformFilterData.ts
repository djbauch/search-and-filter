import { PlatformType } from "typings/sharedTypes"

/*
Queries for the list of platform types. Returns an
array of JSON objects in the following format:
    {
        "id": "unique identifier, e.g. platform1",
        "value": "the name of the platform, e.g. Airborne",
        "label": "the name of the platform, e.g. Airborne",
        "fontColor": "optional font color"
    }
*/
export const samplePlatformTypes = (): PlatformType[] => {
    return [
      {
        id: 'platform1',
        value: 'Friendly',
        label: 'Friendly',
        fontColor: '#7ad2ec',
        className: 'blue-force'
      },
      {
        id: 'platform2',
        value: 'Adversary',
        label: 'Adversary',
        fontColor: '#ff2d41',
        className: 'red-force'
      },
      {
        id: 'platform3',
        value: 'Civilian',
        label: 'Civilian',
        fontColor: 'white',
      },
      {
        id: 'platform4',
        value: 'Airborne',
        label: 'Airborne',
      },
      {
        id: 'platform5',
        value: 'Ground-Based',
        label: 'Ground-Based',
      },
      {
        id: 'platform6',
        value: 'Maritime',
        label: 'Maritime',
      },
      {
        id: 'platform7',
        value: 'Spaceborne',
        label: 'Spaceborne',
      },
      {
        id: 'platform8',
        value: 'Cyber',
        label: 'Cyber',
      },
    ]
  }
  