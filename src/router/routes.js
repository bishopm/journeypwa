
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'groups', path: '/groups', component: () => import('components/Groups'), meta: {auth: true} },
      { name: 'reading', path: '/reading/:reading', component: () => import('components/Reading'), meta: {auth: true} },
      { name: 'settings', path: '/settings', component: () => import('components/Settings'), meta: {auth: true} },
      { name: 'societies', path: '/societies', component: () => import('components/Societies'), meta: {auth: true} },
      { name: 'society', path: '/societies/:id', component: () => import('components/Society'), meta: {auth: true} },
      { name: 'home', path: '/', component: () => import('components/Sunday'), meta: {auth: true} }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
