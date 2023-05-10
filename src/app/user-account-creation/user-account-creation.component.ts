import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage, } from '@angular/fire/storage';
import { NgxCsvParser } from 'ngx-csv-parser';
import { CsvDataPlayer } from '../interfaces/csv.model';


@Component({
  selector: 'app-user-account-creation',
  templateUrl: './user-account-creation.component.html',
  styleUrls: ['./user-account-creation.component.scss'],
})
export class UserAccountCreationComponent implements OnInit {

  csvRecords: CsvDataPlayer[] = [];

  ngOnInit(): void { }
  constructor(
    private ngxCsvParser: NgxCsvParser,
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private functions: AngularFireFunctions,
    private storage: AngularFireStorage
  ) { }


  async fileChangeListener($event: any): Promise<any> {
    const files = $event.srcElement.files;

    this.csvRecords = await this.ngxCsvParser
      .parse(files[0], { header: true, delimiter: ',' })
      .toPromise()
      .catch((error) => error);

    this.csvRecords.forEach((player: CsvDataPlayer) => {
      console.log(player);
    });
  }
}
