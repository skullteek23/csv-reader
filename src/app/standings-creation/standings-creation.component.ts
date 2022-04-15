import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxCsvParser } from 'ngx-csv-parser';
import { CsvStandingsLeague } from '../interfaces/csv.model';
import { LeagueTableModel } from '../interfaces/others.model';

@Component({
  selector: 'app-standings-creation',
  templateUrl: './standings-creation.component.html',
  styleUrls: ['./standings-creation.component.scss'],
})
export class StandingsCreationComponent implements OnInit {
  csvRecords: CsvStandingsLeague[] = [];

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
    const data: LeagueTableModel[] = [];
    let seasonId = null;
    this.csvRecords.forEach(async (record: CsvStandingsLeague) => {
      // code here
      seasonId = record.sid;
      data.push({
        tData: { timgpath: record.timgpath, tName: record.tName },
        w: +record.w,
        d: +record.d,
        l: +record.l,
        gf: +record.gf,
        ga: +record.ga,
      });
    });
    if (!seasonId) {
      return;
    }
    this.ngFirestore
      .collection('leagues')
      .doc(seasonId)
      .set({ ...data })
      .then((res) => {
        console.log(`${data.length} standings created!`);
      });
  }
}
