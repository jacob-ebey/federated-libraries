import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

import getWidth from '../../utils/window/width';

/** @typedef {import('.').AppShellProps} AppShellProps */

/**
 * The mobile app shell used in the documentation.
 * @param {AppShellProps} props
 */
export default function MobileShell({
  children,
  heading: Heading,
  menuItems,
  secondaryMenuItems,
}) {
  const [sidebarOpened, setSidebarOpened] = React.useState(false);
  const handleSidebarHide = React.useCallback(
    () => setSidebarOpened(false),
    [setSidebarOpened],
  );
  const handleSidebarToggle = React.useCallback(
    () => setSidebarOpened(!sidebarOpened),
    [setSidebarOpened, sidebarOpened],
  );

  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <Sidebar
        as={Menu}
        animation="push"
        inverted
        onHide={handleSidebarHide}
        vertical
        visible={sidebarOpened}
      >
        {menuItems && menuItems.map(({ href, ...props }, i) => {
          if (href && href.includes('://')) {
            return (
              <Menu.Item
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                // eslint-disable-next-line
                {...props}
                href={href}
                as="a"
              />
            );
          }

          return (
            <NavLink
              component={Menu.Item}
              exact
              activeClassName="active"
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              // eslint-disable-next-line
              {...props}
              to={href}
              // @ts-ignore
              // eslint-disable-next-line
              as={href ? 'a' : 'button'}
            />
          );
        })}
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          inverted
          vertical
        >
          <Container className="no-print">
            <Menu inverted pointing secondary size="large">
              <Menu.Item onClick={handleSidebarToggle}>
                <Icon name="sidebar" />
              </Menu.Item>
              <Menu.Item position="right">
                {secondaryMenuItems && secondaryMenuItems.map((props, i) => (
                  // @ts-ignore
                  <Button
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    // eslint-disable-next-line
                    {...props}
                    // eslint-disable-next-line
                    as={props.href ? 'a' : 'button'}
                    style={i > 0 ? { marginLeft: '0.5em' } : undefined}
                    inverted
                  />
                ))}
              </Menu.Item>
            </Menu>
          </Container>
          {Heading && <Heading mobile />}
        </Segment>

        {children}
      </Sidebar.Pusher>
    </Responsive>
  );
}

MobileShell.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.func,
  menuItems: PropTypes.arrayOf(PropTypes.any),
  secondaryMenuItems: PropTypes.arrayOf(PropTypes.any),
};

MobileShell.defaultProps = {
  children: null,
  heading: null,
  menuItems: null,
  secondaryMenuItems: null,
};
