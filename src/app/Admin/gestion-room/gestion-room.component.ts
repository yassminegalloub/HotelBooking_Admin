import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { Room } from 'src/app/_models/Room';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-gestion-room',
  templateUrl: './gestion-room.component.html',
  styleUrls: ['./gestion-room.component.sass']
})
export class GestionRoomComponent implements OnInit {
  rooms: Observable<Room[]>;
  registerFormUser: FormGroup;
  room: Room= new Room();
  p: number = 1;
  modalRef: any;
  submitted: false;
  url: any;
  selectedFiles : any;
  heading = 'Liste des chambres ';
  subheading = '';
  icon = 'pe-7s-key icon-gradient bg-sunny-morning';
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private roomService: RoomService, private httpClient :HttpClient , private router: Router) {
    this.registerFormUser = this.formBuilder.group({
      name_room: [null, Validators.required], 
      details: [null, Validators.required],
      price: [null, Validators.required,]
    })
   }

  ngOnInit() {
    console.log(this.rooms);
    this.reloadData();
  }

  reloadData() {

    this.rooms=this.roomService.getRoom();
  }

  get u() { return this.registerFormUser.controls }

  save() {
    console.log(this.selectedFiles);
    const data = {
      name :this.registerFormUser.value.name_room,
      details : this.registerFormUser.value.details,
      price : this.registerFormUser.value.price,
      status: false
    };
    console.log(data);
    this.roomService
    .CreateRoom(data,this.selectedFiles).subscribe(data => {
      console.log(data)
      this.room = new Room(); 
    }, 
    error => console.log(error));
  }
  onSubmit(){
    this.save();   
    // stop here if form is invalid
    if (this.registerFormUser.invalid) {
        return;
    }

    this. onReset();
    window.location.reload();

  }

  openModal(template: TemplateRef<any>, fileURL:any) {
   this.url=fileURL;
    this.modalRef = this.modalService.show(template, {
       animated: true,
       backdrop: 'static',
     });
     this.submitted = false;
   }
    
  onReset() {
    this.submitted = false;
    this.registerFormUser.reset();
    this.modalRef.hide()
  }

  selectFile(event:any): void {
    this.selectedFiles = event.target.files[0];
   
  }

  updateRoom(id: number){
    this.router.navigate(['updateRoom', id]);
  }
  
  deleteRoom(id: number) {
    this.roomService.deleteRoom(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
      
  }
}
