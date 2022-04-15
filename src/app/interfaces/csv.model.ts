export interface Auth {
  email: string;
  password: string;
  name: string;
}
export interface CsvDataPlayer {
  email: string;
  name: string;
  imgpath: string;
  imgpathDefault: string;
  nickname: string;
  mobile: string;
  city: string;
  state: string;
  playingPosition: string;
  strongerFoot: string;
  birthday: string;
  achievements: string;
  bio: string;
  instagram: string;
}
export interface CsvDataSeason {
  name: string;
  imgpath: string;
  locCity: string;
  locState: string;
  premium: string;
  start_date: string;
  cont_tour: string;
  id: string;
  participants: string;
  feesPerTeam: string;
  description: string;
  rules: string;
  paymentMethod: 'Online' | 'Offline';
  photo_1: string;
  photo_2: string;
  photo_3: string;
  photo_4: string;
  photo_5: string;
  FKC_winner: string;
  FPL_winner: string;
  totGoals: string;
  awards: string;
}
export interface CsvDataFixtures {
  date: string;
  concluded: string;
  teamA: string;
  teamB: string;
  logos: string;
  season: string;
  premium: string;
  type: 'FKC' | 'FCP' | 'FPL';
  locCity: string;
  locState: string;
  score: string;
  tie_breaker: string;
  stadium: string;
  homeScore: string;
  awayScore: string;
  penalties: string;
  matchEndDate: string;
  scorersHome: string;
  scorersAway: string;
  ref: string;
  ref_phno: string;
  desc: string;
  organizer: string;
  org_phno: string;
  refresh: string;
  addr_line;
}
export interface CsvDataGround {
  name: string;
  imgpath: string;
  locCity: string;
  locState: string;
  fieldType: any;
  own_type: any;
  playLvl: any;
  parking: string;
  mainten: string;
  goalp: string;
  washroom: string;
  foodBev: string;
  avgRating: string;
  signedContractFileLink: string;
  totAvailHours: string;
}
export interface CsvStandingsLeague {
  sid: string;
  timgpath: string;
  tName: string;
  p: string;
  w: string;
  d: string;
  l: string;
  gf: string;
  ga: string;
  gd: string;
  pts: string;
}
