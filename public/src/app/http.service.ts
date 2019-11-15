import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get('/apis');
  }

  getOne(id: any){
    return this._http.get(`/api/${id}`)
  }

  addOneRes(newRes){
    return this._http.post('/api', newRes)
  }

  editOne(id, edit_Res){
    return this._http.put(`/api/${id}`, edit_Res)
  }

  deleteOne(id){
    return this._http.delete(`/api/${id}`)
  }

  addOneReview(id, newReview){
    return this._http.post(`/api/${id}`, newReview)
  }
}
