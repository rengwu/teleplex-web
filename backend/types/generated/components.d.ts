import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsMenu extends Schema.Component {
  collectionName: 'components_primitives_menus';
  info: {
    displayName: 'menu';
    icon: 'grid';
    description: '';
  };
  attributes: {
    item: Attribute.Component<'primitives.link', true>;
  };
}

export interface ComponentsNestedMenu extends Schema.Component {
  collectionName: 'components_components_nested_menus';
  info: {
    displayName: 'Nested Menu';
    icon: 'grid';
  };
  attributes: {
    main_link: Attribute.Component<'primitives.link'>;
    submenus: Attribute.Component<'components.menu', true>;
  };
}

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
    negativeTopMargin: Attribute.Boolean;
  };
}

export interface PrimitivesLink extends Schema.Component {
  collectionName: 'components_primitives_links';
  info: {
    displayName: 'Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    href: Attribute.String;
    icon: Attribute.Relation<'primitives.link', 'oneToOne', 'api::icon.icon'>;
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
      'components.menu': ComponentsMenu;
      'components.nested-menu': ComponentsNestedMenu;
      'content-block.decorated-content': ContentBlockDecoratedContent;
      'content-block.hero': ContentBlockHero;
      'primitives.link': PrimitivesLink;
      'primitives.text': PrimitivesText;
    }
  }
}
