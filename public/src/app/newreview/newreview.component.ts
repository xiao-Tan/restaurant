import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-newreview',
  templateUrl: './newreview.component.html',
  styleUrls: ['./newreview.component.css']
})
export class NewreviewComponent implements OnInit {

  id:any
  name:any
  thisres:any
  newReview:any
  errors=[]

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.newReview = {customer: "", star: 5, description: ""}
  }

  get_res(){
    this._httpService.getOne(this.id)
      .subscribe((data:any) => {
        if(data.message == "success"){
          this.thisres = data['result']
          this.name = this.thisres.name
        }
        else{
          this.goAllReviews()
        }
      })
  }

  onSubmit(){
    this._httpService.addOneReview(this.id, this.newReview)
      .subscribe((data:any) => {
        this.newReview = {customer: "", star: 5, description: ""}
        if(data.message == "success"){          
          this.goAllReviews()
        }
        else{
          this.errors = []
          let error_keys = Object.keys(data['errors']['reviews']['errors']);
          for (var error_key of error_keys) {
            this.errors.push(data['errors']['reviews']['errors'][error_key]['message'])
          }
        }
      })
  }

  goAllReviews(){
    this._router.navigate(['/restaurant', this.id]);
  }

}
