import { UserService } from 'src/app/_services/user.service';
import { ActivityService } from './../../_services/activity.service';
import { RoomService } from 'src/app/_services/room.service';
import { Room } from './../../_models/Room';
import { ReservationService } from './../../_services/reservation.service';
import { Reservation } from './../../_models/Reservation';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { Activity } from 'src/app/_models/Activity';
import { User } from 'src/app/_models/User';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-gestion-reservation',
  templateUrl: './gestion-reservation.component.html',
  styleUrls: ['./gestion-reservation.component.sass']
})
export class GestionReservationComponent implements OnInit {
  showAdminBoard = false;
  showReceptionBoard = false;
  isLoggedIn = false;
  reservations: any[];
  user1: User= new User();
  id: number ;
  registerFormUser: FormGroup;
  reservation: Reservation= new Reservation();
  rooms: Room[];
  room:number ;
  activity: number;
  user: number ;
  selectedRoom: Room;
  activities: Activity[];
  users: User[];
  isSubmitted = false;
 // roles: string[] = [];
 private roles: string[];

    modalRef: any;
  submitted: false;

  url: any;
  p: number = 1;
  heading = 'Liste des Reservations';
  subheading = 'These can be used with other components and elements to create stunning and unique new elements for your UIs.';
  icon = 'pe-7s-note2 icon-gradient bg-sunny-morning';
  constructor(private reservationService: ReservationService, private modalService: BsModalService,
     private formBuilder: FormBuilder, private roomService: RoomService, private activityService: ActivityService,
     private userService: UserService, private tokenStorage:TokenStorageService) { 
    this.registerFormUser = this.formBuilder.group({
      room: [null, Validators.required], 
      adult_number: [null, Validators.required], 
      enfant_number: [null, Validators.required],
      arrival: [null, Validators.required,],
      departure: [null, Validators.required,],
      name: [null, Validators.required,],
      email: [null, Validators.required,],
      username: [null, Validators.required,],
      password: [null, Validators.required,],

  

     // status: true


    })
  }
  get u() { return this.registerFormUser.controls }

  changeRoom(e: any) {
    this.room= e.target.value, 
    console.log(this.room);
    this.roomService.detailsRoom(this.room).subscribe(response =>{console.log(response)
    this.selectedRoom = response; 
   // if(this.selectedRoom.status == true ){
   // alert("room reserved");
    //this.registerFormUser.patchValue({
    //  room: ""
   // }
   // )
   // }
    })
    console.log(this.room)
  
  }
  changeActivity(e: any) {
    this.activity= e.target.value, 
    console.log(this.activity);
  
  }
  changeUser(e: any) {
    this.user= e.target.value, 
    console.log(this.user);
  
  }
 
  ngOnInit() {
   // const user = this.tokenStorage.getUser();
   // this.roles = user.roles;
   this.isLoggedIn = !!this.tokenStorage.getToken();

   if (this.isLoggedIn) {
     const user = this.tokenStorage.getUser();
     this.roles = user.roles;

     this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
     this.showReceptionBoard = this.roles.includes('ROLE_RECEPTION');

 }
   
  this.reservationService.getReservation().subscribe(result =>{this.reservations=result;
    //if(this.roles.includes('ROLE_CLIENT')){
      this.userService.getUser().subscribe(result =>{
         this.users= result;

         console.log(this.activities);
         let idToNumberOfItem = {};
         this.users.forEach(
           ({ id, name }) => (idToNumberOfItem[id] = name)
         );

         this.reservations.forEach(
           (item) => (item["name"] = idToNumberOfItem[item.user])
         );
         console.log(this.reservations)
      })
   // }

      // this.rooms=this.roomService.getFreeRoom();
      //this.activities= this.activityService.getActivity();
  })
  this.roomService.getFreeRoom().subscribe(res =>{this.rooms= res})
  this.activityService.getActivity().subscribe(res =>{this.activities= res})

  
   //if(this.userService.getUser().roles  == "ROLE_CLIENT"){

  
  //  this.users= this.userService.getUser();
 // }
  }
  reloadData() {
    
    console.log(this.reservation);
  }
  // saveUser() {
  //   this.userService
  //   .createUser(this.user).subscribe(data => {
  //     console.log(data)
  //     this.user1 = new User();
     
  //   }, 
  //   error => console.log(error));

  // }

  
  onSubmit(){
    this.save();   
    this.onReset()
   
  }
  save() {
this.reservation.room=this.room;
this.reservation.activity= this.activity;
this.reservation.user= this.user;
//this.user1.id= this.user;
    this.reservationService
    .createReservation(this.reservation, this.room , this.activity , this.user).subscribe(data => {
      console.log(data);
      console.log(this.user);
     
    }, 
    error => console.log(error));
  }


  AjoutReservation(){
   // this.saveReservation();
    }
    // saveReservation(){
    //   this.reservation.room=this.room;
    // this.reservation.activity= this.activity;
    // //this.reservation.user= this.user;
    // //this.user1.id= this.user;
    //     this.reservationService
    //     .createReservationAdmin2(this.reservation, this.room , this.activity ).subscribe(data => {
    //       console.log(data);
    //       console.log(this.user);
         
    //     }, 
    //     error => console.log(error));
    // }
    
    confirmerReservation(id){
     if(confirm("Are you sure to confirm this reservation de l'id: "+ id)) {
 this.reservationService.confirmerReservation(id, this.reservation).subscribe(data =>{
  console.log(data);
  this.reservation = new Reservation();
}, error =>console.log(error));

}    
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
  updateReservation(){

  }

  deleteReservation(id: number){
    this.reservationService.deleteReservation(id)
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();

        },
        error => console.log(error));
  }
}
