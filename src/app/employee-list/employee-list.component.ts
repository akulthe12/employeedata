import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent {

  hide = true;
  actionBtn: string ="Save";
  birthday: Date | null = null; 

   
  newEmployeeForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, 
    private api:ApiService,
    
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private http:HttpClient,
    private dialogref:MatDialogRef<EmployeeListComponent>){}
  ngOnInit():void{
    this.newEmployeeForm=this.formBuilder.group(
      {
        firstname:new FormControl('',[Validators.required]),
        lastname:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required,Validators.email]),
        dob:new FormControl('',[Validators.required]),
        gender:new FormControl('',[Validators.required]),
        education:new FormControl('',[Validators.required]),
        company:new FormControl('',[Validators.required]),
        experience:new FormControl('',[Validators.required]),
        package:new FormControl('',[Validators.required]),
         
  
      });
      if(this.editData)
      {
        this.actionBtn="Update";
        this.newEmployeeForm.controls['firstname'].setValue(this.editData.firstname);
        this.newEmployeeForm.controls['lastname'].setValue(this.editData.lastname);
        this.newEmployeeForm.controls['email'].setValue(this.editData.email);
        this.newEmployeeForm.controls['dob'].setValue(this.editData.dob);
        this.newEmployeeForm.controls['gender'].setValue(this.editData.gender);
        this.newEmployeeForm.controls['education'].setValue(this.editData.education);
        this.newEmployeeForm.controls['company'].setValue(this.editData.company);
        this.newEmployeeForm.controls['experience'].setValue(this.editData.experience);
        this.newEmployeeForm.controls['package'].setValue(this.editData.package);

       
      }
  }
  save(){
    if(!this.editData)
    {
      if(this.newEmployeeForm.valid){
        this.api.postEmployee(this.newEmployeeForm.value).subscribe({
          next:(res)=>{
            alert("Employee details added sucessfully");
            this.newEmployeeForm.reset();
            this.dialogref.close('dialog');
          },
          error:()=>
          {
            alert("Error while adding the details")
          }
          
        })
      }
    }else{
        this.updateDetails()
      }
    }
    

 updateDetails()
 {
   this.api.putDetails(this.newEmployeeForm.value,this.editData.id)
   .subscribe({
    next:(res)=>
    {
      alert("Details updated Successfully");
      this.newEmployeeForm.reset();
      this.dialogref.close('update');
    },
    error:()=>{
      alert("Error while updating the records!!")
    }
   })
 }
 onDateSelected(event: any) {
  const inputDate = moment(event.target.value, 'YYYY-MM-DD', true);
    if (inputDate.isValid()) {
      this.birthday = inputDate.toDate();
    } else {
      alert('Invalid date format. Please enter a date in the format YYYY-MM-DD.');
    }
  }
 }





