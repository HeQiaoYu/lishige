import {
	VUE_APP_API_URL
} from "@/utils/index";
import $store from "../store";
import toLogin from "@/libs/login";
const openid = $store.getters.openid;
import $http from "@/utils/request";
/**
 * 首页
 * @returns {*}
 */
export function getHomeData() {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=diypage&type=home&comefrom=wxapp', {}, {
		islogin: false
	});
}


/**
 * 秒杀
 */
export function getSeckill(data) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=seckill.get_list&comefrom=wxapp&timestamp='+new Date().getTime(), data, {
		islogin: false
	});

}

/**
 * 秒杀列表
 */
export function getSeckillgoods(data){
	return $http.get('app/ewei_shopv2_api.php?i=1&r=seckill.get_goods&comefrom=wxapp&timestamp='+new Date().getTime(), data, {
		islogin: false
	})
}

/**
 * 拼团
 * 
 */
export function getGroups() {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups&comefrom=wxapp&timestamp=' + new Date().getTime(), {}, {
		islogin: false
	});
}

/**
 * 获取其他开放的拼团
 * @param {Object} id
 */
export function getOpenGroups(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.goods.openGroups&timestamp=' + new Date().getTime(), {
		id: id,
	}, {
		islogin: false
	});

}

/**
 * 获取拼团团队
 * @param {Object} id
 */
export function getGroupTeams(id, ladder_id = 0) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.goods.fight_groups&timestamp=' + new Date().getTime(), {
		id: id,
		ladder_id: ladder_id
	}, {
		islogin: true
	});
}

export function groupCheck(id, ladder_id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.goods.check_tuan&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id,
		ladder_id: ladder_id
	}, {
		islogin: true
	});
}

/**
 * 拼团goodsCheck
 */
export function goodsCheck(id, type) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.goods.goodsCheck&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id,
		type: type
	}, {
		islogin: true
	});

}

/**
 * 拼团提交订单
 */
export function pintuanCreadOrder(id, option_id, ladder_id, type, heads, teamid) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.order.create_order&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id,
		group_option_id: option_id,
		ladder_id: ladder_id,
		type: type,
		heads: heads,
		teamid: teamid
	}, {
		islogin: true
	});
}

/**
 * 拼团提交订单
 */
export function pintuanSumbitOrder(data) {
	return $http.post('app/ewei_shopv2_api.php?i=1&r=groups.order.create_order&comefrom=wxapp&timestamp=' + new Date().getTime(),
		data, {
			islogin: true,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		});
}

/**
 * 获取拼团详情
 */
export function getGroupsGood(id) {
	//return request.post("app/ewei_shopv2_api.php?i=1&r=groups.goods&timestamp="+new Date().getTime(), {id:id,comefrom:wxapp,openid:sns_wa_,mid:'',merchid:'',authkey:''}, { login: false });
}

/**
 * 准备开团
 */

export function getOpendGroupsGood(id) {
	//return request.post("app/ewei_shopv2_api.php?i=1&r=groups.goods&timestamp="+new Date().getTime(), {id:id,comefrom:wxapp,openid:sns_wa_,mid:'',merchid:'',authkey:''}, { login: false });
}

/**
 * 获取不同栏目的，以及分页page，
 */

export function getGroupsCate(page, cate) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.list&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		category: cate,
		page: page
	}, {
		islogin: false
	});

}

/**
 * 获取拼团商品详情
 */
export function getGroupInfo(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.goods&timestamp=' + new Date().getTime(), {
		id: id,
	}, {
		islogin: false
	});

}

/**
 * 获取团购商品详情
 * grouporderdetail
 */
export function grouporderdetail(order) {
	return uni.request({
		url: VUE_APP_API_URL + 'app/ewei_shopv2_api.php?i=1&r=order.index.detail&comefrom=wxapp&timestamp=' + new Date().getTime(),
		method: 'GET',
		data: {
			id: order,
			openid: openid
		}
	})
}

/**
 * 获取group
 * grouporderget_list
 */
export function grouporderList(status, page) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.order&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		status: (status - 1) < 0 ? '' : (status - 1),
		page: page
	}, {
		islogin: true
	});

}


/**
 * 获取商品分类
 */
export function getCategory() {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=shop.get_category&comefrom=wxapp&timestamp=' + new Date().getTime(), {}, {
		islogin: false
	});
}

/**
 * 获取商品列表
 */
export function getGoodslist(data) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=goods.get_list&comefrom=wxapp&timestamp=' +
		new Date().getTime(), data, {
			login: false
		});
}

/**
 * 获取分类商品
 */
export function getCategoryGoods(cate, page, order, by, merchid = 0) {
	return uni.request({
		url: VUE_APP_API_URL + "app/ewei_shopv2_api.php?i=1&r=goods.get_list&comefrom=wxapp&mid=&authkey=&timestamp=" + new Date()
			.getTime(),
		method: 'GET',
		data: {
			cate: cate,
			page: page,
			order: order,
			by: by,
			merchid: merchid
		}
	})

}

/**
 * 获取所有分类
 */
export function getAllCategory() {
	return request.get('app/ewei_shopv2_api.php?i=1&r=goods.get_category&comefrom=wxapp&mid=&merchid=&authkey=&timestamp=' +
		new Date().getTime(), {}, {
			login: false
		});
}


export function getGoodDetaill(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=goods.get_detail&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id
	}, {
		islogin: false
	});
}

/**
 * getmap
 * 
 */
export function getMaps(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=diypage&type=home&comefrom=wxapp', {}, {
		islogin: false,
		isbackall:true
	});

}
/**
 * 获取砍价商品详情
 */
export function getBarginDetaill(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=bargain.index.get_detail&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id
	}, {
		islogin: true
	});

}
/**
 * 获取指定商品的规格
 */
export function getPicker(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=goods.get_picker&comfrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id
	}, {
		islogin: false
	});
}

/**
 * 获取商品的规格
 * @param {Object} data
 */
export function getGoodsComments(data)
{
	return $http.get('app/ewei_shopv2_api.php?i=1&r=goods.get_comments&comfrom=wxapp&timestamp=' + new Date().getTime(), data, {
		islogin: false
	});
}

/**
 * 下单
 */
export function createOrder(data) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=order.create&comfrom=wxapp&timestamp=' + new Date().getTime(), data, {
		islogin: true
	})
}

/**
 * @param {Object} data
 * 
 */
export function createcaculate(data){
	return $http.post('app/ewei_shopv2_api.php?i=1&r=order.create.caculate&comefrom=wxapp&timestamp=' + new Date().getTime(), data, {
		islogin: true,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
}
/**
 * 下单
 */
export function orderSubmit(data) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=order.create.submit&comfrom=wxapp&timestamp=' + new Date().getTime(),
		data, {
			islogin: true
		})
}

/**
 * 获取门店列表
 */
export function getstorelist(data){
	return $http.get('app/ewei_shopv2_api.php?i=1&r=store.selector&comfrom=wxapp&timestamp=' + new Date().getTime(),
		data, {
			islogin: true
		}) 
}
/**
 * 获取支付信息
 */
export function pay(order, openids = 0) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=order.pay&comfrom=wxapp&timestamp=' + new Date().getTime(), {
		id: order,
		openids: openids
	}, {
		islogin: true
	})
}

/**
 * 支付
 */
export function wxpay(order, type) {
	return uni.request({
		url: VUE_APP_API_URL + 'app/ewei_shopv2_api.php?i=1&r=payment.wxpayv3.index&comefrom=wxapp&timestamp=' + new Date()
			.getTime(),
		method: 'GET',
		data: {
			id: order,
			openid: openid,
		}
	})
}

/**
 * Pay complete
 */
export function complete(id, type, template = '') {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=order.pay.complete&comfrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id,
		type: type,
		template: template
	}, {
		islogin: true
	})
}

/**
 * pay checkstock
 */
export function checkstock(order) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=order.pay.checkstock&comfrom=wxapp&timestamp=' + new Date().getTime(), {
		id: order
	}, {
		islogin: true
	})
}

/**
 * orderdetail
 */
export function orderdetail(order) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=order.index.detail&comfrom=wxapp&timestamp=' + new Date().getTime(), {
		id: order
	}, {
		islogin: true
	})
}

/**
 * orderget_list
 */
export function orderList(status, page) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=order.index.get_list&comfrom=wxapp&timestamp=' + new Date().getTime(), {
		status: (status - 1),
		page: page,
	}, {
		islogin: true
	})
}
/**
 * 取消订单
 */
export function cancelOrder(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=order.op.cancel&comefrom=wxapp&timestamp=' + new Date().getTime(), {
			id: id,
			remark: '用户取消'
	}, {
		islogin: true
	})

}

/**
 * 核销二维码
 */
export function getOrdercode(data){
	return $http.post('app/ewei_shopv2_api.php?i=1&r=verify.qrcode&comefrom=wxapp&timestamp=' + new Date().getTime(), data, {
		islogin: true,
		header: { 
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
}

/**
 * 核销订单详情
 */
export function getVerifyInfo(data){
	return $http.post('app/ewei_shopv2_api.php?i=1&r=verify.detail&comefrom=wxapp&timestamp=' + new Date().getTime(), data, {
		islogin: true,
		header: { 
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
	
}

export function useVerify(data)
{
	return $http.post('app/ewei_shopv2_api.php?i=1&r=verify.complete&comefrom=wxapp&timestamp=' + new Date().getTime(), data, {
		islogin: true,
		header: { 
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
}
/**
 * 拼团code
 */

export function getgroupqrcode(data){
	return $http.post('app/ewei_shopv2_api.php?i=1&r=groups.verify.qrcode&comefrom=wxapp&timestamp=' + new Date().getTime(), data, {
		islogin: true,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
}
/**
 * 全部砍价
 */
export function bargainList() {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=bargain.get_list&comefrom=wxapp&timestamp=' + new Date().getTime(), {}, {
		islogin: true
	});
}

/**
 * 发起砍价
 */
export function barginJoin(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=bargain.join&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id
	}, {
		load: true,
		islogin: true
	});

}

/**
 * 发起砍价详情
 */
export function bargainInfo(data) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=bargain.bargain&comefrom=wxapp&timestamp=' + new Date().getTime(),
		data, {
			load: true,
			islogin: true
		});


}

/**
 * 砍一刀
 */
export function bargainBargain(id, mid) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=bargain.bargain&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id,
		ajax: 151,
		mid: mid
	}, {
		load: true,
		islogin: true
	});
}

/**
 * 组团pay
 */
export function grouppay(order, teamid, openids = 0) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.pay&comfrom=wxapp&timestamp=' + new Date().getTime(), {
		orderid: order,
		teamid: teamid,
		openids: openids
	}, {
		islogin: true
	})
}

/**
 * group Pay complete
 */
export function groupcomplete(id, type) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.pay.complete&comfrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id,
		type: type,
	}, {
		islogin: true
	})
}

/**
 * 拼团详情
 */
export function groupsorderdetails(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.order.details&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		orderid: id,
	}, {
		islogin: true
	})

}

/**
 * 拼团取消订单
 */
export function groupsordercancel(id) {
	return $http.post('app/ewei_shopv2_api.php?i=1&r=groups.order.cancel&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id,
		cancel_reason: '我不想买了',
	}, {
		islogin: true,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})

}

/**
 * 拼团订单详情
 */
export function groupteamdetails(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.team.details&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		teamid: id,
	}, {
		islogin: true
	})
}
/**
 * 获取拼团的规格
 */
export function groupsget_spec(id) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.goods.get_spec&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id,
	}, {
		islogin: true
	})
}

/**
 * 获取h5配置
 */
export function config(surl) {
	return $http.post('app/ewei_shopv2_api.php?i=1&r=groups.gettokens&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		url: surl
	}, {
		islogin: false,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
}

export function parseQuery() {
	const res = {};

	const query = (location.href.split("?")[1] || "")
		.trim()
		.replace(/^(\?|#|&)/, "");

	if (!query) {
		return res;
	}

	query.split("&").forEach(param => {
		const parts = param.replace(/\+/g, " ").split("=");
		const key = decodeURIComponent(parts.shift());
		const val = parts.length > 0 ? decodeURIComponent(parts.join("=")) : null;

		if (res[key] === undefined) {
			res[key] = val;
		} else if (Array.isArray(res[key])) {
			res[key].push(val);
		} else {
			res[key] = [res[key], val];
		}
	});

	return res;
}

export function getopenid(code) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=groups.pay.getOpenID&comefrom=wxapp&timestamp=' + new Date().getTime(), {
		id: id
	}, {
		islogin: true
	})
}


/**
 * 获取拼团列表
 */
export function getopenGroups(id) {
	return uni.request({
		url: VUE_APP_API_URL + 'app/ewei_shopv2_api.php?i=1&r=groups.goods.openGroups&comefrom=wxapp&timestamp=' + new Date()
			.getTime(),
		method: 'GET',
		data: {
			id: id
		}
	})

}

/**
 * 点赞收藏
 */
export function toggle(id, isfavorite) {
	return $http.get('app/ewei_shopv2_api.php?i=1&r=member.favorite.toggle&comefrom=wxapp', {
		id: id,
		isfavorite: isfavorite
	}, {
		title: isfavorite == 1 ? '收藏成功' : '取消收藏'
	}, {
		islogin: true
	});
}


/**
 * 获取规格
 */
export function goodsgetPicker(data){
	return $http.get('app/ewei_shopv2_api.php?i=1&r=goods.get_picker&comefrom=wxapp', data, {
		islogin: true
	});
}
/**
 * create diyform
 */
export function creatediyform(data){
	return $http.post('app/ewei_shopv2_api.php?i=1&r=order.create.diyform&comefrom=wxapp&timestamp=' + new Date().getTime(),
		data, {
			islogin: true,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		});
}

export function addcart(data) {
	return $http.post('app/ewei_shopv2_api.php?i=1&r=member.cart.add&comefrom=wxapp&timestamp=' + new Date().getTime(),
		data, {
			islogin: true,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		});
}
