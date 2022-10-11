import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss']
})
export class GameRulesComponent implements OnInit, OnChanges{

  @Input() card: string;

  title: string = '';
  description: string = '';
  panelOpenState = false;
  mobileScreen = false;
  innerHeight: number;

  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks.' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Floor', description: 'Last person to touch the floor drinks.' },
    { title: 'Bust a Jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one.' },
    { title: 'Girls', description: 'All women drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Rhyme', description: 'The card drawer says a word, and you go around the circle coming up with words that rhyme with that word. If someone gets stuck, they drink, and the turn is over.' },
    { title: 'Guys', description: 'All men drink.' },
    { title: 'Question master', description: 'You can ask questions at any point and the other players have to avoid answering. If someone answer they need to drink. You are question master till someone take over by the next question master card.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.innerHeight = window.innerWidth;
    if( window.innerHeight < 650){
      this.mobileScreen = true;
    }
    else{
      this.mobileScreen = false;
    }
  }


  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerHeight = window.innerHeight;
    if( window.innerHeight < 650){
      this.mobileScreen = true;
    }
    else{
      this.mobileScreen = false;
    }
  }
}
