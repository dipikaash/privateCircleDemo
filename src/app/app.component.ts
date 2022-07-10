import { Component, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Data {
  id: number;
 date: string;
 name: string;
 entities: number;
 actions: {
  mail: boolean,
  share: boolean,
  edit: boolean,
  delete: boolean
 }
}
interface Detail {
  id: number;
  detail: string[]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public http: HttpClient){}
  title = 'privateCircleDemo';
  headers = ["Date", "List Name", "No. of Entities", "Actions"];
  data: Data[]=[];
  description: string[]=[];
  toggleDetails: boolean= false;
  searchedName: string='';
  filterClicked: boolean = false;
  historyClicked: boolean = false;
  selectedTab= 'list';
  ngOnInit(){
    this.http.get<Data[]>('assets/data.json').subscribe((response)=>{
      this.data = response;
      console.log(this.data);
    });
  }
  
  showDetails(e: any){
      this.http.get<Detail[]>('assets/details.json').subscribe((response)=>{
        this.description=response[e.target.id].detail;
      });
  }
  showList(){
    this.filterClicked = false; 
    this.historyClicked = false;
  }
}
