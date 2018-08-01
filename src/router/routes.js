
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'blogs', path: '/blogs', component: () => import('components/Blogs'), meta: {auth: true} },
      { name: 'content', path: '/content/:ctype', component: () => import('components/Content'), meta: {auth: true} },
      { name: 'diary', path: '/diary', component: () => import('components/Diary'), meta: {auth: true} },
      { name: 'ffdl', path: '/ffdl', component: () => import('components/FFDL'), meta: {auth: true} },
      { name: 'home', path: '/', component: () => import('components/Home'), meta: {auth: true} },
      { name: 'me', path: '/me', component: () => import('components/Me'), meta: {auth: true} },
      { name: 'message', path: '/message/:id', component: () => import('components/Message'), meta: {auth: true} },
      { name: 'messages', path: '/messages', component: () => import('components/Messages'), meta: {auth: true} },
      { name: 'phoneverification', path: '/phoneverification', component: () => import('components/Phoneverification'), meta: {auth: true} },
      { name: 'reading', path: '/reading/:reading', component: () => import('components/Reading'), meta: {auth: true} },
      { name: 'sermons', path: '/sermons', component: () => import('components/Sermons'), meta: {auth: true} },
      { name: 'settings', path: '/settings', component: () => import('components/Settings'), meta: {auth: true} },
      { name: 'societies', path: '/societies', component: () => import('components/Societies'), meta: {auth: true} },
      { name: 'society', path: '/societies/:id', component: () => import('components/Society'), meta: {auth: true} },
      { name: 'sunday', path: '/sunday', component: () => import('components/Sunday'), meta: {auth: true} }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
