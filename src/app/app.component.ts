import { Component } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  BasicStats,
  FsBasic,
  FsStats,
  PlayerBasicInfo,
  PlayerMoreInfo,
} from './interfaces/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

interface Auth {
  email: string;
  password: string;
}
interface CsvData {
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'csv-reader';
  emailCollection: Auth[] = [];
  playerBasicDetails: any[] = [];
  fsBasicDetails: any[] = [];
  playerAdditionalDetails: any[] = [];
  csvRecords: CsvData[] = [];
  images: string[] = [];
  constructor(
    private ngxCsvParser: NgxCsvParser,
    public ngAuth: AngularFireAuth,
    private ngFirestore: AngularFirestore
  ) {}

  async fileChangeListener($event: any): Promise<any> {
    const files = $event.srcElement.files;
    this.csvRecords = await this.ngxCsvParser
      .parse(files[0], { header: true, delimiter: ',' })
      .toPromise()
      .catch((error) => error);
    this.csvRecords.forEach((record: CsvData) => {
      this.emailCollection.push({
        email: record.email,
        password: record.birthday,
      } as Auth);
      this.playerBasicDetails.push({
        name: record.name,
        team: null,
      });
      this.fsBasicDetails.push({
        name: record.name,
      });
    });
    for (let i = 0; i < this.emailCollection.length; i++) {
      console.log(this.emailCollection[i]);
      const userAccount = await this.ngAuth
        .createUserWithEmailAndPassword(
          this.emailCollection[i].email,
          this.emailCollection[i].password
        )
        .catch((err) => err);
      const UID = userAccount.user.uid;
      const newPlayerStats: BasicStats = {
        apps: 0,
        g: 0,
        w: 0,
        cards: 0,
        l: 0,
      };
      const newFsStats: FsStats = {
        sk_lvl: 0,
        br_colb: [],
        top_vids: [],
        tr_a: 0,
        tr_w: 0,
        tr_u: 0,
      };
      this.ngFirestore
        .collection('players')
        .doc(UID)
        .set(this.playerBasicDetails[i])
        .catch((error) => error);
      this.ngFirestore
        .collection('freestylers')
        .doc(UID)
        .set(this.fsBasicDetails[i])
        .catch((error) => error);
      this.ngFirestore
        .collection(`players/${UID}/additionalInfo`)
        .doc('statistics')
        .set(newPlayerStats)
        .catch((error) => error);
      this.ngFirestore
        .collection(`freestylers/${UID}/additionalInfoFs`)
        .doc('statistics')
        .set(newFsStats)
        .catch((error) => error);
    }
    console.log('accounts created!');
    // console.log(this.emailCollection);
    // console.log(this.playerBasicDetails);
  }
}
