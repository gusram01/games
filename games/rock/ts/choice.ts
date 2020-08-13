
export type Choice = 'scissors' | 'paper' | 'rock' | 'lizard' | 'spock';


export type Character = {
  id: number;
  name: Choice;
}

type Defeat = {
  name: Choice;
  win: string[];
}

export const character = [
  { id: 0, name: 'scissors' },
  { id: 72, name: 'paper' },
  { id: 144, name: 'rock' },
  { id: 216, name: 'lizard' },
  { id: 288, name: 'spock' }
];

export const whosDefeat = [
  { name: 'scissors', win: ['paper', 'lizard'] },
  { name: 'paper', win: ['rock', 'spock'] },
  { name: 'rock', win: ['scissors', 'lizard'] },
  { name: 'lizard', win: ['paper', 'spock'] },
  { name: 'spock', win: ['scissors', 'rock'] }
];
