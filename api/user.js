import { VUE_APP_API_URL } from "@/utils/index";
import $store from "../store";
import toLogin from "@/libs/login";
import $http from "@/utils/request";
/**
 * 登录带注册接口
 */
export function userLogin(phone,code){
	return uni.request({
	        url: VUE_APP_API_URL+"app/ewei_shopv2_api.php?i=1&r=account.login_and_register&comefrom=wxapp&openid=sns_wa_&mid=&merchid=&authkey=&timestamp="+new Date().getTime(),
			method:'GET',
			header:{
			},
			data:{
				mobile:phone,verifycode:code
			}
	})

}
/**
 * openid and sessionKey
 */
export function login(data){
	return $http.get('app/ewei_shopv2_api.php?i=1&r=wxapp.login&type=home&comefrom=wxapp',data,{islogin:false});
}

/**
 * auth login
 */
export function authLogin(data) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=wxapp.auth&type=home&comefrom=wxapp',data,{islogin:false});
}
/**
 * 用户收藏list
 * @param {Object} id
 */
export function userfavorite(page) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=member.favorite.get_list&type=home&comefrom=wxapp',{page:page},{islogin:true,load:false})
}
/**
 * 发送手机号验证码
 */
export function smsphone(phone,imgcode){
	return uni.request({
	        url: VUE_APP_API_URL+"app/ewei_shopv2_api.php?i=1&r=sms.register&comefrom=wxapp&openid=sns_wa_&mid=&merchid=&authkey&authkey=&timestamp="+new Date().getTime(),
			method:'GET',
			data:{
				mobile:phone,verifyImgCode:imgcode
			},
			header:{
				
			}
	})
}
/**
 * 解密用户手机号
 */
export function decodephone(data) {
	
	return $http.get('app/ewei_shopv2_api.php?i=1&r=wxapp.getphone&type=home&comefrom=wxapp',data,{islogin:false});
	
}
/**
 * @param {Object} openid
 */
export function cart(){

	return $http.get('app/ewei_shopv2_api.php?i=1&r=member.cart.get_cart&comefrom=wxapp',{},{islogin:true,back:true,load:false});

}
/**
 * cartUpdate
 */
export function cartUpdate(data) {
	return $http.post('app/ewei_shopv2_api.php?i=1&r=member.cart.update&comefrom=wxapp&timestamp=' + new Date().getTime(),
		data, {
			islogin: true,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		});
	
}
/**
 * cartSelect
 */
export function cartSelect(data) {
	return $http.post('app/ewei_shopv2_api.php?i=1&r=member.cart.select&comefrom=wxapp&timestamp=' + new Date().getTime(),
		data, {
			islogin: true,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		});
}

/**
 * cartsubmit
 */
export function cartSubmit() {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=member.cart.submit&comefrom=wxapp&timestamp=',{},{islogin:true,load:false});
}
/**
 * cartDelect
 */
export function cartDelect(data) {
	return $http.post('app/ewei_shopv2_api.php?i=1&r=member.cart.remove&comefrom=wxapp&timestamp=' + new Date().getTime(),
		data, {
			islogin: true,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		});
}
export function IsLogin(){
	if(!$store.state.app.token){
		toLogin();
	}
}
/**
 * 登录以后才可以进入的页面
 */
export function getUser(){
	
	return $http.get('app/ewei_shopv2_api.php?i=1&r=member&type=home&comefrom=wxapp',{},{islogin:true,load:false});
}
/**
 * 获取用户详情
 */
export function userinfo(){
	return $http.get('app/ewei_shopv2_api.php?i=1&r=member.info&type=home&comefrom=wxapp',{},{islogin:true,load:false});
}
/**
 * 用户地址列表
 */
export function userAddress(){

	return $http.get('app/ewei_shopv2_api.php?i=1&r=member.address.get_list&type=home&comefrom=wxapp&timestamp='+new Date().getTime(),{},{islogin:true});
}

/**
 * 用户手机号绑定
 */
export function bindPhone(phone){
	return $http.post('app/ewei_shopv2_api.php?i=1&r=member.bind.submit&comefrom=wxapp&timestamp='+ new Date().getTime(),{
		mobile:phone,
		confirm: 1
	},{islogin:true,load:false,header: {
			'content-type': 'application/x-www-form-urlencoded'
		}});
	
}
/**
 * 添加以及修改
 */
export function userAddressAdd(addressdata,openid){
	return $http.get('app/ewei_shopv2_api.php?i=1&r=member.address.submit&type=home&comefrom=wxapp&timestamp='+new Date().getTime(),{
				realname : addressdata.realname,
				mobile : addressdata.mobile,
				address : addressdata.address,
				area: addressdata.area,
				lng: addressdata.lng,
				lat: addressdata.lat,
				id: addressdata.id,
				openid:openid
			},{islogin:true});

}

/**
 * 删除
 */
export function userAddressDelete(id,openid){
	return uni.request({
	        url: VUE_APP_API_URL+"app/ewei_shopv2_api.php?i=1&r=member.address.delete&comefrom=wxapp&timestamp="+new Date().getTime(),
			method:'GET',
			data:{
				id: id,
				openid:openid
			},
			header:{
				
			}
	})

}

/**
 * 设置为默认地址
 */
export function userAddressDefault(id, openid){
	return uni.request({
	        url: VUE_APP_API_URL+"app/ewei_shopv2_api.php?i=1&r=member.address.delete&comefrom=wxapp&timestamp="+new Date().getTime(),
			method:'GET',
			data:{
				id: id,
				openid:openid
			},
			header:{
				
			}
	})
}
/**
 * 
 */

