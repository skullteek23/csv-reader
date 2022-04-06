import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxCsvParser } from 'ngx-csv-parser';
import { CsvDataSeason } from '../interfaces/csv.model';
import {
  SeasonAbout,
  SeasonBasicInfo,
  SeasonMedia,
  SeasonStats,
} from '../interfaces/season.model';
@Component({
  selector: 'app-season-creation',
  templateUrl: './season-creation.component.html',
  styleUrls: ['./season-creation.component.scss'],
})
export class SeasonCreationComponent implements OnInit {
  csvRecords: CsvDataSeason[] = [];

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
    this.csvRecords.forEach(async (record: CsvDataSeason) => {
      // code here
      const sid = this.ngFirestore.createId();
      const newSeason: SeasonBasicInfo = {
        name: record.name,
        imgpath: record.imgpath,
        locCity: record.locCity,
        locState: record.locState,
        premium: record.premium === 'Yes' ? true : false,
        start_date: new Date(record.start_date),
        cont_tour: record.cont_tour.split(','),
        id: sid,
        participants: +record.participants,
        feesPerTeam: record.feesPerTeam ? +record.feesPerTeam : 0,
      };
      const seasonMedia: SeasonMedia = {
        photo_1: record.photo_1,
        photo_2: record.photo_2,
        photo_3: record.photo_3,
        photo_4: record.photo_4,
        photo_5: record.photo_5,
      };
      const about: SeasonAbout = {
        description: record.description,
        rules: record.rules,
        paymentMethod: record.paymentMethod,
      };
      const stats: SeasonStats = {
        FKC_winner: record.FKC_winner ? record.FKC_winner : null,
        FPL_winner: record.FPL_winner ? record.FPL_winner : null,
        totGoals: record.totGoals ? +record.totGoals : 0,
        awards: record.awards ? record.awards : 'No Awards',
      };
      const AllPromises: Promise<any>[] = [];
      AllPromises.push(
        this.ngFirestore.collection('seasons').doc(sid).set(newSeason)
      );
      AllPromises.push(
        this.ngFirestore
          .collection('seasons')
          .doc(sid)
          .collection('additionalInfo')
          .doc('moreInfo')
          .set(about)
      );
      AllPromises.push(
        this.ngFirestore
          .collection('seasons')
          .doc(sid)
          .collection('additionalInfo')
          .doc('media')
          .set(seasonMedia)
      );
      AllPromises.push(
        this.ngFirestore
          .collection('seasons')
          .doc(sid)
          .collection('additionalInfo')
          .doc('statistics')
          .set(stats)
      );
      console.log(stats);
      const success = Promise.all(AllPromises);
      // const success = true;
      if (success) {
        console.log(`season ${record.name} created!`);
      }
    });
  }
}
