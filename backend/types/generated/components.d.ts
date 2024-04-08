import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentBlockHero extends Schema.Component {
  collectionName: 'components_content_block_heroes';
  info: {
    displayName: 'Hero';
    icon: 'star';
    description: '';
  };
  attributes: {
    mainTagline: Attribute.String;
    buttonText: Attribute.String;
    animatedText: Attribute.Component<'primitives.text', true>;
  };
}

export interface PrimitivesText extends Schema.Component {
  collectionName: 'components_primitives_texts';
  info: {
    displayName: 'text';
    icon: 'bold';
  };
  attributes: {
    value: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content-block.hero': ContentBlockHero;
      'primitives.text': PrimitivesText;
    }
  }
}
