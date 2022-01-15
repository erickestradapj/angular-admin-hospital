import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public user!: User;
  public imageUpload!: File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value).subscribe((resp) => {
      const { name, email } = this.profileForm.value;

      this.user.name = name;
      this.user.email = email;
    });
  }

  changeImage(event: any) {
    this.imageUpload = event.target.files[0];
  }

  uploadImage() {
    this.fileUploadService
      .updatePhoto(this.imageUpload, 'users', this.user.uid!)
      .then((img) => console.log(img));
  }
}
