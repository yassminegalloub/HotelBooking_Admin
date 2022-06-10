import { Reservation } from './../_models/Reservation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8080/reservation/';

  constructor(private http: HttpClient) { }
  getReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl + 'allReservation')
  }
  createReservation(Reservation: Object, id_room:number, id_activity: number,id_user: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}ReservationAdmin/${id_room}/${id_activity}/${id_user}`, Reservation);
  }

  createReservationAdmin2(Reservation: Object, id_room:number, id_activity: number): Observable<Object> {
    return this.http.post(`${this.baseUrl}ReservationAdmin2/${id_room}/${id_activity}`, Reservation);
  }

  
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteReservation/${id}`);
  }

  confirmerReservation(id: number , value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}confirmerButton/${id}`, value);
  }
  nbrReservation(): Observable<any> {
    return this.http.get(this.baseUrl + 'nbrReservation')
  }
}
