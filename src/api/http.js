import Axios from 'axios'

let axiosIns = Axios.create({
    timeout: 30*1000
})
axiosIns.defaults.headers.post['X-Requested-with'] = 'XMLHttpRequest';
axiosIns.defaults.headers.get['X-Requested-with'] = 'XMLHttpRequest';
axiosIns.defaults.responseType = 'json';
axiosIns.defaults.validateStatus = function() {
    return true;
}
export default {
    axiosIns
}

/**
 * get请求
 * @param {*} options
 * @returns {Promise} 
 */
export function get(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
    })
}
/**
 * post请求
 * @param options
 * @return {Promise}
 */
export function post(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
    })
}
/**
 * put请求
 * @param options
 * @returns {Promise}
 */
export function put(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
    })
}
/**
 * delete请求
 * @param options
 * @returns {Promise}
 */
export function deleted(options) {
    return new Promise((resolve, reject) => {
        axiosIns(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}