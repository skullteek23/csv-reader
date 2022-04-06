import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxCsvParser } from 'ngx-csv-parser';
import { Auth, CsvDataPlayer } from '../interfaces/csv.model';
import { BasicStats, FsStats } from '../interfaces/user.model';

@Component({
  selector: 'app-user-account-creation',
  templateUrl: './user-account-creation.component.html',
  styleUrls: ['./user-account-creation.component.scss'],
})
export class UserAccountCreationComponent implements OnInit {
  emailCollection: Auth[] = [];
  playerBasicDetails: any[] = [];
  fsBasicDetails: any[] = [];
  playerAdditionalDetails: any[] = [];
  csvRecords: CsvDataPlayer[] = [];
  images: string[] = [];

  ngOnInit(): void {}
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
    this.csvRecords.forEach((record: CsvDataPlayer) => {
      this.emailCollection.push({
        email: record.email,
        password: record.birthday,
        name: record.name,
      } as Auth);
      this.playerBasicDetails.push({
        name: record.name,
        team: null,
      });
      this.fsBasicDetails.push({
        name: record.name,
      });
    });
    // this.emailCollection = this.emailCollection.slice(0, 15);
    for (let i = 0; i < this.emailCollection.length; i++) {
      console.log(this.emailCollection[i]);
      const userAccount: any = await this.ngAuth
        .createUserWithEmailAndPassword(
          this.emailCollection[i].email,
          this.emailCollection[i].password
        )
        .catch((err) => err);
      if (!userAccount || !userAccount.user) {
        continue;
      }
      userAccount.user.updateProfile({
        displayName: this.emailCollection[i].name,
      });
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
