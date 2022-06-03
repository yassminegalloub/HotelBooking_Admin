import { User } from './../_models/User';
import { Activity } from 'src/app/_models/Activity';
import { Room } from './../_models/Room';

export class Reservation {
    id: number;
    adult_number: number;
    enfant_number: number;
    room: number;
    arrival: Date;
    departure: Date;
    activity: number;
    user: number;
    is_reserved: boolean; 

}