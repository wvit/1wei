export default {
  path: 'blog',
  component: () => import('@/views/blog.vue'),
  redirect: 'blog/add',
  children: [{
    path: 'add',
    component: () => import('@/components/blog/add.vue'),
  }, {
    path: 'list',
    component: () => import('@/components/blog/list.vue'),
  }, {
    path: 'list/edit',
    component: () => import('@/components/blog/list/edit.vue'),
  }, ]
}