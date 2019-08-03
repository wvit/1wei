export default {
  path: 'reqData',
  component: () => import('@/views/reqData.vue'),
  redirect: 'reqData/list',
  children: [{
    path: 'list',
    component: () => import('@/components/reqData/list.vue'),
  }]
}