
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'settings', path: '/', component: () => import('components/Settings'), meta: {auth: true} }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
