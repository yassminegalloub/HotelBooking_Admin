import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/Room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-gestion-room',
  templateUrl: './gestion-room.component.html',
  styleUrls: ['./gestion-room.component.sass']
})
export class GestionRoomComponent implements OnInit {
  rooms: Observable<Room[]>;

  constructor(private roomService: RoomService, private httpClient :HttpClient) { }

  ngOnInit() {
    this.rooms=this.roomService.getRoom();
    console.log(this.rooms)
  }

}
