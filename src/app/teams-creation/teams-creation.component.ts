import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxCsvParser } from 'ngx-csv-parser';
import { CsvTeam } from '../interfaces/csv.model';

@Component({
  selector: 'app-teams-creation',
  templateUrl: './teams-creation.component.html',
  styleUrls: ['./teams-creation.component.scss'],
})
export class TeamsCreationComponent implements OnInit {
  csvRecords: CsvTeam[] = [];

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
    this.csvRecords.forEach(async (record: CsvTeam) => {
      // code here
    });
  }
}
