import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurants:any
  canDelete = true
  // timeWhenLoad: any

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllRes()
    // this.getTime()
  }

  getAllRes(){
    this._httpService.getAll()
      .subscribe(data => {
        this.restaurants = data['result']
      })
  }

  // getTime(){
  //   this.timeWhenLoad = new Date()
  //   console.log(this.timeWhenLoad)
  // }

  delete(id){
    this._httpService.deleteOne(id)
      .subscribe(data => {
        this.getAllRes()
      })
  }
}
