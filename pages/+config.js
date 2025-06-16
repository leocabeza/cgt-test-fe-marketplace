import vikeReact from 'vike-react/config';

export default {
  extends: [vikeReact],
  prerender: true,
  clientRouting: true,
  prefetchStaticAssets: 'viewport',
  title: './+title.js',
  description: './+description.js',
  meta: {
    data: {
      env: { server: true, client: true },
    },
  },
};
