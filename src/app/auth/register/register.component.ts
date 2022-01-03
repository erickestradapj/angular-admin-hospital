import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      name: ['Erick Estrada', Validators.required],
      email: ['test1@test.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      password2: ['123456', Validators.required],
      terms: [true, Validators.required],
    },
    {
      validators: this.samePasswords('password', 'password2'),
    }
  );

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {}

  public createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm);

    if (this.registerForm.invalid) {
      return;
    }

    // Send form...
    this.userService.createUser(this.registerForm.value).subscribe(
      (resp) => {
        console.log('User created...');
        console.log(resp);
      },
      // (e) => console.warn(e.error.msg)
      (e) => Swal.fire('Error', e.error.msg, 'error')
    );
  }

  public fieldNotValid(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * invalidPassword
   */
  public invalidPassword() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  public samePasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ notTheSame: true });
      }

      /*   formGroup.get(pass1Name)?.value === formGroup.get(pass2Name)?.value
        ? formGroup.get(pass1Name)?.setErrors(null)
        : formGroup.get(pass2Name)?.setErrors({ notTheSame: true }); */
    };
  }
}
