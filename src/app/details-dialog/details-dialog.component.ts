import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})

/**
 * This component provides a dialog/modal for detailed movie information.
 *
 */
export class DetailsDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      imagePath: string;
      description: string;
      director: string;
      genre: string;
    }
  ) { }

  ngOnInit(): void { }
}