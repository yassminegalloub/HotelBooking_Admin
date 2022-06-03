import { ActivityService } from '../../_services/activity.service';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/_models/Activity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-activity',
  templateUrl: './gestion-activity.component.html',
  styleUrls: ['./gestion-activity.component.sass']
})
export class GestionActivityComponent implements OnInit {
  activities: Observable<Activity[]>;
  registerFormUser: FormGroup;
  activity: Activity= new Activity();
 id: number;
 activite: Activity;
  modalRef: any;
  submitted: false;
  url: any;
  selectedFiles : any;
  heading = 'Liste des  Activités';
  subheading = '';
  icon = 'pe-7s-note2 icon-gradient bg-sunny-morning';
  constructor(private activityService: ActivityService, private modalService: BsModalService,private formBuilder: FormBuilder, private router: Router) { 
    this.registerFormUser = this.formBuilder.group({
      name: [null, Validators.required], 
      activity_schedule: [null, Validators.required],
      promotion: [null, Validators.required,],
      available: [null, Validators.required,]

    })
  }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.activities=this.activityService.getActivity();
  }
  get u() { return this.registerFormUser.controls }

  openModal(template: TemplateRef<any>, fileURL:any) {
    this.url=fileURL;
     this.modalRef = this.modalService.show(template, {
        animated: true,
        backdrop: 'static',
      });
      this.submitted = false;
    }
    save() {
      console.log(this.selectedFiles);
      const data = {
        name :this.registerFormUser.value.name,
        activity_schedule : this.registerFormUser.value.activity_schedule,
        promotion: this.registerFormUser.value.promotion,
        available: true,

      };
      console.log(data);
      this.activityService
      .CreateActivity(data,this.selectedFiles).subscribe(data => {
        console.log(data)
        this.activity = new Activity(); 
      }, 
      error => console.log(error));
    }
    onSubmit(){
      this.save();   
      // stop here if form is invalid
      if (this.registerFormUser.invalid) {
          return;
      }
    }
   onReset() {
     this.submitted = false;
     this.registerFormUser.reset();
     this.modalRef.hide()
   }
 
   selectFile(event:any): void {
     this.selectedFiles = event.target.files[0];
    
   }
   deleteActivity(id: number) {
    this.activityService.deleteActivity(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
      
  }
  updateAvailable(id){
      this.activityService.updateAvailable(id, this.activity).subscribe(data =>{
        console.log(data);
        this.activity = new Activity();
      }, error =>console.log(error));
      console.log(this.activity.available);

      this.reloadData();

   
  }
  updateNotAvailable(id){
    this.activityService.updateNotAvailable(id, this.activity).subscribe(data =>{
      console.log(data);
      this.activity = new Activity();
    }, error =>console.log(error));
    console.log(this.activity.available);

    this.reloadData();

 
}
  updateActivity(id: number){
    this.router.navigate(['updateActivity', id]);
  }
}
