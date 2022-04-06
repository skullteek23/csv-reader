import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxCsvParser } from 'ngx-csv-parser';
import { CsvDataGround, CsvDataFixtures } from '../interfaces/csv.model';
import {
  GroundBasicInfo,
  GroundMoreInfo,
  GroundPrivateInfo,
} from '../interfaces/ground.model';
import firebase from 'firebase/app';
@Component({
  selector: 'app-ground-creation',
  templateUrl: './ground-creation.component.html',
  styleUrls: ['./ground-creation.component.scss'],
})
export class GroundCreationComponent implements OnInit {
  csvRecords: CsvDataGround[] = [];

  ngOnInit(): void {}
  constructor(
    private ngxCsvParser: NgxCsvParser,
    private ngFirestore: AngularFirestore
  ) {}

  async fileChangeListener($event: any): Promise<any> {
    const files = $event.srcElement.files;
    this.csvRecords = await this.ngxCsvParser
      .parse(files[0], { header: true, delimiter: ',' })
      .toPromise()
      .catch((error) => error);
    this.csvRecords.forEach(async (record: CsvDataGround) => {
      // code here
      const gid = this.ngFirestore.createId();
      const grTimings = {
        0: [
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
        ],
        1: [
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
        ],
        2: [
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
        ],
        3: [
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
        ],
        4: [
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
        ],
        5: [
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
        ],
        6: [
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
        ],
      };
      const ground: GroundBasicInfo = {
        name: record.name,
        imgpath: record.imgpath,
        locCity: record.locCity,
        locState: record.locState,
        fieldType: record.fieldType,
        own_type: record.own_type,
        playLvl: record.playLvl,
      };
      const additionalInfo: GroundMoreInfo = {
        parking: record.parking === 'TRUE',
        mainten: record.mainten === 'TRUE',
        goalp: record.goalp === 'TRUE',
        opmTimeStart: firebase.firestore.Timestamp.fromDate(
          new Date(2000, 1, 1, 6)
        ),
        opmTimeEnd: firebase.firestore.Timestamp.fromDate(
          new Date(2000, 1, 1, 21)
        ),
        washroom: record.washroom === 'TRUE',
        foodBev: record.foodBev === 'TRUE',
        avgRating: +record.avgRating,
      };
      const pvt: GroundPrivateInfo = {
        name: record.name,
        locCity: record.locCity,
        locState: record.locState,
        timings: grTimings,
        totAvailHours: +record.totAvailHours,
      };
      if (record.own_type === 'FK' || record.own_type === 'PRIVATE') {
        pvt.signedContractFileLink = record.signedContractFileLink;
      }
      const AllPromises: Promise<any>[] = [];
      AllPromises.push(
        this.ngFirestore.collection('grounds').doc(gid).set(ground)
      );
      AllPromises.push(
        this.ngFirestore
          .collection(`grounds/${gid}/additionalInfo`)
          .doc('moreInfo')
          .set(additionalInfo)
      );
      AllPromises.push(
        this.ngFirestore.collection('groundsPvt').doc(gid).set(pvt)
      );
      // const success = Promise.all(AllPromises);
      const success = true;
      if (success) {
        console.log(`ground ${record.name} created!`);
      }
    });
  }
}
