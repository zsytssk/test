import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hh';
  selectedHero: Hero;
  heroes = [
    new Hero(1, 'Windstorm'),
    new Hero(13, 'Bombasto'),
    new Hero(15, 'Magneta'),
    new Hero(20, 'Tornado')
  ];
  onClick() {
    console.log(1);
  }
  getVal() {
    return 10;
  }
  onSelect(hero: Hero) {
    console.log(hero);
    this.selectedHero = hero;
  }
}
export class Hero {
  constructor(public id: number,
    public name: string) { }
}
