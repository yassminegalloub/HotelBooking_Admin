import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../_models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://localhost:8080/room/';

  constructor(private http: HttpClient) { }

  getRoom(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl + 'allRoom')
  }
  CreateRoom(data: { name: any; details: any; price: any; },file:File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('rooms',JSON.stringify(data));
    return this.http.post(`${this.baseUrl}addRoom`, formData);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteRoom/${id}`);
  }

  updateRoom(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}editRoom/${id}`, value);
  }
 
  detailsRoom(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}detailsRoom/${id}`);
  }
  getFreeRoom(): Observable<Room[]>{
    return this.http.get<Room[]>(this.baseUrl + 'freeRoom')

  }
  nbrRoomReserved(): Observable<any> {
    return this.http.get(this.baseUrl + 'nbrRoomReserved')
  }

  nbrRoomFree(): Observable<any> {
    return this.http.get(this.baseUrl + 'nbrRoomFree')
  }
  
 getFile(name : String): Observable<HttpEvent<Blob>> {
    const url = `${this.baseUrl+"/file/load"}/${name}`
		return this.http.get(url , {
      reportProgress: true ,
      observe: 'events' ,
      responseType : 'blob'
    });
	}
}
