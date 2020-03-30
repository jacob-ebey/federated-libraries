import React from 'react';

import ArticlePage from '../../components/article-page';

import navItems from '../nav-items';

import Content from './README.mdx';

export default function GetStartedPage() {
  return (
    <ArticlePage
      menuItems={navItems.menuItems}
      secondaryMenuItems={navItems.secondaryMenuItems}
      title="Getting Started With Federated Modules"
      secondaryTitle="get up and running in 15 minutes"
    >
      <Content />
    </ArticlePage>
  );
}
