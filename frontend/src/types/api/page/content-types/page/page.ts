// Interface automatically generated by schemas-to-ts

export interface Page {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    displayTitle?: string;
    name: string;
    blocks?: any;
  };
}
export interface Page_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  displayTitle?: string;
  name: string;
  blocks?: any;
}

export interface Page_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  displayTitle?: string;
  name: string;
  blocks?: any;
}

export interface Page_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  displayTitle?: string;
  name: string;
  blocks?: any;
}
