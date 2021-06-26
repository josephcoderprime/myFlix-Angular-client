import { Component, OnInit, Input } from '@angular/core';

//API Call 
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  isLoading = false;

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   *
   * @param fetchApiData
   * @param dialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.isLoading = true;
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.isLoading = false;
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Thank you for registering. Please login', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.isLoading = false;
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}