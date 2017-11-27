import { Component, OnInit }      from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './accounts-register.component.html'
  })
  export class AccountsRegisterComponent implements OnInit {
    
    private hide: boolean = true;
    private userRegistrationForm: FormGroup;

    constructor(private authService: AuthService, private formBuilder: FormBuilder,
      private router: Router) {}

    ngOnInit() {
      this.createRegistrationForm();
    }

    private createRegistrationForm() {
      this.userRegistrationForm = this.formBuilder.group({
        username: '',
        email: '',
        password: '',
        passwordVerification: ''
      });
    }

    onSubmit() {

    }
  }