import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';

import getWidth from '../../utils/window/width';

/** @typedef {import('.').AppShellProps} AppShellProps */

/**
 * The desktop app shell used in the documentation.
 * @param {AppShellProps} props
 */
export default function DesktopShell({
  children,
  heading: Heading,
  menuItems,
  secondaryMenuItems,
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleMenuClose = React.useCallback(() => setMenuOpen(false), [setMenuOpen]);
  const handleMenuOpen = React.useCallback(() => setMenuOpen(true), [setMenuOpen]);

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={handleMenuOpen}
        onBottomPassedReverse={handleMenuClose}
      >
        <Segment
          inverted
          vertical
        >
          <Menu
            fixed={menuOpen ? 'top' : null}
            inverted={!menuOpen}
            pointing={!menuOpen}
            secondary={!menuOpen}
            size="large"
          >
            <Container>
              {menuItems && menuItems.map(({ href, ...props }, i) => (
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
              ))}

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
                    inverted={!menuOpen}
                    style={i > 0 ? { marginLeft: '0.5em' } : undefined}
                  />
                ))}
              </Menu.Item>
            </Container>
          </Menu>
          {Heading && <Heading />}
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  );
}

DesktopShell.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.func,
  menuItems: PropTypes.arrayOf(PropTypes.any),
  secondaryMenuItems: PropTypes.arrayOf(PropTypes.any),
};

DesktopShell.defaultProps = {
  children: null,
  heading: null,
  menuItems: null,
  secondaryMenuItems: null,
};
