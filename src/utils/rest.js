import axios from 'axios'


const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

class Rest {

  constructor() {}

  static get(options) {
    options.method = 'GET';
    return Rest.executeRequest(options);
  }

  static create(options) {
    options.method = 'POST';
    return Rest.executeRequest(options);
  }

  static executeRequest({url, pathVariables, data, json, file, method, config}) {
    return new Promise(
      (resolve, reject) => {
        if (!json && method != 'GET' && !file) {
          data = Rest.formDataString({...data, '_method': method});
          method = 'POST';
        }

        let options = Object.assign({headers: {}}, config, {
          url: Rest.formatUrl(url, pathVariables),
          data,
          params: (method === 'GET') ? data : {},
          method,
          responseType:'json'
        });

        options.headers['X-Requested-With'] = 'XMLHttpRequest';
        options.headers['Content-Type'] = json ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded';
        // options.headers['Content-Type'] = file ? 'multipart/form-data' : 'application/x-www-form-urlencoded';


      //  执行请求
        service(options).then(
          response => {
            resolve(response.data);
          }
        ).catch(
          response => {
            const error = response.response;
            Rest.handleError(error);
            reject(error);
          }
        );

      }
    );
  }

  static handleError(error) {
    const status = error.status;
    console.log(status);
    if (400 === status) {
      alert('400 : bad request');
    }
  }

  static formatUrl(url, pathVariables) {
    console.log(pathVariables);

    if (!pathVariables) {
      return url;
    }

    // 查找 {{、}}、或者 {name}，然后进行替换
    // m 是正则中捕获的组 $0，即匹配的整个子串
    // n 是正则中捕获的组 $1，即 () 中的内容
    // function($0, $1, $2, ...)
    return url.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n) {
      if (m == '{{') { return '{'; }
      if (m == '}}') { return '}'; }

      return pathVariables[n];
    });
  }

  static formDataString(data) {
    return [...Object.keys(data)].map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
  }

}
export default Rest;
