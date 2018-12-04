
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'blogs', path: '/blogs', component: () => import('components/Blogs'), meta: {auth: true} },
      { name: 'combined', path: '/adduser', component: () => import('components/forms/Combined'), meta: {auth: true} },
      { name: 'content', path: '/content/:ctype', component: () => import('components/Content'), meta: {auth: true} },
      { name: 'diary', path: '/diary', component: () => import('components/Diary'), meta: {auth: true} },
      { name: 'ffdl', path: '/ffdl', component: () => import('components/FFDL'), meta: {auth: true} },
      { name: 'giving', path: '/giving', component: () => import('components/Giving'), meta: {auth: true} },
      { name: 'grace', path: '/grace', component: () => import('components/Grace'), meta: {auth: true} },
      { name: 'householdform', path: '/household/:action/:id?', component: () => import('components/forms/Household'), meta: {auth: true} },
      { name: 'individualform', path: '/individual/:action/:id?', component: () => import('components/forms/Individual'), meta: {auth: true} },
      { name: 'lectionary', path: '/lectionary', component: () => import('components/Lectionary'), meta: {auth: true} },
      { name: 'me', path: '/me', component: () => import('components/Me'), meta: {auth: true} },
      { name: 'message', path: '/message/:id', component: () => import('components/Message'), meta: {auth: true} },
      { name: 'messages', path: '/messages', component: () => import('components/Messages'), meta: {auth: true} },
      { name: 'otherday', path: '/otherday/:date', component: () => import('components/Otherday'), meta: {auth: true} },
      { name: 'phoneverification', path: '/phoneverification', component: () => import('components/Phoneverification'), meta: {auth: true} },
      { name: 'reading', path: '/reading/:reading', component: () => import('components/Reading'), meta: {auth: true} },
      { name: 'sermons', path: '/sermons', component: () => import('components/Sermons'), meta: {auth: true} },
      { name: 'settings', path: '/settings', component: () => import('components/Settings'), meta: {auth: true} },
      { name: 'societies', path: '/societies', component: () => import('components/Societies'), meta: {auth: true} },
      { name: 'society', path: '/societies/:id', component: () => import('components/Society'), meta: {auth: true} },
      { name: 'sunday', path: '/sunday', component: () => import('components/Sunday'), meta: {auth: true} },
      { name: 'home', path: '/:district?/:circuit?/:society?', component: () => import('components/Home'), meta: {auth: true} }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/Error404')
  }
]
