
import $store from "@/store";
import toLogin from "@/libs/login";
import { VUE_APP_API_URL } from "@/utils/index";
import request from "./request/index";

//可以new多个request来支持多个域名请求
let $http = new request({
	//接口请求地址
	baseUrl: VUE_APP_API_URL,
	//服务器本地上传文件地址
	fileUrl: VUE_APP_API_URL,
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	//以下是默认值可不写
	//是否提示--默认提示
	isbackall: false,
	isPrompt: true,
	//是否显示请求动画
	load: true,
	//是否登陆
	islogin:false,
	//是否使用处理数据模板
	isFactory: true,
	back:false
});
//当前接口请求数
let requestNum = 0;
//请求开始拦截器
$http.requestStart = function(options) {

	if (options.load) {
		if (requestNum <= 0) {
			//打开加载动画
			uni.showLoading({
				title: options.title?options.title:'加载中',
				mask: true
			});
		}
		requestNum += 1;
	}
	// 图片上传大小限制
	if (options.method == "FILE" && options.maxSize) {
		// 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
		maxSize = options.maxSize;
		for (let item of options.files) {
			if (item.size > maxSize) {
				setTimeout(() => {
					uni.showToast({
						title: "图片过大，请重新上传",
						icon: "none"
					});
				}, 500);
				return false;
			}
		}
	}
	//请求前加入token

	if(options.islogin){
		
		if($store.state.app.hasLogin){
			
			let openid = $store.state.app.openid;
			
			if(openid.indexOf("sns_wa_") == -1 &&openid.indexOf("wap_user_") == -1){
				openid = 'sns_wa_'+openid;
			}
			options.data['openid'] = openid;
		}else{
			
			uni.showToast({
				title : "请登录",
				icon :"none",
				success: function() {
					if(options.back){
						toLogin(false);
					}else{
						toLogin(true);
					}
					
					
				}
			});
			return false;
		}
	}
	return options;
}
//请求结束
$http.requestEnd = function(options, resolve) {
	//判断当前接口是否需要加载动画
	
	if (options.load) {
		requestNum = requestNum - 1;
		if (requestNum <= 0) {
			uni.hideLoading();
		}
	}
	if (resolve.errMsg && resolve.statusCode && resolve.statusCode > 300) {
		setTimeout(() => {
			uni.showToast({
				title: "网络错误，请检查一下网络",
				icon: "none"
			});
		}, 500);
	}
}
//登录弹窗次数
let loginPopupNum = 0;
//所有接口数据处理（可在接口里设置不调用此方法）
//此方法需要开发者根据各自的接口返回类型修改，以下只是模板
$http.dataFactory = function(res) {
	// console.log("接口请求数据", {
	// 	httpUrl: res.httpUrl,
	// 	resolve: res.response,
	// 	header: res.header,
	// 	data: res.data,
	// 	method: res.method,
	// });
	// 判断接口请求是否成功
	
	if (res.response.statusCode && res.response.statusCode == 200) {
		let httpData = res.response.data;
		/*********以下只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/
		//判断数据是否请求成功
		
		if (httpData.error == 0) {
			// 返回正确的结果(then接受数据)
			if(res.isbackall){
				res.resolve(res.response);
			}
			Object.getOwnPropertyNames(httpData).length >=3 ?res.resolve(httpData) : res.resolve(httpData.data); 
		} else { //其他错误提示
	
			if (res.isPrompt) { //设置可以提示的时候
				setTimeout(function() {
					uni.showToast({
						title: httpData.message, //提示后台接口抛出的错误信息
						icon: "none",
						duration: 3000
					});
				}, 500);
			}
			// 返回错误的结果(catch接受数据)
			res.reject(res.response);
		}

		/*********以上只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/

	} else {
		// 返回错误的结果(catch接受数据)
		res.reject(res.response);
	}
};
export default $http;
