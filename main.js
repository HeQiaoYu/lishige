import Vue from 'vue'
import store from './store'
import App from './App'
import Json from './Json' //测试用数据
import { VUE_APP_API_URL,VUE_APP_ROOT_URL} from "@/utils/index";
import uniIcons from './components/uni-icons/uni-icons'
import uniNumbaerBox from './components/uni-number-box/uni-number-box'
import uniSearchBar from './components/uni-search-bar/uni-search-bar'
import countdown from './components/uni-countdown/uni-countdown'
import uniPopup from "./components/uni-popup/uni-popup"
Vue.component('uni-icons',uniIcons)
Vue.component('uni-popup',uniPopup)
Vue.component('uni-number-box',uniNumbaerBox)
Vue.component('uni-countdown',countdown)
Vue.component('uni-search-bar',uniSearchBar)

/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, json, prePage};
 Vue.prototype.url = VUE_APP_API_URL;
 Vue.prototype.appurl = VUE_APP_ROOT_URL;
App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()