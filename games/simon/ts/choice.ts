
export type Color = 'blue' | 'red' | 'green' | 'yellow' | 'white';

export type Choice = {
  id: number;
  name: Color;
};

export const choice: Choice[] = [
  { id: 0, name: 'blue' },
  { id: 1, name: 'red' },
  { id: 2, name: 'green' },
  { id: 3, name: 'yellow' },
  { id: 4, name: 'white' }
];

