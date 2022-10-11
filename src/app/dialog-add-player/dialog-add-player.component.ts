import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  player: FormGroup;

  profiles: string[] = [
    '1.png',
    '3.png',
    '4.png',
    '5.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
  ];

  name: string;
  profile: string;

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {
  }

  ngOnInit(): void {
    this.player = new FormGroup({
      name: new FormControl('', Validators.required),
      profile: new FormControl('', Validators.required)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
