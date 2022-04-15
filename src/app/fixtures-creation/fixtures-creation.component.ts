import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxCsvParser } from 'ngx-csv-parser';
import { CsvDataFixtures } from '../interfaces/csv.model';
import {
  MatchFixture,
  MatchFixtureOverview,
  MatchStats,
} from '../interfaces/match.model';
import firebase from 'firebase/app';
@Component({
  selector: 'app-fixtures-creation',
  templateUrl: './fixtures-creation.component.html',
  styleUrls: ['./fixtures-creation.component.scss'],
})
export class FixturesCreationComponent implements OnInit {
  csvRecords: CsvDataFixtures[] = [];

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
    this.csvRecords.forEach(async (record: CsvDataFixtures) => {
      // code here
      const AllPromises: Promise<any>[] = [];
      const mid = this.ngFirestore.createId();
      const fixture: MatchFixture = {
        id: mid,
        date: firebase.firestore.Timestamp.fromDate(new Date(record.date)),
        concluded: record.concluded === 'TRUE',
        teams: [record.teamA, record.teamB],
        logos: record.logos.split(','),
        season: record.season,
        premium: record.premium === 'TRUE',
        type: record.type,
        locCity: record.locCity,
        locState: record.locState,
        score: record.score.split(',').map((value) => +value),
        stadium: record.stadium,
      };
      const fixtureMore: MatchFixtureOverview = {
        ref: record.ref,
        ref_phno: +record.ref_phno,
        stadium: record.stadium,
        desc: record.desc,
        organizer: record.organizer,
        org_phno: +record.org_phno,
        refresh: record.refresh === 'TRUE',
        addr_line: record.addr_line,
      };
      const stats: MatchStats = {
        homeScore: +record.homeScore,
        awayScore: +record.awayScore,
        penalties: record.penalties === 'TRUE',
        matchEndDate: firebase.firestore.Timestamp.fromDate(
          new Date(record.matchEndDate)
        ),
        mid,
      };
      AllPromises.push(
        this.ngFirestore.collection('allMatches').doc(mid).set(fixture)
      );
      AllPromises.push(
        this.ngFirestore
          .collection(`allMatches/${mid}/additionalInfo`)
          .doc('matchReport')
          .set(stats)
      );
      AllPromises.push(
        this.ngFirestore
          .collection(`allMatches/${mid}/additionalInfo`)
          .doc('matchOverview')
          .set(fixtureMore)
      );
      const success = Promise.all(AllPromises);
      // const success = true;
      if (success) {
        console.log(`fixtures ${'abc'} created!`);
      }
    });
  }
}
