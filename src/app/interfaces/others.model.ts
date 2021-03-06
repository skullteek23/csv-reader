import { Timestamp } from '@firebase/firestore-types';
import { GroundPrivateInfo } from './ground.model';
import { SeasonBasicInfo } from './season.model';
export interface heroCallToAction {
  name: string;
  route: string;
}
export interface ShareData {
  share_url: string;
  share_title: string;
  share_desc: string;
  share_imgpath: string;
}
export interface fr {
  id: string;
  name: string;
  nickname: string;
  age: number;
  country: string;
}
export interface StageTable {
  freestyler: fr;
  submissionLink: string;
}
export interface profile {
  name: string;
  designation: string;
  links: {
    linkedin: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  imgpath: string;
}
export interface VEProject {
  name: string;
  email: string;
  phone: number;
  desc: string;
  musicSel: string;
  dur: string;
  raw_dur: string;
  delivery: 'E' | 'N';
  raw_videos: string[];
  photos: string[];
}
export interface LeagueTableModel {
  tData: { timgpath: string; tName: string };
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  p?: number;
  gd?: number;
  rank?: number;
  pts?: number;
}
export interface CommunityPlayTableModel {
  rank: number;
  tData: { timgpath: string; tName: string };
  loc: string;
  cpPts: number;
}
export interface CommunityLeaderboard {
  home: { timgpath: string; tName: string };
  away: { timgpath: string; tName: string };
  stadium: string;
  winner: string;
}
export interface fsLeaderboardModel {
  freestyler: {
    name: string;
    nickname: string;
    locCountry: string;
    imgpath?: string;
  };
  pts: number;
  rank?: number;
}
export interface StageDataModel {
  freestyler: {
    name: string;
    nickname: string;
    age: number;
    country: string;
  };
  subm_link: string;
}
export interface uData {
  uid: any;
  refreshToken: any;
  name: any;
  email: any;
  imgpath: any;
}
export interface logDetails {
  email: string;
  pass: string;
  name?: string;
}
export interface statsIcon {
  icon: string;
  name: string;
  value?: number | string;
}
export interface positionGroup {
  position: string;
  pos_name: string[];
}
export interface matchData {
  date: Timestamp;
  concluded: boolean;
  home: { imgpathLogo: string; name: string };
  away: { imgpathLogo: string; name: string };
  score?: { home: number; away: number };
}
export interface tricks {
  submissionVideo: string;
  trick_no: number;
  trick_status: string;
}
export interface FsTrick {
  trickNo: number;
  trick_name_sh: string;
  trickSkillLvl: number;
  trick_desc: string;
  trickHelpVideo: string;
  userStatus?: number;
}
export interface journeyVideo {
  trickNo: number;
  trick_name_sh: string;
  trickSkillLvl: number;
  trick_desc: string;
  trickHelpVideo: string;
  submissionLink: string;
  userStatus?: number;
}

export interface myContestData {
  cont_id: string;
  lastVideoStatus: 'accept' | 'reject';
  imgpath: string;
  name: string;
  stage: number;
  submission_1?: string;
  submission_2?: string;
  submission_3?: string;
  submission_4?: string;
  submission_5?: string;
}
export interface Stats {
  Appearances: number;
  Wins: number;
  Goals: number;
  Cards: number;
}
export interface StatsFs {
  'Skill Level': number;
  'Journey Tricks Completed': number;
  'Brand Collaborations': number;
  'Freekyk Contests Won': number;
}
export interface StatsTeam {
  'FKC Played': string;
  'FCP Played': string;
  'FPL Played': string;
  Goals: string;
  Wins: string;
  Losses: string;
  'Red cards': string;
  'Yellow cards': string;
  'Goals Conceded': string;
  'Clean Sheets': string;
}
export interface userAddress {
  addr_name?: string;
  addr_line1: string;
  addr_line2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  ph_numb: string;
  id?: string;
}
export interface adminSeasonForm {
  sData: SeasonBasicInfo;
  startDate: Date;
  cont_tour: 'FKC' | 'FCP' | 'FPL';
}
export interface tempTour {
  participantCount: number;
  perTeamPlaying: number;
  tour_type: 'FKC' | 'FPL' | 'FCP';
  startDate: Date;
  isFixturesEmpty?: boolean;
}
export interface CloufFunctionFixtureData {
  sid: string;
  sname: string;
  grounds: GroundPrivateInfo[];
  matches: number;
  startDate: Date;
  oneMatchDur: number;
  tour_type: 'FKC' | 'FPL' | 'FCP';
}
export interface GroundTimings {
  0: [];
  1: [];
  2: [];
  3: [];
  4: [];
  5: [];
  6: [];
}

export interface FilterData {
  defaultFilterPath: string;
  filtersObj: {};
  fetchablefiltersObj?: {};
}
export interface QueryInfo {
  queryItem: string;
  queryValue: string;
  queryComparisonSymbol?:
    | '<='
    | '>='
    | '>'
    | '<'
    | 'array-contains'
    | 'in'
    | '=='
    | 'array-contains-any'
    | 'in'
    | 'not-in'
    | '!=';
}
export interface FeatureSectionContent {
  subHeading: string;
  CTA: {
    text: string;
    link: string;
  };
  desc: string;
}
export interface CommunityNumbersContent {
  heading: string;
  desc: string;
  numbers: {};
}
