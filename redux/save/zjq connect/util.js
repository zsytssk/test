
export function uuid() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

export function getIn(store, path) {
	var paths = path.split(".");
	var obj = store.getState();
	for (let i=0,len=paths.length; i<len; i++) {
		obj = obj[paths[i]];
		if (obj===undefined) break;
	}
	return obj;
}

export function random(max, min) {
	min = min || 0;
	return min + Math.round(Math.random() * (max-min));
}

/**
 * 数字千分位格式化
 */
export function toThousands(num) {
    var result = '', counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) { result = ',' + result; }
    }
    return result;
}

 export function getCharLength(str) {
	var str_length = 0;
	var str_len = 0;
	str_len = str.length;
	for (var i = 0; i < str_len; i++) {
	var a = str.charAt(i);
	str_length++;
	if (escape(a).length > 4) {
	  str_length++;
	}
	}
	return str_length;
}
  
 export function ellipsis(str, len) {
    var str_length = 0;
    var str_len = 0;
    var str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        var a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    if (str_length < len) {
        return str;
    }
};

export function getBetSpan(value, desc) {
	var st = 1;
	if (desc) { 
		if (value>=250 && value<=1000) {
			st = 250;
		} else if (value>1000 && value<=10000) {
			st = 1000;
		} else if (value>10000 && value<=100000) {
			st = 10000;
		} else if (value>100000 && value<=500000) {
			st = 100000;
		} else if (value>500000) {
			console.warn("最大500000");
			st = 100000;
		}
	} else {
		if (value>=250 && value<1000) {
			st = 250;
		} else if (value>=1000 && value<10000) {
			st = 1000;
		} else if (value>=10000 && value<100000) {
			st = 10000;
		} else if (value>=100000 && value<=500000) {
			st = 100000;
		} else if (value>500000) {
			console.warn("最大500000");
			st = 100000;
		}
	}
	return st;
}

export function grayFilter(n) {
	n = n || 0;
	var grayMat = [
		0.3086*(1-n)+n, 0.6094*(1-n), 0.0820*(1-n), 0, 0,
		0.3086*(1-n), 0.6094*(1-n)+n, 0.0820*(1-n), 0, 0,
		0.3086*(1-n), 0.6094*(1-n), 0.0820*(1-n)+n, 0, 0,
		0, 0, 0, 1, 0
	];
	return new Laya.ColorFilter(grayMat);
}

export function lightFilter(n) {
	n = n || 0;
	var lightMat = [
		n, 0, 0, 0, 0,
		0, n, 0, 0, 0,
		0, 0, n, 0, 0,
		0, 0, 0, 1, 0
	];
	return new Laya.ColorFilter(lightMat);
}


let _env = "product";
if (/^https?:\/\/\w+\d*(\-wap\.stg\d+\.)[A-Za-z0-9]+(\.com)/.test(location.href)) {
    _env = "dev";
} else if(/^https?:\/\/\d*\.\d*\.\d*\.\d*/.test(location.href) || /^https?:\/\/localhost.*/.test(location.href) || /^file:\/\//.test(location.href)) {
    _env = "local";
} else {
    _env = "product";
}
export const env = _env;


export function checkLogin() {
	if (env==="local") { return true; }
	if (GM && GM.userLogged) {
		return true;
	} else {
		return false;
	}
}

export function toLogin() {
	if (GM && GM.userLoginUrl) {
		return location.href = GM.userLoginUrl;
	}
}


export function drawRoundRectComplex(graphics, x, y, w, h, rTL, rTR, rBR, rBL, fillStyle) {
    var max = (w<h?w:h)/2;
    var mTL=0, mTR=0, mBR=0, mBL=0;

    if (rTL < 0) { rTL *= (mTL=-1); }
    if (rTL > max) { rTL = max; }
    if (rTR < 0) { rTR *= (mTR=-1); }
    if (rTR > max) { rTR = max; }
    if (rBR < 0) { rBR *= (mBR=-1); }
    if (rBR > max) { rBR = max; }
    if (rBL < 0) { rBL *= (mBL=-1); }
    if (rBL > max) { rBL = max; }

    graphics.drawPath(x,y,
        [
            ["moveTo", w-rTR, 0],
            ["arcTo", w+rTR*mTR, -rTR*mTR, w, +rTR, rTR],
            ["lineTo", w, +h-rBR],
            ["arcTo", w+rBR*mBR, +h+rBR*mBR, w-rBR, +h, rBR],
            ["lineTo", rBL, +h],
            ["arcTo", x-rBL*mBL, +h+rBL*mBL, x, +h-rBL, rBL],
            ["lineTo", x, +rTL],
            ["arcTo", x-rTL*mTL, -rTL*mTL, rTL, 0, rTL],
            ["closePath"]
        ], {fillStyle: fillStyle}
    );

};

export function drawRoundRect(graphics, x, y, w, h, radius, fillStyle) {
    return tools.drawRoundRectComplex(graphics, x, y, w, h, radius, radius, radius, radius, fillStyle);
};

export function loadBoneAni(resk, contanier, prpos) {
	var mFactory = new Laya.Templet();
	prpos = prpos || {};
	mFactory.on(Laya.Event.COMPLETE, this, function() {
		var mArmature = mFactory.armature = mFactory.buildArmature(0);
		if (prpos.x) mArmature.x = prpos.x;
		if (prpos.y) mArmature.y = prpos.y;
		contanier.addChild(mArmature);
		if (prpos.autoPlay!==false) mArmature.play(0, true);
	});
	mFactory.loadAni(resk);
	return mFactory;
}