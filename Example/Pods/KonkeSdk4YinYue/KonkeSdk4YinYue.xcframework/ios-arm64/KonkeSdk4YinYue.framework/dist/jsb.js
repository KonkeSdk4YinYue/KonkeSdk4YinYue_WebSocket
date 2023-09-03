const u = navigator.userAgent;
window.__is_android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
window.__is_ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

if (window.__is_android) window.__os = 'ANDROID';
else if (window.__is_ios) window.__os = 'IOS';
else window.__os = 'OTHER';

if (window.webkit?.messageHandlers?.jsb) {
  window.__has_jsb = true;
} else if (window.Android?.action) {
  window.__has_jsb = true;
} else {
  window.__has_jsb = false;
}
console.log(window.__has_jsb, '__has_jsb');

class jsb {
  invokeId = 0;
  callbackMap = {};

  constructor() {
  }

  invoke({scope, method, params, callback}) {
    console.log('JSB.invoke', scope, method, params);
    this.invokeId++;
    if (callback) {
      this.callbackMap[this.invokeId.toString()] = callback;
    }
    const msg = JSON.stringify({
      scope: scope,
      method: method,
      params: params,
      invokeId: this.invokeId,
    });
    console.log('msg', msg);
    if (window.__is_ios) {
      window.webkit?.messageHandlers.jsb.postMessage(msg);
    } else if (window.__is_android) {
      window.Android?.action(msg);
    } else {
      console.log('other platform');
    }
  }

  onResponse(responseBody, invokeId) {
    console.log('JSB.onResponse', responseBody, invokeId);
    const callback = this.callbackMap[invokeId.toString()];
    if (callback) {
      if (window.__is_android) {
        callback(JSON.parse(responseBody))
      } else {
        callback(responseBody);
      }
      delete this.callbackMap[invokeId.toString()];
    }
  }

  // helper methods

  scanQR() {
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'app',
        method: 'scanQR',
        callback: ({responseBody, success}) => {
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  getPageParams() {
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'currentPage',
        method: 'getPageParams',
        callback: ({responseBody, success}) => {
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  pickImage() {
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'currentPage',
        method: 'pickImage',
        callback: ({responseBody, success}) => {
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  async getToken() {
    if (!window.__has_jsb) {
      const userInfo = await this.getLoginUserInfo();
      const token = userInfo?.["userToken"]?.["accessToken"]
      return { token } // 兼容下面的
    }
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'app',
        method: 'getToken',
        callback: ({responseBody, success}) => {
          console.log("responseBody", responseBody);
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  async getLoginUserInfo() {
    if (!window.__has_jsb) {
      const json = localStorage.getItem('loginUserInfo');
      if (!json)  return null;
      return JSON.parse(json);
    }
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'app',
        method: 'getLoginUserInfo',
        callback: ({responseBody, success}) => {
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  async setLoginUserInfo(userinfo) {
    if (!window.__has_jsb) {
      console.log('setLoginUserInfo', userinfo);
      localStorage.setItem('loginUserInfo', JSON.stringify(userinfo));
      localStorage.setItem('token', userinfo?.["userToken"]?.["accessToken"])
      return;
    }
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'app',
        method: 'setLoginUserInfo',
        params: userinfo,
        callback: ({responseBody, success}) => {
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  getAppVersion() {
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'app',
        method: 'getAppVersion',
        callback: ({responseBody, success}) => {
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  getUserDefaults(key) {
    if (!window.__has_jsb) {
      const str = localStorage.getItem(key);
      if (!str) return Promise.resolve(null);
      return Promise.resolve(JSON.parse(str)?.["value"]);
    }
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'app',
        method: 'getUserDefaults',
        params: {key},
        callback: ({responseBody, success}) => {
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  setUserDefaults({key, value}) {
    if (!window.__has_jsb) {
      localStorage.setItem(key, JSON.stringify({value}));
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'app',
        method: 'setUserDefaults',
        params: {key, value},
        callback: ({responseBody, success}) => {
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  requestPermiss(params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      this.invoke({
        scope: 'app',
        method: 'permiss',
        params: params,
        callback: ({responseBody, success}) => {
          console.log('requestPermiss, responseBody ', responseBody, 'success', success)
          if (success !== true) {
            reject(responseBody);
          } else {
            resolve(responseBody);
          }
        },
      });
    });
  }

  push(params) {
    if (window.__has_jsb) {
      this.invoke({scope: 'window', method: 'push', params});
    } else {
      if (params.params) {
        const route = params.route + '?' + Object.keys(params.params).map(key => {
          return `${key}=${params.params[key]}`;
        }).join('&');
        window.location = route;
      } else {
        window.location = params.route;
      }
    }
  }

  replace(params) {
    if (window.__has_jsb) {
      this.invoke({scope: 'window', method: 'replace', params});
    } else {
      window.location = params.route;
    }
  }

  pop(params) {
    if (window.__has_jsb) {
      this.invoke({scope: 'window', method: 'pop',params});
    } else {
      window.history.back();
    }
  }

  /**
   * 请原生帮忙转发通知
   * @param { eventName } eventName 事件名称
   * @param { eventData } eventData 事件数据
   * @param { fromPage } fromPage 来源页面
   * @param { toPage } toPage 目标页面
   */
  forwardEvent({eventName, eventData, fromPage, toPage}) {
    this.invoke({
      scope: 'event_handler',
      method: 'forwardEvent',
      params: {eventName, eventData, fromPage, toPage},
    });
  }
}

class EventBus {
  events = {};

  constructor() {
  }

  emit(eventName, data) {
    console.log('EventBus.emit', eventName, data);
    if (data?.includes('{') || data?.includes('[')) {
      try {
        data = JSON.parse(data)
      }catch (e) {
      }

    }
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  }

  on(eventName, fn) {
    console.log('EventBus.on', eventName);
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }
}

window.__jsb = new jsb();
window.__eventBus = new EventBus();
