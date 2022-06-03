import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../_models/Activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private baseUrl = 'http://localhost:8080/Activity/';
  constructor(private http: HttpClient) { }

getActivity(): Observable<Activity[]> {

  return this.http.get<Activity[]>(this.baseUrl + "allActivity")
}
nbrActivity(): Observable<any> {
  return this.http.get(this.baseUrl + 'nbrActivity')
}
CreateActivity(data: { name: any; activity_schedule: any; promotion: any; available:any },file:File): Observable<Object> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('activities',JSON.stringify(data));
  return this.http.post(`${this.baseUrl}newActivity`, formData);
}
deleteActivity(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}DeleteActivity/${id}`);
}
updateAvailable(id: number, value: any): Observable<Object> {
  return this.http.put(`${this.baseUrl}editAvailable/${id}`, value);
}
updateNotAvailable(id: number, value: any): Observable<Object> {
  return this.http.put(`${this.baseUrl}editNotAvailable/${id}`, value);
}

detailsActivity(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}detailsActivity/${id}`);
}
updateActivity(id: number, value: any): Observable<Object> {
  return this.http.put(`${this.baseUrl}editActivity/${id}`, value);
}

}
