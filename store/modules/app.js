import { getUserInfo } from "@/api/user";
const LOGIN_KEY = "login_status";

const state = {
  footer: true,
  home: true,
  homeActive: false,
  token:  uni.getStorageSync(LOGIN_KEY) || null,
  backgroundColor: "#fff",
  userInfo: {},
  openid: uni.getStorageSync('openid') || null,
  storeItems: uni.getStorageSync('storeItems') || null,
  goName: uni.getStorageSync('goName')|| "",
  hasLogin : uni.getStorageSync('hasLogin')|| false,
};

const mutations = {
  SHOW_FOOTER(state) {
    state.footer = true;
  },
  HIDE_FOOTER(state) {
    state.footer = false;
  },
  SHOW_HOME(state) {
    state.home = true;
  },
  HIDE_HOME(state) {
    state.home = false;
  },
  OPEN_HOME(state) {
    state.homeActive = true;
  },
  CLOSE_HOME(state) {
    state.homeActive = false;
  },
  LOGIN(state, datas) {
		
	state.token = datas.token;
	state.openid = datas.openid;
	state.hasLogin = true;
    state.expires_time = datas.expires_time;
	uni.setStorageSync('openid', datas.openid);
	uni.setStorageSync('hasLogin', true);
	uni.setStorageSync(LOGIN_KEY,  datas.token);
	uni.setStorageSync('expires', datas.expires_time);
  },
  LOGOUT(state) {
    state.token = undefined;
	state.openid = undefined;
	state.hasLogin = false;
	uni.removeStorageSync(LOGIN_KEY)
	uni.removeStorageSync('openid')
	uni.removeStorageSync('expires')
	uni.removeStorageSync('hasLogin');
	uni.removeStorage({  
		key: 'uerInfo'  
	})
  },
  BACKGROUND_COLOR(state, color) {
    state.color = color;
    document.body.style.backgroundColor = color;
  },
  UPDATE_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  GET_STORE(state, storeItems) {
    state.storeItems = storeItems;
	  uni.setStorageSync('storeItems',storeItems);
   
  },
  GET_TO(state, goName) {
    state.goName = goName;
	 uni.setStorageSync('goName',goName);
  }
};

export default {
  state,
  mutations
};
