const React = require('react');

const HomePage = React.lazy(() => import('./pages/home'));
const GetStartedPage = React.lazy(() => import('./pages/get-started'));

module.exports = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/get-started',
    component: GetStartedPage,
  },
];
