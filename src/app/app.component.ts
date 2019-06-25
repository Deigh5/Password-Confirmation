import { Component } from '@angular/core';
import {FormBuilder,Validator, Validators, FormControl, FormGroup, ValidatorFn} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Password Validation';

  passwordForm
  message: string
  cPassword
  

  constructor (public formBuilder:FormBuilder)
  {
    this.passwordForm = formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/)]],
      cPassword:["",[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*[0-9])(?=.{8,})/)]]
    })

    const confirmPassControl = new FormControl(
      '',{validators:samePassword(this.passwordForm,'password')})

      this.passwordForm.addControl('cPassword',confirmPassControl)

      function samePassword(group:FormGroup, controlName: string): ValidatorFn
      {
        return (control: FormControl) => {
          const myValue = control.value;
          const compareValue = group.controls[controlName].value

          return (myValue === compareValue) ? null : {valueDifferentFrom:controlName}
        }
      }
  }

  // login(password,cPassword)
  // {
  //   if(password!=cPassword)
  //   {
  //     alert("Password does not match.")
  //   }
  //   else

  //   alert("Logged in.")
  // }
}