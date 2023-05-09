import {
  CCOrg,
  CombatantCommand,
  Group,
  UserAndGroups,
  Organization,
  Plan,
  PlatformType,
  TimezoneOption,
  ExportDataType,
  ExportDataTypes,
  ExportProjectDataTypes,
  ImportDataTypes,
  TopNavBarSearchItems,
  IconLibraryDesc,
  ProjectType,
  Document,
  NewsBlurb,
  AvailableSubscription,
  Project
} from 'typings'
import { Parser } from '@json2csv/plainjs'
import flatten from 'flat'
import { features } from 'process'

/*
Queries for the list of users.
*/
export const sampleUsers = (): UserAndGroups[] => {
  return [
    {
      user: 'test@us.mil',
      groups: ['jemsiaf'],
    },
    {
      user: 'test2@us.mil',
      groups: ['jemsiaf', 'developer'],
    },
    {
      user: 'jemsiaf@us.mil',
      groups: ['developer', 'tester'],
    },
  ]
}

/*
Queries for the list of groups that users can belong to.
*/
export const sampleGroups = (): Group[] => {
  return [
    {
      group: 'jemsiaf',
    },
    {
      group: 'developer',
    },
    {
      group: 'tester',
    },
    {
      group: 'guest',
    },
  ]
}

/*
Queries for the organizations associated with each Combatant Command.
Returns an array of JSON objects in the following format:
    {
        "ccmd": "Combatant Command",
        "organizations": [
            "org1", "org2" // comma separated list of organization id's
        ]
    }
*/



/*
Queries for the list of export options . Returns an
array of JSON objects in the following format:

{
    "id": "unique identifier, e.g. datatype1",
    "value": {"type of data"},
    "label": "the name of the data type, e.g. Image"
}

*/
export const sampleExportDataTypes = (): ExportDataTypes => {
  return [
    {
      id: 'datatype1',
      value: 'Image',
      label: 'Image',
    },

    {
      id: 'datatype2',
      value: 'Data',
      label: 'Data',
    },
  ]
}

/*
Queries for the list of data format options . Returns an
array of JSON objects in the following format:

{
    "id": "unique identifier, e.g. datatype1",
    "value": {"type of data"},
    "label": "the name of the type of data, eg. JPEG"
}

*/
export const sampleExportImageFormats = (): ExportDataTypes => {
  return [
    {
      id: 'imageFormatType1',
      value: '.jpeg',
      label: 'JPEG',
    },

    {
      id: 'imageFormatType2',
      value: 'geo-pdf',
      label: 'Geo-PDF',
    },
  ]
}

export const sampleExportDataFormats = (): ExportDataTypes => {
  return [
    {
      id: 'dataFormatType1',
      value: '.json',
      label: 'JSON',
    },

    {
      id: 'dataFormatType2',
      value: '.csv',
      label: 'CSV',
    },
  ]
}

export const sampleExportSnapshotFormats = (): ExportDataTypes => {
  return [
    {
      id: 'snapshotFormatType1',
      value: '.jpg',
      label: 'JPEG',
    },

    {
      id: 'snapshotFormatType2',
      value: 'geo-pdf',
      label: 'Geo-PDF',
    },
  ]
}

/*
Queries for the list of export options . Returns an
array of JSON objects in the following format:

{
    "id": "unique identifier, e.g. projectType1",
    "value": {"type of data"},
    "mimeType": "the MIME type of the format to return, e.g. application/json to return as JSON"
    "label": "the name of the data type, e.g. JSON"
}

*/
export const sampleExportProjectDataTypes = (): ExportProjectDataTypes => {
  return [
    {
      id: 'projectType1',
      value: '.json',
      mimeType: 'application/json',
      label: 'JSON (.json)',
    },

    {
      id: 'projectType2',
      value: '.md',
      mimeType: 'text/markdown',
      label: 'Markdown (.md)',
    },

    {
      id: 'projectType3',
      value: '.txt',
      mimeType: 'text/plain',
      label: 'Plain Text (.txt)',
    },

    {
      id: 'projectType4',
      value: '.rtf',
      mimeType: 'application/rtf',
      label: 'Rich Text Format (.rtf)',
    },

    {
      id: 'projectType5',
      value: '.doc',
      mimeType: 'application/msword',
      label: 'Word Document (.doc)',
    },
  ]
}

/*
 * Dummy server call.This can be replaced with hooks to the server sending format and current canvas and receiving image in return.
 */
export const getImageFile = (format, _canvas) => {
  console.log(format + ' is the image format you chose.')
  return 'downloadMap.jpg'
}

/*
Queries for the list of import options . Returns an
array of JSON objects in the following format:
{
    "id": "unique identifier, e.g. shapefile",
    "value": {"type of data"}, e.g comma delimited file extensions
    "label": "the name of the data type, e.g. GIS Shapefile(.shp)"
}
*/
export const sampleImportDataTypes = (): ImportDataTypes => {
  return [
    {
      id: 'shapefile',
      value: '.shp',
      label: 'GIS Shapefile(.shp)',
    },

    {
      id: 'raster',
      value: '.ras, .tif, .tiff',
      label: 'Raster file(.ras)',
    },
  ]
}

export const sampleTopNavSearchJSONData = (): TopNavBarSearchItems => {
  let filters: TopNavBarSearchItems = [
    {
      categories: 'suggestedFilters',
      url: `/organizations`,
      key: 'organizations',
      text: 'Organizations',
      type: 'info',
    },
    {
      categories: 'suggestedFilters',
      url: `/platforms`,
      key: 'platforms',
      text: 'Platforms',
      type: 'info',
    },
    {
      categories: 'suggestedFilters',
      url: `/sdEquipment`,
      key: 'sdEquipment',
      text: 'S-D Equipment',
      type: 'info',
    },
    {
      categories: 'suggestedFilters',
      url: `/hotSpots`,
      key: 'hotSpots',
      text: 'Hot-spots',
      type: 'info',
    },
  ]

  let results: TopNavBarSearchItems = [
    {
      url: `/dashboard`,
      categories: 'suggestionFiles',
      title: '#001',
      text: 'Bulbasaur',
    },
    {
      url: `/dashboard`,
      categories: 'suggestionFiles',
      title: '#004',
      text: 'Charmander',
    },
    {
      url: `/dashboard`,
      categories: 'suggestionFiles',
      title: '#007',
      text: 'Squirtle',
    },
    {
      url: `/dashboard`,
      categories: 'suggestionFiles',
      title: '#025',
      text: 'Pikachu',
    },
    {
      url: `/dashboard`,
      categories: 'suggestionMembers',
      title: 'Trainer',
      text: 'Ash Ketchum',
    },
  ]

  return filters.concat(results)
}

/*
 * This call returns a list of available libraries of icons intended to be used to plot points on the map.
 *
 * The intention is that a library will contain a number of images, integer-indexed.  Data points to be
 * drawn on the map will each contain an 'iconCode' property which corresponds to one of the MIL-STD-2525c icons.
 * When that data point is drawn, the system will determine the image to be used, and return it (as an
 * HTML <img>) via the JEMSIAFServer.getImage() call.
 *
 * The purpose of having multiple libraries is to allow a user to easily switch between sets of images/icons
 * to display the same data set.
 *
 */
export const sampleIconLibraries = (): IconLibraryDesc[] => {
  return [
    {
      id: 1,
      title: 'MIL-STD-2525C Icons',
      value: '2525C',
    },
  ]
}

/*
 * Sample project list, representing 'previously entered data;'.
 */
export const sampleProjectList: Project[] = [
  {
    //Global shared
    id: '0',
    name: 'defaultProject',
    description: 'default',
    data: {}, //Where the current project state is being saved to
    owner: 'test@us.mil',
    shared: true,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 1).toISOString(),
    modified: new Date(2021, 2, 1).toISOString(),
  },
  {
    //Not shared
    id: 'T',
    name: 'notShared_T',
    description: 'default',
    data: {}, //Where the current project state is being saved to
    owner: 'test@us.mil',
    shared: false,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 1).toISOString(),
    modified: new Date(2021, 2, 1).toISOString(),
  },
  {
    //Not shared
    id: 'T2',
    name: 'notShared_T2',
    description: 'default',
    data: {}, //Where the current project state is being saved to
    owner: 'test2@us.mil',
    shared: false,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 1).toISOString(),
    modified: new Date(2021, 2, 1).toISOString(),
  },
  {
    //User Shared
    id: 'TT2',
    name: 'userShared_T_T2',
    description: 'default',
    data: {}, //Where the current project state is being saved to
    owner: 'test@us.mil',
    shared: false,
    sharedUsers: ['test2@us.mil'],
    sharedGroups: [],
    editable: ['test2@us.mil'],
    created: new Date(2021, 1, 1).toISOString(),
    modified: new Date(2021, 2, 1).toISOString(),
  },
  {
    //User Shared
    id: 'TT3',
    name: 'userShared_T2_T',
    description: 'default',
    data: {}, //Where the current project state is being saved to
    owner: 'test2@us.mil',
    shared: false,
    sharedUsers: ['test@us.mil'],
    sharedGroups: [],
    editable: ['test@us.mil'],
    created: new Date(2021, 1, 1).toISOString(),
    modified: new Date(2021, 2, 1).toISOString(),
  },
  {
    //Global shared
    //Empty (the default project state)
    id: '001',
    name: 'blankProject_all',
    description: 'another desc',
    data: {},
    owner: 'test@us.mil',
    shared: true,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 2).toISOString(),
    modified: new Date(2021, 2, 2).toISOString(),
  },
  {
    //Global shared
    //Frequency popout visible, 1 to 2 MHZ
    id: '002',
    name: 'freqData_all',
    description: 'hello world',
    data: {
      freqPersistState: {
        activeFilter: {
          id: 'User Defined',
          label: 'User Defined',
          children: [],
        },
        lowFreq: 1,
        highFreq: 2,
        units: 'Hz',
        checked: [],
        expanded: [],
        filterOn: true,
      },
    },
    owner: 'test@us.mil',
    shared: true,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 3).toISOString(),
    modified: new Date(2021, 2, 3).toISOString(),
  },
  {
    //Global shared
    //No popout, data in all 5 panels
    //CC: AFRICOM and EUCOM checked
    //Topo: Air Force all checked (not expanded), Marine NMSC checked (not expanded), Navy Expanded, Friendly and Airborne checked
    //Temp: range 02/20/21 to 03/02/2021 (3:14 PM)
    //Freq: 10 to 20 MHZ, IEEE all selected
    //Func: Coastal Defense Radar
    id: '003',
    name: 'cardData_all',
    description: 'abcdef',
    data: {
      freqPersistState: {
        activeFilter: {
          id: 'IEEE',
          label: 'IEEE',
          children: [],
        },
        lowFreq: 10,
        highFreq: 30,
        units: 'Hz',
        checked: ['IEEE_HF', 'IEEE_VHF', 'IEEE_UHF', 'IEEE_L'],
        expanded: [],
        filterOn: true,
      },
      tempPersistState: {
        startDate: '2021-02-20T15:14:34.956Z',
        endDate: '2021-03-02T15:14:34.956Z',
        timeZone: 'UTC',
        filterOn: true,
      },
      cameraPersistState: {
        heading: 0,
        tilt: 0,
        position: {
          longitude: 20.5,
          latitude: 45,
          altitude: 20e6,
        },
      },
      ccPersistState: {
        treeChecked: [
          'AFRICOM',
          'AFRICOM_OPLAN',
          'AFRICOM_OPLAN_Alpha.docx',
          'AFRICOM_OPLAN_Bravo.docx',
          'AFRICOM_OPLAN_Charlie.docx',
          'AFRICOM_CONPLAN',
          'AFRICOM_CONPLAN_Alpha.docx',
          'AFRICOM_CONPLAN_Bravo.docx',
          'AFRICOM_CONPLAN_Charlie.docx',
          'AFRICOM_CONPLAN_Delta.docx',
          'AFRICOM_IC_REPORT',
          'AFRICOM_IC_REPORT_Alpha.docx',
          'AFRICOM_IC_REPORT_Bravo.docx',
          'EUCOM',
          'EUCOM_OPLAN',
          'EUCOM_OPLAN_Alpha.docx',
          'EUCOM_CONPLAN',
          'EUCOM_CONPLAN_Alpha.doc',
          'EUCOM_IC_REPORT',
          'EUCOM_IC_REPORT_Alpha.doc',
          'EUCOM_IC_REPORT_Bravo.doc',
        ],
        treeExpanded: [],
        platChecked: [],
        ccmdFilterOn: true,
        ccStore: [
          {
            ccmd: 'AFRICOM',
            checked: true,
            focus: '{latitude:-19.1,longitude:20.5,altitude:20e6}',
          },
          {
            ccmd: 'CENTCOM',
            checked: false,
            focus: '{latitude:26.9,longitude:56.0,altitude:20e6}',
          },
          {
            ccmd: 'CYBERCOM',
            checked: false,
            focus: '{latitude:39.100461859153924,longitude:-76.72889792116956,altitude:10e3}',
          },
          {
            ccmd: 'EUCOM',
            checked: true,
            focus: '{latitude:55.0, longitude:30.0, altitude:20e6}',
          },
          {
            ccmd: 'INDOPACOM',
            checked: false,
            focus: '{latitude:0.0, longitude:180.0, altitude:20e6}',
          },
          {
            ccmd: 'NORTHCOM',
            checked: false,
            focus: '{latitude:48.5,longitude:-110.0,altitude:20e6}',
          },
          {
            ccmd: 'SOUTHCOM',
            checked: false,
            focus: '{latitude:-27.3, longitude:-59.6, altitude:20e6}',
          },
          {
            ccmd: 'SPACECOM',
            checked: false,
            focus: '{latitude:38.82460116221239, longitude:-104.70025707219637, altitude:10e3}',
          },
          {
            ccmd: 'STRATCOM',
            checked: false,
            focus: '{latitude:41.118121484813365, longitude:-95.91524603738601,altitude:10e3}',
          },
          {
            ccmd: 'SOCOM',
            checked: false,
            focus: '{latitude:48.5,longitude:-110.0,altitude:20e6}',
          },
          {
            ccmd: 'TRANSCOM',
            checked: false,
            focus: '{latitude:-27.3, longitude:-59.6, altitude:20e6}',
          },
        ],
      },
      topoPersistState: {
        treeChecked: [
          'Air Force',
          '11AF',
          '137ARW',
          '137CF',
          '138CF',
          '139CF',
          '13AF',
          '141ACS',
          '142CF',
          '143CF',
          '144CF',
          '145AW',
          '145CF',
          '1SOSOW',
          '1SOW',
          '20AF',
          '27SOW',
          '720STG',
          '7AF',
          'AAC',
          'AC',
          'ACC',
          'AFDW',
          'AFSOC',
          'AIRLANT',
          'FMFLANT',
          'JFHQ-ID',
          'JFMONORTH',
          'PACAF',
          'NMSC',
        ],
        treeExpanded: ['Navy'],
        platChecked: ['platform1', 'platform4'],
        ccStore: [],
        platFilterOn: true,
        orgFilterOn: false,
      },
      funcPersistState: {
        functionalValues: [{ id: '0', value: 'Coastal Defense Radar', dropdownOpen: false }],
        filterOn: true,
      },
    },
    owner: 'test@us.mil',
    shared: true,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 4).toISOString(),
    modified: new Date(2021, 2, 4).toISOString(),
  },
  {
    //Not shared
    id: '00A',
    name: 'projectA_T',
    description: 'another desc',
    data: {},
    owner: 'test@us.mil',
    shared: false,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 5).toISOString(),
    modified: new Date(2021, 2, 5).toISOString(),
  },
  {
    //Not shared
    id: '00B',
    name: 'projectB_T',
    description: 'another desc',
    data: {},
    owner: 'test@us.mil',
    shared: false,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 5).toISOString(),
    modified: new Date(2021, 2, 5).toISOString(),
  },
  {
    //Not shared
    id: '00C',
    name: 'projectC_T',
    description: '12345',
    data: {},
    owner: 'test@us.mil',
    shared: false,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 6).toISOString(),
    modified: new Date(2021, 2, 6).toISOString(),
  },
  {
    //Not shared
    id: '00D',
    name: 'projectD_T2',
    description: 'abcdef',
    data: {},
    owner: 'test2@us.mil',
    shared: false,
    sharedUsers: [],
    sharedGroups: [],
    editable: [],
    created: new Date(2021, 1, 7).toISOString(),
    modified: new Date(2021, 2, 7).toISOString(),
  },
  {
    //Group Shared
    id: '00E',
    name: 'projectGroupShared1',
    description: 'another desc',
    data: {},
    owner: 'test@us.mil',
    shared: false,
    sharedUsers: [],
    sharedGroups: ['jemsiaf'],
    editable: [],
    created: new Date(2021, 1, 8).toISOString(),
    modified: new Date(2021, 2, 8).toISOString(),
  },
  {
    //Group Shared
    id: '00F',
    name: 'projectGroupShared2',
    description: '12345',
    data: {},
    owner: 'test@us.mil',
    shared: false,
    sharedUsers: [],
    sharedGroups: ['developer'],
    editable: [],
    created: new Date(2021, 1, 9).toISOString(),
    modified: new Date(2021, 2, 9).toISOString(),
  },
]

export const sampleDocumentList = (): Document[] => {
  return [
    {
      id: '0',
      name: 'myFile.xls',
      description: 'my file',
      created: new Date(2021, 1, 1).toISOString(),
      modified: new Date(2021, 2, 1).toISOString(),
    },
    {
      id: '1',
      name: 'thatFile.docx',
      description: 'that file',
      created: new Date(2021, 1, 2).toISOString(),
      modified: new Date(2021, 2, 2).toISOString(),
    },
    {
      id: '2',
      name: 'thisFile.docx',
      description: 'this file',
      created: new Date(2021, 1, 3).toISOString(),
      modified: new Date(2021, 2, 3).toISOString(),
    },
    {
      id: '3',
      name: 'otherFile.xls',
      description: 'other file',
      created: new Date(2021, 1, 4).toISOString(),
      modified: new Date(2021, 2, 4).toISOString(),
    },
    {
      id: '4',
      name: 'example.png',
      description: 'a picture',
      created: new Date(2021, 1, 5).toISOString(),
      modified: new Date(2021, 2, 5).toISOString(),
    },
    {
      id: '5',
      name: 'ToDoList.xls',
      description: 'things to do',
      created: new Date(2021, 1, 6).toISOString(),
      modified: new Date(2021, 2, 6).toISOString(),
    },
    {
      id: '6',
      name: 'StatementOfWork.docx',
      description: 'the statement of work',
      created: new Date(2021, 1, 7).toISOString(),
      modified: new Date(2021, 2, 7).toISOString(),
    },
    {
      id: '7',
      name: 'projectExample.docx',
      description: 'document',
      created: new Date(2021, 1, 8).toISOString(),
      modified: new Date(2021, 2, 8).toISOString(),
    },
  ]
}

//sample news Blurbs list
export const sampleRecentNewsList: Array<NewsBlurb> = [
  {
    title: 'AFRICOM CONPLAN',
    summary:
      'Dante and Beatrice gaze at the brilliance of the sun although Dante, being mortal, must avert his eyes after a short while. They fly towards the Heavens, passing the Zodiac symbols for Taurus, Aries, and Pisces along the way.',
    content:
      'The glory of Him who moves everything penetrates through the universe, and shines in one part more and in another less. In the heaven that receives most of its light I have been, and have seen things which he who descends from thereabove neither knows how nor is able to recount; because, drawing near to its own desire, our understanding enters so deep, that the memory cannot follow. Truly whatever of the Holy Realm I could treasure up in my mind shall now be the theme of my song. O good Apollo, for this last labor make me such a vessel of thy power as thou demandest for the gift of the loved laurel. Thus far one summit of Parnassus has been enough for me, but now with both I need to enter the remaining, arena. Enter into my breast, and breathe thou in such wise as when thou drewest Marsyas from out the sheath of his limbs. O divine Power, if thou lend thyself to me so that I may make manifest the image of the Blessed Realm imprinted within my head, thou shalt see me come to thy chosen tree, and crown myself then with those leaves of which the theme and thou will make me worthy. So rarely, Father, are they gathered for triumph or of Caesar or of poet (fault and shame of the human wills), that the Peneian leaf should bring forth joy unto the joyous Delphic deity, whenever it makes any one to long for it. Great flame follows a little spark: perhaps after me prayer shall be made with better voices, whereto Cyrrha may respond.',
    titleTag: 'h5',
    time: 'Just Now',
    tags: ['AFRICOM', 'AFRICOM-CONPLAN'],
  },
  {
    title: 'AFRICOM OPLAN',
    summary:
      'Paradiso 2 opens with an address to the readers that may be unique in literary history, in that it is an admonition not to continue reading. Here Dante tells us, his readers, to turn back to our shores rather than to set out on so deep a sea as the text that lies before us. The haunting evocation of a little ship out on the perilous watery deep, alone on the mighty ocean, reverberates to the Commedia’s Ulyssean lexicon, as well of course to the previous canto’s ontological metaphor of the “great sea of being”',
    content:
      'O ye, who are in a little bark, desirous to listen, following behind my craft which singing passes on, turn to see again Your shores; put not out upon the deep; for haply losing me, ye would remain astray. The water that I sail was never crossed. Minerva inspires, and Apollo guides me, and nine Muses point out to me the Bears. Ye other few, who have lifted tip your necks be. times to the bread of the Angels, oil which one here subsists, but never becomes sated of it, ye may well put forth your vessel over the salt deep, keeping my wake before you on the water which turns smooth again. Those glorious ones who passed over to Colchos wondered not as ye shall do, when they saw Jason become a ploughman. The concreate and perpetual thirst for the deiform realm was bearing us on swift almost as ye see the heavens. Beatrice was looking upward, and I upon her, and perhaps in such time as a quarrel rests, and flies, and from the notch is unlocked, I saw myself arrived where a wonderful thing drew my sight to itself; and therefore she, from whom the working of my mind could not be hid, turned toward me, glad as beautiful. "Uplift thy grateful mind to God," she said to me, "who with the first star has conjoined us."',
    titleTag: 'h5',
    time: '2 hours ago',
    tags: ['AFRICOM', 'AFRICOM-OPLAN'],
  },
  {
    title: 'CYBERCOM CONPLAN',
    summary:
      'Dante and Beatrice meet Piccarda, the sister of Forese Donati, who explains that all the souls in Paradise are happy to assume their rightful places in God’s order. She also introduces them to Empress Constance of Sicily.',
    content:
      'That sun which first had heated my breast with love, proving and refuting, had uncovered to me the sweet aspect of fair truth; and I, in order to confess myself corrected and assured so far as was needful, raised my head more erect to speak. But a vision appeared which held me to itself so close in order to be seen, that of my confession I remembered not.',
    titleTag: 'h5',
    time: 'Yesterday',
    tags: ['CYBERCOM', 'CYBERCOM-CONPLAN'],
  },
  {
    title: 'CENTCOM CONPLAN',
    summary:
      'Beatrice answers Dante’s unspoken questions (and doubts) about the nature of free will, elucidating the difference between absolute will and contingent will.',
    content:
      'Between two viands, distant and attractive in like measure, a free man would die of hunger, before he would bring one of them to his teeth. Thus a lamb would stand between two ravenings of fierce wolves, fearing equally; thus would stand a dog between two does. Hence if, urged by my doubts in like measure, I was silent, I blame not myself; nor, since it was necessary, do I commend. I was silent, but my desire was depicted on my face, and the questioning with that far more fervent than by distinct speech. Beatrice did what Daniel did, delivering Nebuchadnezzar from anger, which had made him unjustly cruel, and said, "I see clearly how one and the other desire draws thee, so that thy care so binds itself that it breathes not forth."',
    titleTag: 'h5',
    time: '2 days ago',
    tags: ['CENTCOM', 'CENTCOM-OPLAN'],
  },
  {
    title: 'CENTCOM IC Report',
    summary:
      'Dante and Beatrice encounter the inhabitants of the Second Heaven, the Sphere of Mercury. He speaks with Justinian I, the emperor who reformed Roman laws and, with God’s inspiration, created the Codex Justinianus, bringing peace to his people. Romeo of Villaneuve, whom Justinian praises, is also visible.',
    content:
      'If I flame upon thee in the heat of love, beyond the fashion that on earth is seen, go that I vanquish the valor of thine eyes, marvel not, for it proceeds from perfect vision, which according as it apprehends, so moves its feet to the apprehended good. I see clearly how already shines in thy intellect the eternal light, which, being seen, alone ever enkindles love. And if any other thing seduce your love, it is naught but some vestige of that, illrecognized, which therein shines through. Thou wishest to know if for a defective vow so much can be rendered with other service as may secure the soul from suit.',
    titleTag: 'h5',
    time: '1 week ago',
    tags: ['CENTCOM', 'CENTCOM-IC Report'],
  },
]

export const startingCameraPosition = {
  heading: 0,
  tilt: 0,
  position: {
    longitude: -77.0353,
    latitude: 38.88,
    altitude: 20e6,
  },
}

export const sampleSubscriptions = [
  {
    title: 'AFRICOM',
    tags: ['AFRICOM'],
    alert: false,
  },
  {
    title: 'AFRICOM - OPLAN',
    tags: ['AFRICOM', 'AFRICOM-OPLAN'],
    alert: false,
  },
  {
    title: 'AFRICOM - CONPLAN',
    tags: ['AFRICOM', 'AFRICOM-CONPLAN'],
    alert: false,
  },
  {
    title: 'AFRICOM IC Report',
    tags: ['AFRICOM', 'AFRICOM-IC Report'],
    alert: false,
  },
  {
    title: 'CENTCOM',
    tags: ['CENTCOM'],
    alert: false,
  },
  {
    title: 'CENTCOM - OPLAN',
    tags: ['CENTCOM', 'CENTCOM-OPLAN'],
    alert: false,
  },
  {
    title: 'CENTCOM - CONPLAN',
    tags: ['CENTCOM', 'CENTCOM-CONPLAN'],
    alert: false,
  },
  {
    title: 'CENTCOM IC Report',
    tags: ['CENTCOM', 'CENTCOM-IC Report'],
    alert: false,
  },
  {
    title: 'CYBERCOM',
    tags: ['CYBERCOM'],
    alert: false,
  },
  {
    title: 'CYBERCOM - OPLAN',
    tags: ['CYBERCOM', 'CYBERCOM-OPLAN'],
    alert: false,
  },
  {
    title: 'CYBERCOM - CONPLAN',
    tags: ['CYBERCOM', 'CYBERCOM-CONPLAN'],
    alert: false,
  },
  {
    title: 'CYBERCOM IC Report',
    tags: ['CYBERCOM', 'CYBERCOM-IC Report'],
    alert: false,
  },
  {
    title: 'EUCOM',
    tags: ['EUCOM'],
    alert: false,
  },
  {
    title: 'EUCOM - OPLAN',
    tags: ['EUCOM', 'EUCOM-OPLAN'],
    alert: false,
  },
  {
    title: 'EUCOM - CONPLAN',
    tags: ['EUCOM', 'EUCOM-CONPLAN'],
    alert: false,
  },
  {
    title: 'EUCOM IC Report',
    tags: ['EUCOM', 'EUCOM-IC Report'],
    alert: false,
  },
  {
    title: 'INDOPACOM',
    tags: ['INDOPACOM'],
    alert: false,
  },
  {
    title: 'INDOPACOM - OPLAN',
    tags: ['INDOPACOM', 'EUCOM-OPLAN'],
    alert: false,
  },
  {
    title: 'INDOPACOM - CONPLAN',
    tags: ['INDOPACOM', 'EUCOM-CONPLAN'],
    alert: false,
  },
  {
    title: 'INDOPACOM IC Report',
    tags: ['INDOPACOM', 'EUCOM-IC Report'],
    alert: false,
  },
  {
    title: 'NORTHCOM',
    tags: ['NORTHCOM'],
    alert: false,
  },
  {
    title: 'NORTHCOM - OPLAN',
    tags: ['NORTHCOM', 'NORTHCOM-OPLAN'],
    alert: false,
  },
  {
    title: 'NORTHCOM - CONPLAN',
    tags: ['NORTHCOM', 'NORTHCOM-CONPLAN'],
    alert: false,
  },
  {
    title: 'NORTHCOM IC Report',
    tags: ['NORTHCOM', 'NORTHCOM-IC Report'],
    alert: false,
  },
  {
    title: 'SOUTHCOM',
    tags: ['SOUTHCOM'],
    alert: false,
  },
  {
    title: 'SOUTHCOM - OPLAN',
    tags: ['SOUTHCOM', 'SOUTHCOM-OPLAN'],
    alert: false,
  },
  {
    title: 'SOUTHCOM - CONPLAN',
    tags: ['SOUTHCOM', 'SOUTHCOM-CONPLAN'],
    alert: false,
  },
  {
    title: 'SOUTHCOM IC Report',
    tags: ['SOUTHCOM', 'SOUTHCOM-IC Report'],
    alert: false,
  },
  {
    title: 'SPACECOM',
    tags: ['SPACECOM'],
    alert: false,
  },
  {
    title: 'SPACECOM - OPLAN',
    tags: ['SPACECOM', 'SPACECOM-OPLAN'],
    alert: false,
  },
  {
    title: 'SPACECOM - CONPLAN',
    tags: ['SPACECOM', 'SPACECOM-CONPLAN'],
    alert: false,
  },
  {
    title: 'SPACECOM IC Report',
    tags: ['SPACECOM', 'SPACECOM-IC Report'],
    alert: false,
  },
  {
    title: 'STRATCOM',
    tags: ['STRATCOM'],
    alert: false,
  },
  {
    title: 'STRATCOM - OPLAN',
    tags: ['STRATCOM', 'STRATCOM-OPLAN'],
    alert: false,
  },
  {
    title: 'STRATCOM - CONPLAN',
    tags: ['STRATCOM', 'STRATCOM-CONPLAN'],
    alert: false,
  },
  {
    title: 'STRATCOM IC Report',
    tags: ['STRATCOM', 'STRATCOM-IC Report'],
    alert: false,
  },
  {
    title: 'SOCOM',
    tags: ['SOCOM'],
    alert: false,
  },
  {
    title: 'TRANSCOM',
    tags: ['TRANSCOM'],
    alert: false,
  },
]

export const sampleStatistics = [
  {
    title: 'Assignments',
    value: 47,
  },
  {
    title: 'Equipment',
    value: 1875,
  },
  {
    title: 'Platforms',
    value: 32,
  },
  {
    title: 'S Four',
    value: 4,
  },
  {
    title: 'Stat Five',
    value: 500,
  },
  {
    title: 'Assignments',
    value: 47,
  },
  {
    title: 'Equipment',
    value: 1875,
  },
  {
    title: 'Platforms',
    value: 32,
  },
  {
    title: 'Statistic Four',
    value: 4,
  },
  {
    title: 'Stat Five',
    value: 500,
  },
  {
    title: 'Assignments',
    value: 47,
  },
  {
    title: 'Equipment',
    value: 1875,
  },
  {
    title: 'Platforms',
    value: 32,
  },
  {
    title: 'Statistic Four',
    value: 4,
  },
  {
    title: 'Stat Five',
    value: 500,
  },
  {
    title: 'Assignments',
    value: 47,
  },
  {
    title: 'Equipment',
    value: 1875,
  },
  {
    title: 'Platforms',
    value: 32,
  },
  {
    title: 'Statistic Four',
    value: 4,
  },
  {
    title: 'Stat Five',
    value: 500000000,
  },
]
