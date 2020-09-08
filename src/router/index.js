import Vue from 'vue'
import VueRouter from 'vue-router'
import $store from '@/store'
import Layout from '@/views/layout/index.vue'

Vue.use(VueRouter)

let routes = [
    {
        name: 'Login',
        path: '/login',
        component: () => import('@/views/Login/index.vue')
    },
    {
        name: 'Page401',
        path: '/401',
        component: () => import('@/views/error-page/401.vue')
    },
    {
        name: 'Page404',
        path: '/404',
        component: () => import('@/views/error-page/404.vue')
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                name: 'Dashboard',
                path: '/dashboard',
                component: () => import('@/views/Home/index.vue'),
                meta: { title: '首页', icon: 'dashboard' }
            }
        ]
    },
    {
        path: '/product',
        component: Layout,
        redirect: '/product/index',
        children: [
            {
                name: 'Product',
                path: '/product/index',
                component: () => import(/* webpackChunkName: "product" */ '@/views/product/index.vue'),
                meta: { title: '产品首页', icon: 'product' }
            }
        ]
    },
    {
        path: '/game',
        component: Layout,
        redirect: '/game/index',
        children: [
            {
                name: 'Game',
                path: '/game/index',
                component: () => import(/* webpackChunkName: "game" */ '@/views/game/index.vue'),
                meta: { title: '游戏首页', icon: 'game' }
            }
        ]
    }
]

const router = new VueRouter({
    routes,
})

// 验证地址有效
function validatePathValid(routes, path) {
    let hasPath = routes.some(route => {
        if (route.path === path) {
            return true
        }
        if (route.children instanceof Array) {
            return validatePathValid(route.children, path)
        }
    })
    return hasPath
}

router.beforeEach((to, from, next) => {
    console.log(to.path);
    const hasToken = $store.getToken()
    if (to.path === '/login') {
        hasToken ? next({
            path: '/'
        }) : next()
    } else {
        if (hasToken) {
            let hasPath = validatePathValid(routes, to.path)
            if (hasPath) {
                // 还未做权限处理
                next()
            } else {
                next({ path: '/404' })
            }
        } else {
            next({ path: '/login' })
        }
    }
})

export default router