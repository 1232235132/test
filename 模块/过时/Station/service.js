import request from '@/utils/request';

export async function queryRule(params) {
  console.log('查询请求上传',params );


  return request('/api/rule', {
    params,
  })
}
export async function removeRule(params) {
  console.log('删除请求',params)

  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  console.log('添加请求', params )
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  console.log('更新请求', params);

  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
