import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RestaurantComponent } from '../restaurant.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: any
  editRestaurant: {}
  errors=[]
  nameError = false

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _restaurantComponent: RestaurantComponent
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getRes()
    this.editRestaurant = {name: "", cuisine: ""}
  }

  getRes(){
    this._httpService.getOne(this.id)
      .subscribe((data:any) => {
        if(data.message == "success"){
          this.editRestaurant = data['result']
        }
        else{
          this.goHome()
        }
      })
  }

  onSubmit(){
    this._httpService.editOne(this.id, this.editRestaurant)
      .subscribe((data:any) => {
        console.log(data)
        if(data.message == "success"){
          this.goHome()
        }
        if(data.driver == true){
          this.errors = []
          this.nameError = true
        }
        else{
          this.errors=[]
          let error_keys = Object.keys(data['errors']);
          for (var error_key of error_keys) {
            this.errors.push(data['errors'][error_key]['message'])
          }
        }
      })
  }

  goHome(){
    this._router.navigate(['/restaurant']);
    this._restaurantComponent.getAllRes();
  }

}
