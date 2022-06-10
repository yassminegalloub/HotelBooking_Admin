import { ActivityService } from './../../_services/activity.service';
import { RoomService } from 'src/app/_services/room.service';
import { ReservationService } from './../../_services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  heading = 'Dashboard';
  subheading = 'These can be used with other components and elements to create stunning and unique new elements for your UIs.';
  icon = 'pe-7s-wallet icon-gradient bg-plum-plate';
  nbrReservations:number;
  nbrRoomsFree: number ;
  nbrRoomsReserved: number ;
  nbrActivities: number ;
  nbrUsers: number ;
  constructor(private reservationService: ReservationService, private roomService: RoomService, private activityService : ActivityService, private userService: UserService) { }

  ngOnInit(){

    this.reservationService.nbrReservation().subscribe((res) => {
      console.log(res);
      this.nbrReservations = res;
    });

    this.roomService.nbrRoomFree().subscribe((res1)=> {
      console.log(res1);
      this.nbrRoomsFree= res1;
    });
    this.roomService.nbrRoomReserved().subscribe((res1)=> {
      console.log(res1);
      this.nbrRoomsReserved= res1;
    });
    this.activityService.nbrActivity().subscribe((res2)=>{
      console.log(res2);
      this.nbrActivities=res2;
    });
    this.userService.nbrUser().subscribe((res2)=>{
      console.log(res2);
      this.nbrUsers= res2;
    });
   
  }

}
