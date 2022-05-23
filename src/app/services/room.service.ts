import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'http://localhost:8080/room/';

  constructor(private http: HttpClient) { }

  getRoom(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl + 'allRoom')
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
