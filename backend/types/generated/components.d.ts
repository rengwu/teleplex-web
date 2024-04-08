import type { Schema, Attribute } from '@strapi/strapi';

export interface ContentBlockDecoratedContent extends Schema.Component {
  collectionName: 'components_content_block_decorated_contents';
  info: {
    displayName: 'Decorated Content';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    mainContent: Attribute.Text;
    subContent: Attribute.Text;
    links: Attribute.Component<'primitives.link', true>;
  };
}

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

export interface PrimitivesLink extends Schema.Component {
  collectionName: 'components_primitives_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Attribute.String;
    href: Attribute.String;
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
      'content-block.decorated-content': ContentBlockDecoratedContent;
      'content-block.hero': ContentBlockHero;
      'primitives.link': PrimitivesLink;
      'primitives.text': PrimitivesText;
    }
  }
}
