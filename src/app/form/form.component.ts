import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  registerForm: FormGroup;
  fname:string='';
    lname:string='';
    email1:string='';
    pas1:string='';
  submitted = false;
  

  constructor(private formBuilder: FormBuilder, private httpobj:HttpClient) {

   }

  ngOnInit(): void {
   
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });

  }

 
 // convenience getter for easy access to form fields
 get f() { return this.registerForm.controls; }

 onSubmit() {
  
    var obj:any={};
     obj.firstName = this.fname;
     obj.lastName = this.lname;
     obj.email = this.email1;
     obj.password = this.pas1;

     
     this.submitted = true;
       // stop here if form is invalid
       if (this.registerForm.invalid) {
           return;
       }

       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))

       // console.log(obj);
       var url:string='http://localhost:3000/reactive';
       this.httpobj.post(url, obj).subscribe((data:any)=>{
             console.log(data);
       });
       
     }

}
