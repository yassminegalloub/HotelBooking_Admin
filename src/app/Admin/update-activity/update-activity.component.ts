import { ActivityService } from './../../_services/activity.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/_models/Activity';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.sass']
})
export class UpdateActivityComponent implements OnInit {
  id: number;
  activity: Activity;
  registerFormUser: FormGroup;
  modalRef: any;
  url: any;
  submitted: false;
  constructor(private activityService: ActivityService ,  private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.activity= new Activity();
    this.id= this.route.snapshot.params['id'];
    this.activityService.detailsActivity(this.id).subscribe(data=>{
      console.log(data)
      this.activity.name = data.name;
      this.activity.activity_schedule= data.activity_schedule;
      this.activity.promotion= data.promotion;
      this.activity.fileURL= data.file;
      this.activity.fileURL= this.url;
console.log(this.url)
    }, error => console.log(error));
  }
  updateActivity() {
    this.activityService.updateActivity(this.id, this.activity).subscribe(data =>{
      console.log(data);
      console.log();
      this.activity = new Activity();
    }, error =>console.log(error));
  }
  onSubmit() {
    this.updateActivity();  
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
