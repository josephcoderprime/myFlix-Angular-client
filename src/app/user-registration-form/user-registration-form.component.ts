import { Component, OnInit, Input } from '@angular/core';
// closes dialog box after successful registration
import { MatDialogRef } from '@angular/material/dialog';
// API call to register new user
import { UserRegistrationService } from '../fetch-api-data.service';
// displays notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', DateOfBirth: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  /**
   * Function sending user registration form input to database to create new user account
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(response => {
      this.dialogRef.close();   // closes dialog box after registration
      console.log(response);
      this.snackBar.open('user registered successfully', 'OK', {
        duration: 2000
      });
    }, response => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}