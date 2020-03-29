import React from 'react';

import {
  Container,
  Grid,
  Segment,
} from 'semantic-ui-react';

import AppShell from '../../components/app-shell';
import Hero from '../../components/hero';

import navItems from '../nav-items';

import Content from './README.mdx';

export default function GetStartedPage() {
  return (
    <AppShell
      menuItems={navItems.menuItems}
      secondaryMenuItems={navItems.secondaryMenuItems}
      heading={() => (
        <Hero>
          <Container text>
            <h1>Getting Started With Federated Modules</h1>
            <h2>
              get up and running in 15 minutes
            </h2>
          </Container>
        </Hero>
      )}
    >
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle" className="fb">
          <Grid.Row>
            <Grid.Column width={16}>
              <Content />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </AppShell>
  );
}
