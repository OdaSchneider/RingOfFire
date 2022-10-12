import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';
import { DialogEndOfGameComponent } from '../dialog-end-of-game/dialog-end-of-game.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game!: Game;
  gameId: string;

  constructor(
    public firestore: AngularFirestore, 
    public dialog: MatDialog, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params)=>{
      this.gameId = params['id']
      this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game: any)=>{
        this.game.currentPlayer = game.currentPlayer;
        this.game.stack = game.stack;
        this.game.players = game.players;
        this.game.playedCards = game.playedCards;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    })

  }

  newGame() {
    this.game = new Game();
  }


  saveGame(){
    this
    .firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJson());
  }


  pickCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.saveGame();

      setTimeout(() => {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);
        this.saveGame();
      }, 1200);
    }
  }


  openDialogEditPlayer(i: number){
    const dialogRef = this.dialog.open(DialogEditPlayerComponent, {
      data: {
        playerName: this.game.players[i]['name'],
        playerProfile: this.game.players[i]['profile']
      }
    });

    dialogRef.afterClosed().subscribe((player: any) => {
      if(player){
        this.game.players[i]['name'] = player.name;
        this.game.players[i]['profile'] = player.profile;
      } if(player == 'remove'){
        this.game.players.splice(i , 1);
      }
      this.saveGame();
    });
  }


  openDialogAddPlayer(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((player: object) => {
      if(player){
        this.game.players.push(player);
        this.saveGame();
      }
    });
  }


  openDialogEnd(){
    const dialogRef = this.dialog.open(DialogEndOfGameComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        this.router.navigateByUrl('');
      }
      else{
        for(let i= 1; i < 14; i++){
          this.game.stack.push('ace_' + i);
          this.game.stack.push('clubs_' + i);
          this.game.stack.push('diamonds_' + i);
          this.game.stack.push('hearts_' + i);
      }

      shuffle(this.game.stack);
      this.saveGame();
      }
    });
  }

}


function shuffle(array:any) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

