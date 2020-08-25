
export type Color = 'blue' | 'red' | 'green' | 'yellow' | 'white';

export type Choice = {
  id: number;
  name: Color;
  sound: string;
};

export const choice: Choice[] = [
  { id: 0, name: 'blue', sound: 'wav0.wav' },
  { id: 1, name: 'red', sound: 'wav1.wav' },
  { id: 2, name: 'green', sound: 'wav2.wav' },
  { id: 3, name: 'yellow', sound: 'wav3.wav' },
  { id: 4, name: 'white', sound: 'wav4.wav' }
];

