import url from './url';
import { post, get, put, deleted } from './http'

/**
 * 登录
 * @param {String} username 
 * @param {String} password 
 */
export function loginAsAdmin(username,password) {
    const admin = {
        Username: username ,
        Password: password ,
    }
    return post({
        url: url.GET_AUTH,
        method: 'post',
        data: admin
    })
}
/**
 * token的存取和删除
 */
export function setToken(key,value) {
    localStorage.setItem(key,JSON.stringify(value));
}
export function getToken(key) {
    return localStorage.getItem(key); 
}
export function removeToken(key) {
    localStorage.removeItem(key);
}

/**
 * 上传凭证
 * @param {String} fileName 
 */
export function getUploadToken(fileName) {
    var token = JSON.parse(getToken("loginToken"));
    return get({
        url: `${url.UPLOAD}?fileName=${fileName}`,
        methosd: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}
/**
 * 获取背景图片
 */
export function getBackGround() {
    return get({
        url: url.BACKGROUND,
        method: 'get',
    })
}

/**
 * 获取上传地址和cdn域名
 */
export function getDomain() {
    return get({
        url: url.DOMAIN,
        method: 'get',
    })
}

/**
 * 事件
 */
export function getAllStories() {
    return get({
        url: url.STORY,
        method: 'get'
    })
}

/**
 * 获取事件
 * @param {String} data 
 */
export function getOneStory(data) {
    return get({
        url:`${url.STORY}/${data}`,
        method: 'get',
        
    })
}
/**
 * 增加事件
 * @param {String} time 
 * @param {String} name 
 * @param {String} des 
 */
export function addStory(time,name,des) {
    const data = {
        timeStamp: time,
        name: name,
        storyDescribe: des
    }
    var token = JSON.parse(getToken("loginToken"));
    return post({
        url: url.STORY,
        method: 'post',
        data: data,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}
/**
 * 修改事件
 * @param {number} time 
 * @param {string} name 
 * @param {string} des 
 * @param {string} id 
 */
export function changeStory(time,name,des,id) {
    const data = {
        timeStamp: time,
        name: name,
        storyDescribe:des
    }
    var token = JSON.parse(getToken("loginToken"));
    return put({
        url: `${url.STORY}/${id}`,
        method: 'put',
        data: data,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}
/**
 * 删除事件
 * @param {string} id 
 */
export function deleteStory(id) {
    var token = JSON.parse(getToken("loginToken"));
    return deleted({
        url: `${url.STORY}/${id}`,
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}








/**
 * 产品
 */
export function getAllProducts() {
    console.log("产品")
    return get({
        url: url.PRODUCT,
        method: 'get'
    })
}

/**
 * 获取产品
 * @param {number} id 
 */
export function getProduct(id) {
    return get({
        url:`${url.PRODUCT}/${id}`,
        method: 'get',
    })
}

/**
 * 添加产品
 * @param {String} name
 * @param {String} littleDescribe
 * @param {String} describe 
 * @param {String} partner 
 * @param {String} partnerLogo
 * @param {String} urlAvatar
 * @param {String} backGroundId 
 * @param {String} urlScreenshot
 * @param {String} projectType 
 * @param {String} QRCode
 */
export function addProduct(name, littleDescribe, describe, partner, 
urlPartnerLogo, urlAvatar, urlBackground, urlScreenshot, productType, urlProCode) {
    const data = {
        name: name,
        littleDescribe: littleDescribe,
        describe: describe,
        partner: partner,
        urlPartnerLogo: urlPartnerLogo,
        urlAvatar: urlAvatar,
        urlBackground: urlBackground,
        urlScreenshot: urlScreenshot,
        projectType: productType,
        urlProCode: urlProCode,
    }
    var token = JSON.parse(getToken("loginToken"));
    return post({
        url: url.PRODUCT,
        method: 'post',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`

        }
    })
}

/**
 * 修改产品
 * @param {产品名字} name:String
 * @param {简要描述} littleDescribe:String 
 * @param {详细描述} describe :String
 * @param {合作方} partner :String
 * @param {合作方图标url} partnerLogo:String 
 * @param {产品图标} urlAvatar :String
 * @param {背景id} backGroundId :String
 * @param {产品截图数组url} urlScreenshot:Array 
 * @param {产品类型} projectType :String
 * @param {二维码url} QRCode :String
 */
export function changeProduct(name, littleDescribe, describe, partner, urlPartnerLogo, urlAvatar, urlBackground, urlScreenshot, projectType, urlProCode, id) {
    const data = {
        name: name,
        littleDescribe: littleDescribe,
        describe: describe,
        partner: partner,
        urlPartnerLogo: urlPartnerLogo,
        urlAvatar: urlAvatar,
        urlBackground: urlBackground,
        urlScreenshot: urlScreenshot,
        projectType: projectType,
        urlProCode: urlProCode,
    }
    var token = JSON.parse(getToken("loginToken"));
    return put({
        url: `${url.PRODUCT}/${id}`,
        method: 'put',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`

        }
    })
}

/**
 * 删除产品
 * @param {产品id} id 
 */
export function deleteProduct(id) {
    var token = JSON.parse(getToken("loginToken"));
    return deleted({
        url: `${url.PRODUCT}/${id}`,
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}


/**
 * 成员
 */
export function getAllMembers() {
    return get({
        url: url.MEMBER,
        method: 'get'
    })
}

/**
 * 获取成员信息
 * @param {number} id 
 */
export function getMember(id) {
    return get({
        url:`${url.MEMBER}/${id}`,
        method: 'get'
    })
}

/**
 * 添加成员
 * @param {string} name 
 * @param {number} schoolYear 
 * @param {string} describe 
 * @param {number} memberType 
 * @param {string} teacherInfo 
 * @param {string} urlAvatar 
 */
export function addMember(name, schoolYear, describe, memberType, teacherInfo, urlAvatar) {
    const data = {
        name: name,
        schoolYear: schoolYear,
        describe: describe,
        memberType: memberType,
        teacherInfo: teacherInfo,
        urlAvatar: urlAvatar
    }
    var token = JSON.parse(getToken("loginToken"));
    return post({
        url: url.MEMBER,
        method: 'post',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
/**
 * 修改成员
 * @param {string} name 
 * @param {number} schoolYear 
 * @param {string} describe 
 * @param {number} memberType 
 * @param {string} teacherInfo 
 * @param {string} urlAvatar 
 * @param {number} id
 */
export function changeMember(name, schoolYear, describe, memberType, teacherInfo, urlAvatar, id) {
    const data = {
        name: name,
        schoolYear: schoolYear,
        describe: describe,
        memberType: memberType,
        teacherInfo: teacherInfo,
        urlAvatar: urlAvatar
    }
    var token = JSON.parse(getToken("loginToken"));
    return put({
        url: `${url.MEMBER}/${id}`,
        method: 'put',
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
/**
 * 删除成员
 * @param {成员id} id 
 */
export function deleteMember(id) {
    var token = JSON.parse(getToken("loginToken"));
    return deleted({
        url: `${url.MEMBER}/${id}`,
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}

/**
 * 获取日志信息
 * @param {number} size
 * @param {number} index 
 */
export function getLog(size, index) {
    return get({
        url:`${url.LOG}?pageSize=${size}&pageIndex=${index}`,
        method: 'get'
    })
}