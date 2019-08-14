
const routes = [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'addchurch', path: '/addchurch', component: () => import('components/Addchurch'), meta: { auth: false } },
      { name: 'archive', path: '/archive/:ctype', component: () => import('components/Archive'), meta: { auth: false } },
      { name: 'blogs', path: '/blogs', component: () => import('components/Blogs'), meta: { auth: false } },
      { name: 'blogposts', path: '/blogposts/:id', component: () => import('components/Blogposts'), meta: { auth: false } },
      { name: 'church', path: '/church', component: () => import('components/Church'), meta: { auth: true } },
      { name: 'combined', path: '/adduser', component: () => import('components/forms/Combined'), meta: { auth: true } },
      { name: 'content', path: '/content/:ctype/:id?', component: () => import('components/Content'), meta: { auth: false } },
      { name: 'dailyreading', path: '/dailyreading', component: () => import('components/Dailyreading'), meta: { auth: false } },
      { name: 'devotionals', path: '/devotionals', component: () => import('components/Devotionals'), meta: { auth: false } },
      { name: 'devotional', path: '/devotional/:id', component: () => import('components/Devotional'), meta: { auth: false } },
      { name: 'diary', path: '/diary', component: () => import('components/Diary'), meta: { auth: false } },
      { name: 'diaries', path: '/diary/:scope', component: () => import('components/Diaries'), meta: { auth: false } },
      { name: 'events', path: '/events', component: () => import('components/Events'), meta: { auth: true } },
      { name: 'event', path: '/events/:id', component: () => import('components/Event'), meta: { auth: true } },
      { name: 'giving', path: '/giving/:id', component: () => import('components/Giving'), meta: { auth: true } },
      { name: 'groups', path: '/groups/:id', component: () => import('components/Group'), meta: { auth: true } },
      { name: 'help', path: '/help', component: () => import('components/Help'), meta: { auth: true } },
      { name: 'householdform', path: '/household/:action/:id?', component: () => import('components/forms/Household'), meta: { auth: true } },
      { name: 'hymn', path: '/hymns/:id', component: () => import('components/Hymn'), meta: { auth: false } },
      { name: 'hymnbook', path: '/hymnbook', component: () => import('components/Hymnbook'), meta: { auth: false } },
      { name: 'individualform', path: '/individual/:action/:id?', component: () => import('components/forms/Individual'), meta: { auth: true } },
      { name: 'lectionary', path: '/lectionary', component: () => import('components/Lectionary'), meta: { auth: false } },
      { name: 'library', path: '/library', component: () => import('components/Library'), meta: { auth: false } },
      { name: 'me', path: '/me', component: () => import('components/Me'), meta: { auth: true } },
      { name: 'reminders', path: '/reminders', component: () => import('components/Reminders'), meta: { auth: true } },
      { name: 'otherday', path: '/otherday/:date', component: () => import('components/Otherday'), meta: { auth: false } },
      { name: 'phoneverification', path: '/phoneverification', component: () => import('components/Phoneverification'), meta: { auth: false } },
      { name: 'published', path: '/published', component: () => import('components/Published'), meta: { auth: false } },
      { name: 'publishedpost', path: '/published/:id', component: () => import('components/Publishedpost'), meta: { auth: false } },
      { name: 'reading', path: '/reading/:reading', component: () => import('components/Reading'), meta: { auth: false } },
      { name: 'readingplans', path: '/readingplans', component: () => import('components/Readingplans'), meta: { auth: false } },
      { name: 'sermonsites', path: '/sermonsites', component: () => import('components/Sermonsites'), meta: { auth: false } },
      { name: 'sermon', path: '/sermon/:id', component: () => import('components/Sermon'), meta: { auth: false } },
      { name: 'settings', path: '/settings/:society?', component: () => import('components/Settings'), meta: { auth: false } },
      { name: 'signup', path: '/signup', component: () => import('components/Signup'), meta: { auth: true } },
      { name: 'societies', path: '/societies', component: () => import('components/Societies'), meta: { auth: false } },
      { name: 'society', path: '/societies/:id', component: () => import('components/Society'), meta: { auth: false } },
      { name: 'subscriptions', path: '/subscriptions', component: () => import('components/Subscriptions'), meta: { auth: true } },
      { name: 'sunday', path: '/sunday', component: () => import('components/Sunday'), meta: { auth: false } },
      { name: 'home', path: '/', component: () => import('components/Home'), meta: { auth: false } }
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
