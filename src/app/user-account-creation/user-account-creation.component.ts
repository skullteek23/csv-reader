import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { NgxCsvParser } from 'ngx-csv-parser';
import { Auth, CsvDataPlayer } from '../interfaces/csv.model';
import {
  BasicStats,
  FsStats,
  PlayerBasicInfo,
  PlayerMoreInfo,
} from '../interfaces/user.model';

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
  uids: string[] = [];
  imagesLg: any[] = [];
  transformations = [
    {
      width: 90,
      height: 180,
    },
  ];

  ngOnInit(): void { }
  constructor(
    private ngxCsvParser: NgxCsvParser,
    public ngAuth: AngularFireAuth,
    private ngFirestore: AngularFirestore,
    private ngFunc: AngularFireFunctions,
    private ngStorage: AngularFireStorage
  ) {
    this.getUsers();
  }

  getUsers() {
    this.ngFirestore
      .collection(`players`)
      .get()
      .subscribe((data) => {
        data.docs.forEach((doc) => this.uids.push(doc.id));
        let abc;
        for (const uid of this.uids) {
          abc = this.ngFirestore.firestore.runTransaction((transaction) => {
            const colRef = this.ngFirestore.firestore
              .collection(`players/${uid}/additionalInfo`)
              .doc('otherInfo');
            return transaction.get(colRef).then((doc) => {
              if ((doc.data() as PlayerMoreInfo)?.imgpath_lg) {
                this.imagesLg.push({
                  uid,
                  imgpath_lg: (doc.data() as PlayerMoreInfo)?.imgpath_lg,
                });
              }
            });
          });
        }
        abc.then(() => {
          console.log(this.imagesLg);
          const callable = this.ngFunc.httpsCallable('thumbnailOnReq');
          callable(this.imagesLg)
            .toPromise()
            .then((response) => {
              console.log(response);
              if (response & response.length) {
                localStorage.setItem('response', JSON.stringify(response));
              }
              const final = [];
              this.ngStorage.upload(
                'image_' + response[0].uid,
                response[0].imageFile
              );
              // response.forEach(resp => {
              //   final.push({
              //   })
              // });
            })
            .catch((error) => console.log(error));
        });
      });
  }

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
        rcards: 0,
        ycards: 0,
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
