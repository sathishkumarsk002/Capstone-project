import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ManagementData } from './dashboard.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue!: FormGroup
  managementModelObj: ManagementData = new ManagementData
  allManagementData: any;
  showAdd!: boolean
  showbtn!: boolean;
  constructor(private fromBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.fromBuilder.group({
      name: [''],
      email: [''],
      domain: [''],
      experience: [''],
      location: ['']
    })
    this.getAllData()
  }
  clickAddManagement() {
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }



  addManagement() {
    this.managementModelObj.name = this.formValue.value.name;
    this.managementModelObj.email = this.formValue.value.email;
    this.managementModelObj.domain = this.formValue.value.domain;
    this.managementModelObj.experience = this.formValue.value.experience;
    this.managementModelObj.location = this.formValue.value.location;

    this.api.postManagement(this.managementModelObj)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert("Management Records Added Sucesfull");
          let ref = document.getElementById('clear')
          ref?.click();
          this.formValue.reset()
          this.getAllData();
        },
        error : err => {
          alert("something went wrong")
        }
      })
  }
  //get data ku itha use pannurom
  getAllData() {
    this.api.getManagement().subscribe(res => {
      this.allManagementData = res;
    })
  }

  //delete ku itha use pannurom
  deleteManagement(data: any) {
    this.api.deleteManagement(data.id).subscribe(_res => {
      alert("Management records are deleted")
      this.getAllData();
    })
  }

  //edit details

  onEditManagement(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.managementModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['domain'].setValue(data.domain);
    this.formValue.controls['experience'].setValue(data.experience);
    this.formValue.controls['location'].setValue(data.location);
  }

  updateManagement() {
    this.managementModelObj.name = this.formValue.value.name;
    this.managementModelObj.email = this.formValue.value.email;
    this.managementModelObj.domain = this.formValue.value.domain;
    this.managementModelObj.experience = this.formValue.value.experience;
    this.managementModelObj.location = this.formValue.value.location;

    this.api.updateManagement(this.managementModelObj, this.managementModelObj.id).subscribe(_res => {
      alert("New deatils are Updated");
      let ref = document.getElementById('clear')
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    })

  }
}



