// Interface automatically generated by schemas-to-ts

import { Text } from '../../primitives/interfaces/Text';
import { Text_Plain } from '../../primitives/interfaces/Text';
import { Text_NoRelations } from '../../primitives/interfaces/Text';

export interface Hero {
  mainTagline?: string;
  buttonText?: string;
  animatedText: Text[];
}
export interface Hero_Plain {
  mainTagline?: string;
  buttonText?: string;
  animatedText: Text_Plain[];
}

export interface Hero_NoRelations {
  mainTagline?: string;
  buttonText?: string;
  animatedText: Text_NoRelations[];
}

