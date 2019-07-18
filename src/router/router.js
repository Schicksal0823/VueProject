import Vue from "vue"
import VueRouter from 'vue-router'

// 引入组件
import Home from '@/components/Home'
import ShowBlog from '@/components/ShowBlog'
import NewBlog from '@/components/NewBlog'
import EditBlogList from '@/components/EditBlogList'

import CategoryBlog from '@/components/CategoryBlog'
import SingleBlog from '@/components/SingleBlog'
import EditBlog from '@/components/EditBlog'
import NotFound from '@/components/404'

// 通过Vue中间件使用路由
Vue.use(VueRouter);

// 配置路由
const routers = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
            children:[
                {
                    path: '/',
                    redirect:'/showblog',
                },
                {
                    path: '/showblog',
                    name: 'ShowBlog',
                    component: ShowBlog
                },
                {
                    path: '/newblog',
                    name: 'NewBlog',
                    component: NewBlog
                },
                {
                    path: '/editbloglist',
                    name: 'EditBlogList',
                    component: EditBlogList
                },
                {
                    path: '/categoryblog/:tag',
                    name: 'CategoryBlog',
                    component: CategoryBlog
                },
                {
                    path: '/singleblog/:id',
                    name: 'SingleBlog',
                    component: SingleBlog
                },
                {
                    path: '/editblog/:id',
                    name: 'EditBlog',
                    component: EditBlog
                },
                {
                    path: '/404',
                    name: 'NotFound',
                    component: NotFound
                }   
            ]
        }    
    ]
    // ,
    // mode:"history"
    // history mode 需在后端做配置  在github也可以使用404页面方案；
});

export default routers;
