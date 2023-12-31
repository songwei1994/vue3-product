import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Empty from './views/empty.vue'
import { useLogin } from '@/store/login.ts'
let loginStore: any = null
const routes: RouteRecordRaw[] = [
  {
    name: 'layout',
    path: '/',
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '',
        component: () => import('./views/Home.vue'),
        name: 'home',
        meta: {
          // keepAlive: true,
          title: '履历'
        }
      },
      // {
      //   path: '/article',
      //   component: () => import('./views/ArticleList.vue'),
      //   name: 'article-list',
      //   meta: {
      //     keepAlive: true,
      //     title: '文章列表'
      //   }
      // },
      // {
      //   path: '/article/:id',
      //   component: () => import('./views/ArticleDetail.vue'),
      //   name: 'article-detail',
      //   props: true,
      //   meta: {
      //     keepAlive: true,
      //     title: '文章详情'
      //   }
      // },
      // {
      //   path: '/KeepScroll',
      //   component: () => import('./views/KeepScroll.vue'),
      //   name: 'KeepScroll',
      //   meta: {
      //     keepAlive: true,
      //     title: '记录滚动位置'
      //   }
      // },
      // {
      //   // 多级缓存
      //   path: '/child',
      //   name: 'child',
      //   component: () => import('./views/Child/Index.vue'),
      //   meta: {
      //     title: '多级缓存',
      //     keepAlive: true,
      //   },
      //   redirect: {
      //     path: '/soon1'
      //   },
      //   children: [
      //     {
      //       path: '/soon1',
      //       name: 'soon1',
      //       component: () => import('./views/Child/Soon1.vue'),
      //       meta: {
      //         keepAlive: true
      //       }
      //     },
      //     {
      //       path: '/soon2',
      //       name: 'soon2',
      //       component: () => import('./views/Child/Soon2.vue'),
      //       meta: {
      //         keepAlive: true
      //       }
      //     }
      //   ]
      // },
      {
        // 空白页，刷新tab页时用来做中转
        path: '/_empty',
        name: '_empty',
        component: Empty
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login.vue'),
  }, 
  // {
  //   path: '/',
  //   component: () => import('./views/Home.vue'),
  //   name: 'home',
  //   meta: {
  //     title: '履历'
  //   }
  // }
]
// routes.beforeEach((to,from,next) =>{
//   if()
// })

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (loginStore === null) {
//     loginStore = useLogin()
//   }
//   if (to.path != '/login') {
//     if (loginStore.isLogin) next();
//     else {
//       next('/login');
//     }
//   }else next();
// })
export default router;
