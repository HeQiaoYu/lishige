
import a from "@/utils/jquery";
import o from "@/utils/biz/diyform";
import {goodsgetPicker,creatediyform} from "@/api/public";
module.exports = {
    number: function(t, o) {
        var d = a.pdata(t), i = e.number(o, t), s = (d.id, d.optionid, d.min);
        d.max;
        1 == i && 1 == d.value && "minus" == t.target.dataset.action || i < s && "minus" == t.target.dataset.action ? e.toast(o, "单次最少购买" + d.value + "件") : d.value == d.max && "plus" == t.target.dataset.action || (parseInt(o.data.stock) < parseInt(i) ? e.toast(o, "库存不足") : o.setData({
            total: i
        }));
    },
    inputNumber: function(t, a) {
        var o = a.goods.maxbuy, d = a.goods.minbuy, i = t.detail.value;
        if (i > 0) {
            if (o > 0 && o <= parseInt(t.detail.value) && (i = o, e.toast(a, "单次最多购买" + o + "件")), 
            d > 0 && d > parseInt(t.detail.value) && (i = d, e.toast(a, "单次最少购买" + d + "件")), 
            parseInt(a.data.stock) < parseInt(i)) return void e.toast(a, "库存不足");
        } else i = d > 0 ? d : 1;
        a.setData({
            total: i
        });
    },
    chooseGift: function(t, a) {
        a.setData({
            giftid: t.currentTarget.dataset.id
        });
    },
    buyNow: function(t, d, i) {
        t.type && (i = t.type);
        var s = d.optionid, r = d.goods.hasoption, n = d.diyform, g = d.giftid;
        if (9 == d.goods.type) var l = d.checkedDate / 1e3;
        if (r > 0 && !s) uni.showToast({title:'请选择规格',duration:600}); else if (n && n.fields.length > 0) {
            if (!o.verify(d, n)) return;
			creatediyform({id:d.id,diyformdata:n.f_data}).then(t => {
				0 == d.goods.isgift || "goods_detail" != i ? uni.redirectTo({
				    url: "/pages/order/createOrder?id=" + d.id + "&total=" + d.total + "&optionid=" + s + "&gdid=" + t.gdid + "&selectDate=" + l
				}) : g ?  uni.redirectTo({
				    url: "/pages/order/createOrder?id=" + d.id + "&total=" + d.total + "&optionid=" + s + "&gdid=" + t.gdid + "&giftid=" + g
				}) : "" != g ? (d.goods.giftinfo && 1 == d.goods.giftinfo.length && (g = d.goods.giftinfo[0].id), 
				d.goods.gifts && 1 == d.goods.gifts.length && (g = d.goods.gifts[0].id), 
				 uni.redirectTo({
				    url: "/pages/order/createOrder?id=" + d.id + "&total=" + d.total + "&optionid=" + s + "&gdid=" + t.gdid + "&giftid=" + g
				})) : uni.showToast({title:'请选择赠品',duration:600});
			})
        } else g ? uni.navigateTo({
            url: "/pages/order/createOrder?id=" + d.id + "&total=" + d.total + "&optionid=" + s + "&giftid=" + g
        }) : 0 == d.goods.isgift || "goods_detail" != i ? uni.navigateTo({
            url: "/pages/order/createOrder?id=" + d.id + "&total=" + d.total + "&optionid=" + s + "&selectDate=" + l
        }) : "" != g ? (d.goods.giftinfo && 1 == d.goods.giftinfo.length && (g = d.goods.giftinfo[0].id), 
        d.goods.gifts && 1 == d.goods.gifts.length && (g = d.goods.gifts[0].id), 
        uni.navigateTo({
            url: "/pages/order/createOrder?id=" + d.id + "&total=" + d.total + "&optionid=" + s + "&giftid=" + g
        })) : uni.showToast({title:'请选择赠品',duration:600});
    },
    getCart: function(t, d) {
        var i = d.data.optionid, s = d.data.goods.hasoption, r = d.data.diyform;
        if (s > 0 && !i) e.toast(d, "请选择规格"); else if (d.data.quickbuy) {
            if (r && r.fields.length > 0) {
                if (!o.verify(d, r)) return;
                d.setData({
                    formdataval: {
                        diyformdata: r.f_data
                    }
                });
            }
            d.addCartquick(i, d.data.total);
        } else if (r && r.fields.length > 0) {
            if (!o.verify(d, r)) return;
            a.post("order/create/diyform", {
                id: d.data.id,
                diyformdata: r.f_data
            }, function(t) {
                a.post("member/cart/add", {
                    id: d.data.id,
                    total: d.data.total,
                    optionid: i,
                    diyformdata: r.f_data
                }, function(t) {
                    0 == t.error ? (d.setData({
                        "goods.cartcount": t.cartcount,
                        active: "",
                        slider: "out",
                        isSelected: !0,
                        tempname: ""
                    }), e.toast(d, "添加成功")) : e.toast(d, t.message);
                });
            });
        } else a.post("member/cart/add", {
            id: d.data.id,
            total: d.data.total,
            optionid: i
        }, function(t) {
            if (0 == t.error) {
                e.toast(d, "添加成功");
                var a = d.data.goods;
                d.setData({
                    "goods.cartcount": t.cartcount,
                    active: "",
                    slider: "out",
                    isSelected: !0,
                    tempname: "",
                    goods: a
                });
            } else e.toast(d, t.message);
        });
    },
    selectpicker: function(o, d, i, s) {
        1 == o.currentTarget.dataset.home && d.$set(d,'giftid',"");
        var r = d.active, n = o.currentTarget.dataset.id;
        "" == r && (d.slider = 'in',d.show = !0),goodsgetPicker({id: n}).then(t => {
			if (t.goods.presellstartstatus || null == t.goods.presellstartstatus || "1" != t.goods.ispresell) {
				if ( t.goods.member_discount > 0 && d.$set(d,'member_discount',t.goods.member_discount) ,t.goods.presellendstatus || null == t.goods.presellstartstatus || "1" != t.goods.ispresell) {
					t.goods && t.goods.giftinfo && 1 == t.goods.giftinfo.length && d.$set(d,'giftid',t.goods.giftinfo[0].id)
				    var a = t.options;
				    if ("goodsdetail" == i) {
						if (d.pickerOption = t,d.canbuy = d.goods.canbuy,d.buyType = o.currentTarget.dataset.buytype,d.options = a, d.minpicker = i,
						d.$set(d.goods,'thistime',t.goods.thistime),0 != t.goods.minbuy && d.total < t.goods.minbuy) var r = t.goods.minbuy; else r = d.total; 
					}else if (d.pickerOption = t,d.goods = t.goods,d.options = a, d.minpicker =i, (d.optionid = !1 , d.specsData = [],d.specs = []), 0 != t.goods.minbuy && d.total < t.goods.minbuy) r = t.goods.minbuy; else r = 1;
					if(t.diyform) d.diyform = {fields: t.diyform.fields,f_data: t.diyform.lastdata},(d.id = n,d.pagepicker = i,d.total =r, d.specClass ='show',d.active = 'active', d.show = !0,d.modeltakeout =s)
				} else {
					uni.showToast({title:t.goods.presellstatustitle})
				}; 
			}else {uni.showToast({title:t.goods.presellstatustitle})};
		}) 
    },
    sortNumber: function(t, a) {
        return t - a;
    },
    specsTap: function(t, a) {
        var o = a.specs;
        o[t.idx] = {
            id: t.info.id,
            title: t.info.title
        };
        var d, i = "", s = [];
        o.forEach(function(t) {
            i += t.title + ";", s.push(t.id);
        });
        var r = s.sort(this.sortNumber);
        d = r.join("_");
        var n = a.data.options;
        "" != t.info.thumb && a.$set(a.goods,'thumb',t.info.thumb), n.forEach(function(t) {
            t.specs == d && (a.$set(a,"optionid",t.id),
			a.$set(a.goods,"total",t.stock),
			a.$set(a.goods,"maxprice",t.marketprice),
			a.$set(a.goods,"minprice",t.marketprice),
			a.$set(a.goods,"marketprice",t.marketprice),
			a.$set(a.goods,"member_discount",t.member_discount),
			a.$set(a.goods,"seecommission",t.seecommission),
			a.$set(a.goods,"presellprice",a.goods.ispresell > 0 ? t.presellprice : a.goods.presellprice),
			a.$set(a,"optionCommission",!0)), parseInt(t.stock) < parseInt(a.total) ? (a.$set(a,'canBuy',"库存不足"),a.$set(a,'stock',t.stock),uni.showModal({title:'库存不足'})) : (a.$set(a,'canBuy',''),a.$set(a,'stock',t.stock));
        }), a.$set(a,'specsData',o),a.$set(a,'specsTitle',i);
    }
};