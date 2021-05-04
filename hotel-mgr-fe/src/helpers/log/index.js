const LOG_MAP = [
  ['/character/list', '获取角色列表'],
  ['/log/list', '获取日志列表'],
  ['/user/info', '获取自己的登入信息'],
  ['/user/list', '用户列表'],
  ['/user/update/character', '用户更新角色'],
  ['/hotel/add', '增加房间'],
  ['/hotel/list', '房间列表'],
  ['/hotel-classify/list', '房间分类列表'],
  ['/dashboard/base-info', '总览基本信息'],
  ['/invite/list', '重置密码列表']
];

export const getLogInfoByPath = (path) => {
  let title = '';

  LOG_MAP.forEach((item) => {
    if (path.includes(item[0])) {
      title = path.replace(item[0], item[1]);
    }
  });

  return title || path;
}