export interface SeasonBasicInfo {
  name: string;
  imgpath: string;
  locCity: string;
  locState: string;
  premium: boolean;
  start_date: Date;
  cont_tour: string[];
  id?: string;
  participants?: number;
  feesPerTeam?: number;
}
export interface SeasonAbout {
  description: string;
  rules: string;
  paymentMethod: 'Online' | 'Offline';
}
export interface SeasonMedia {
  photo_1: string;
  photo_2: string;
  photo_3: string;
  photo_4: string;
  photo_5: string;
}
export interface SeasonStats {
  FKC_winner?: string;
  FPL_winner?: string;
  totGoals: number;
  awards: string;
}
export interface SeasonParticipants {
  tid: string;
  tname: string;
  tlogo: string;
}
