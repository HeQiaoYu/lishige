export default {
  footer: state => state.app.footer,
  homeActive: state => state.app.homeActive,
  home: state => state.app.home,
  openid: state => state.app.openid,
  token: state => state.app.token,
  isLogin: state => !!state.app.openid,
  backgroundColor: state => state.app.backgroundColor,
  userInfo: state => state.app.userInfo || {},
  storeItems: state => state.app.storeItems || {},
  goName: state => state.app.goName,
  hasLogin: state => state.app.hasLogin
};
