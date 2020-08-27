
export type Color = 'blue' | 'red' | 'green' | 'yellow' | 'white';

export type Choice = {
  id: number;
  name: Color;
  sound: string;
};

export const choice: Choice[] = [
  { id: 0, name: 'blue', sound: 'wav0.mp3' },
  { id: 1, name: 'red', sound: 'wav1.mp3' },
  { id: 2, name: 'green', sound: 'wav2.mp3' },
  { id: 3, name: 'yellow', sound: 'wav3.mp3' },
  { id: 4, name: 'white', sound: 'wav4.mp3' }
];

