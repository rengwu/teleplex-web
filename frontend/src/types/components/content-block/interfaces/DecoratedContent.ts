// Interface automatically generated by schemas-to-ts

import { Link } from '../../primitives/interfaces/Link';
import { Link_Plain } from '../../primitives/interfaces/Link';
import { Link_NoRelations } from '../../primitives/interfaces/Link';

export interface DecoratedContent {
  mainContent?: string;
  subContent?: string;
  links: Link[];
}
export interface DecoratedContent_Plain {
  mainContent?: string;
  subContent?: string;
  links: Link_Plain[];
}

export interface DecoratedContent_NoRelations {
  mainContent?: string;
  subContent?: string;
  links: Link_NoRelations[];
}
