import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formdata = {name:"",email:"",password:""}
  submit = false  
  errorMessage=""
  loading=false
  
  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){
    console.log(this.formdata)
    this.loading=true
    this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken)
        this.auth.canAuthenticate();
      },
      error:data=>{
        if(data.error.error.message=="INVALID_EMAIL"){
          this.errorMessage="Invalid Email"
        }
        else if(data.error.error.message=="EMAIL_EXISTS"){
          this.errorMessage="Email already exists"
        }
      }
    }).add(()=>{
      this.loading=false
    })
    ;
  }
}
