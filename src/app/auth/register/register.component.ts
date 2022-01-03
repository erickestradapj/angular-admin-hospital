import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Erick Estrada', Validators.required],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [false, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  public createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm);
    console.log(this.registerForm.value);
    // console.log(this.registerForm.get('name')?.invalid);

    if (this.registerForm.valid) {
      console.log('Send form...');
    } else {
      console.log('Form incorrect');
    }
  }

  public fieldNotValid(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }
}
