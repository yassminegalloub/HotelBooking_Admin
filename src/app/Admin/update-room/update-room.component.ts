import { RoomService } from 'src/app/_services/room.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/_models/Room';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.sass']
})
export class UpdateRoomComponent implements OnInit {
  id: number;
  room: Room= new Room();
  registerFormUser: FormGroup;
  modalRef: any;
  url: any;
  submitted: false;
  constructor(  private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService) { }

  ngOnInit(  ) {
    this.room= new Room();
    this.id= this.route.snapshot.params['id'];
    this.roomService.detailsRoom(this.id).subscribe(data=>{
      console.log(data)
      this.room.name_room = data.name_room;
      this.room.details= data.details;
      this.room.price= data.price;
      this.room.fileURL= data.file;
      this.room.fileURL= this.url;
console.log(this.url)
    }, error => console.log(error));
    

  }


  updateRoom() {
    this.roomService.updateRoom(this.id, this.room).subscribe(data =>{
      console.log(data);
      console.log();
      this.room = new Room();
    }, error =>console.log(error));
  }
  onSubmit() {
    this.updateRoom();  
    this.reloadPage();  
  }
  reloadPage(): void {
    window.location.reload();
  }

  onReset() {
    this.submitted = false;
    this.registerFormUser.reset();
    this.modalRef.hide()
  }

}
