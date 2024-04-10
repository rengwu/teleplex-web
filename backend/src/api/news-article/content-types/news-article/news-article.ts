// Interface automatically generated by schemas-to-ts

import { Media } from '../../../../common/schemas-to-ts/Media';
import { AdminPanelRelationPropertyModification } from '../../../../common/schemas-to-ts/AdminPanelRelationPropertyModification';

export interface NewsArticle {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    title: string;
    date: Date;
    cover_image?: { data: Media };
    content?: string;
  };
}
export interface NewsArticle_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  date: Date;
  cover_image?: Media;
  content?: string;
}

export interface NewsArticle_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  date: Date;
  cover_image?: number;
  content?: string;
}

export interface NewsArticle_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  date: Date;
  cover_image?: AdminPanelRelationPropertyModification<Media>;
  content?: string;
}