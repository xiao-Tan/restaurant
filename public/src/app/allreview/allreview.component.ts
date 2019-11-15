import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-allreview',
  templateUrl: './allreview.component.html',
  styleUrls: ['./allreview.component.css']
})
export class AllreviewComponent implements OnInit {

  id: any
  thisres:any
  reviews:[]
  name:any

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getallReviews()
  }

  getallReviews(){
    this._httpService.getOne(this.id)
      .subscribe((data:any) => {
        if(data.message == "success"){
          this.thisres = data['result']
          this.reviews = this.thisres['reviews']
          this.name = this.thisres.name
        }
        else{
          this.goHome()
        }
      })
  }

  goHome(){
    this._router.navigate(['/']);
  }


}
