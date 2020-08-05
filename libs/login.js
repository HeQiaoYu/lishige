import store from "../store";
import { isWeixin } from "@/utils";
export default function toLogin(push, backUrl) {
	store.commit("LOGOUT");
	var pages = getCurrentPages();  
	
	
	var page = (pages[pages.length - 1]).route  
	
	uni.setStorageSync('login_back_url', backUrl || page);

    push? uni.navigateTo({
			url: "/pages/public/login"
		}) 
        : uni.navigateTo({
			url: "/pages/public/login?back=2"
		}) 

}
