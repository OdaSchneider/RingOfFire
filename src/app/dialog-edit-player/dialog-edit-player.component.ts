import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})

export class DialogEditPlayerComponent implements OnInit {
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

  constructor(public dialogRef: MatDialogRef<DialogEditPlayerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: {playerName: string, playerProfile: string}) {
  }

  ngOnInit(): void {
    this.player = new FormGroup({
      name: new FormControl(this.data.playerName , Validators.required),
      profile: new FormControl(this.data.playerProfile, Validators.required)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
