/** @typedef {import('semantic-ui-react').MenuItemProps} MenuItemProps */

/**
 * @type {{
 *   menuItems: MenuItemProps[];
 *   secondaryMenuItems: MenuItemProps[];
 * }} */
const menuItems = {
  menuItems: [
    {
      href: '/',
      children: 'Home',
    },
    {
      href: '/get-started',
      children: 'Get Started',
    },
    {
      href: '/learn-more',
      children: 'Learn More',
    },
  ],
  secondaryMenuItems: [
    {
      href: 'https://github.com/jacob-ebey/federated-libraries',
      children: 'GitHub',
      rel: 'noopener noreferrer',
      target: 'blank',
    },
  ],
};

export default menuItems;
