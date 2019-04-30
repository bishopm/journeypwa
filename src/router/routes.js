
const routes = [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'blogs', path: '/blogs', component: () => import('components/Blogs'), meta: { auth: true } },
      { name: 'blogposts', path: '/blogposts/:id', component: () => import('components/Blogposts'), meta: { auth: true } },
      { name: 'church', path: '/church', component: () => import('components/Church'), meta: { auth: true } },
      { name: 'combined', path: '/adduser', component: () => import('components/forms/Combined'), meta: { auth: true } },
      { name: 'content', path: '/content/:ctype/:id?', component: () => import('components/Content'), meta: { auth: true } },
      { name: 'diary', path: '/diary', component: () => import('components/Diary'), meta: { auth: true } },
      { name: 'diaries', path: '/diary/:scope', component: () => import('components/Diaries'), meta: { auth: true } },
      { name: 'events', path: '/events', component: () => import('components/Events'), meta: { auth: true } },
      { name: 'event', path: '/events/:id', component: () => import('components/Event'), meta: { auth: true } },
      { name: 'ffdl', path: '/ffdl', component: () => import('components/FFDL'), meta: { auth: true } },
      { name: 'giving', path: '/giving/:id', component: () => import('components/Giving'), meta: { auth: true } },
      { name: 'householdform', path: '/household/:action/:id?', component: () => import('components/forms/Household'), meta: { auth: true } },
      { name: 'hymn', path: '/hymns/:id', component: () => import('components/Hymn'), meta: { auth: true } },
      { name: 'hymnbook', path: '/hymnbook', component: () => import('components/Hymnbook'), meta: { auth: true } },
      { name: 'individualform', path: '/individual/:action/:id?', component: () => import('components/forms/Individual'), meta: { auth: true } },
      { name: 'lectionary', path: '/lectionary', component: () => import('components/Lectionary'), meta: { auth: true } },
      { name: 'library', path: '/library', component: () => import('components/Library'), meta: { auth: true } },
      { name: 'me', path: '/me', component: () => import('components/Me'), meta: { auth: true } },
      { name: 'message', path: '/message/:id', component: () => import('components/Message'), meta: { auth: true } },
      { name: 'messages', path: '/messages', component: () => import('components/Messages'), meta: { auth: true } },
      { name: 'reminders', path: '/reminders', component: () => import('components/Reminders'), meta: { auth: true } },
      { name: 'otherday', path: '/otherday/:date', component: () => import('components/Otherday'), meta: { auth: true } },
      { name: 'phoneverification', path: '/phoneverification', component: () => import('components/Phoneverification'), meta: { auth: true } },
      { name: 'reading', path: '/reading/:reading', component: () => import('components/Reading'), meta: { auth: true } },
      { name: 'sermonsites', path: '/sermonsites', component: () => import('components/Sermonsites'), meta: { auth: true } },
      { name: 'sermon', path: '/sermon/:id', component: () => import('components/Sermon'), meta: { auth: true } },
      { name: 'settings', path: '/settings', component: () => import('components/Settings'), meta: { auth: true } },
      { name: 'societies', path: '/societies', component: () => import('components/Societies'), meta: { auth: true } },
      { name: 'society', path: '/societies/:id', component: () => import('components/Society'), meta: { auth: true } },
      { name: 'sunday', path: '/sunday', component: () => import('components/Sunday'), meta: { auth: true } },
      { name: 'home', path: '/:district?/:circuit?/:society?', component: () => import('components/Home'), meta: { auth: true } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
