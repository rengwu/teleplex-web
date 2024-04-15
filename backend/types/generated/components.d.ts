import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsMenu extends Schema.Component {
  collectionName: 'components_primitives_menus';
  info: {
    displayName: 'menu';
    icon: 'grid';
    description: '';
  };
  attributes: {
    sub_links: Attribute.Component<'primitives.link', true>;
    label: Attribute.String;
    href: Attribute.String;
    icon: Attribute.Relation<'components.menu', 'oneToOne', 'api::icon.icon'>;
  };
}

export interface ContentBlockArticleCarousel extends Schema.Component {
  collectionName: 'components_content_block_article_carousels';
  info: {
    displayName: 'Article Carousel';
    icon: 'dashboard';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    mode: Attribute.Enumeration<['most_recent', 'featured']> &
      Attribute.DefaultTo<'most_recent'>;
    featured_articles: Attribute.Relation<
      'content-block.article-carousel',
      'oneToMany',
      'api::news-article.news-article'
    >;
    limit: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<10>;
    links: Attribute.Component<'primitives.link', true>;
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
    animatedText: Attribute.Component<'primitives.text', true>;
    negativeTopMargin: Attribute.Boolean;
    caption: Attribute.String;
    links: Attribute.Component<'primitives.link', true>;
    fullScreenHeight: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

export interface ContentBlockPageHero extends Schema.Component {
  collectionName: 'components_content_block_page_heroes';
  info: {
    displayName: 'Page Hero';
    icon: 'star';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    caption: Attribute.String;
    links: Attribute.Component<'primitives.link', true>;
    negativeTopMargin: Attribute.Boolean & Attribute.DefaultTo<false>;
    hasBack: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
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
      'content-block.article-carousel': ContentBlockArticleCarousel;
      'content-block.decorated-content': ContentBlockDecoratedContent;
      'content-block.hero': ContentBlockHero;
      'content-block.page-hero': ContentBlockPageHero;
      'primitives.link': PrimitivesLink;
      'primitives.text': PrimitivesText;
    }
  }
}
