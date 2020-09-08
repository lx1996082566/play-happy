
let $http = (function (global) {
    //格式化请求参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }
    return function (options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        let params = formatParams(options.params);
        let httpRequest;
        if (global.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
            httpRequest = new global.XMLHttpRequest()
        } else if (global.ActiveXObject) { // IE 6 and older
            httpRequest = new global.ActiveXObject("Microsoft.XMLHTTP")
        }
        if (!httpRequest) {
            throw new Error('Cannot create an XMLHTTP instance')
        }
        httpRequest.onreadystatechange = function () {
            // Process the server response here.
            // XMLHttpRequest.DONE（对应于4）
            // 0（未初始化）或（请求未初始化）
            // 1（正在加载）或（已建立服务器连接）
            // 2（已加载）或（已收到请求）
            // 3（交互式）或（处理请求）
            // 4（完成）或（请求已完成，响应已准备就绪）
            if (httpRequest.readyState === 4) {
                // Everything is good, the response was received.
                if (httpRequest.status === 200) {
                    // httpRequest.responseText –以文本字符串形式返回服务器响应
                    // httpRequest.responseXML–将响应作为XMLDocument可以使用JavaScript DOM函数遍历的对象返回
                    options.success && options.success(httpRequest.responseText, httpRequest.responseXML);
                } else {
                    // There was a problem with the request.
                    // For example, the response may have a 404 (Not Found)
                    // or 500 (Internal Server Error) response code.
                    options.error && options.error(httpRequest.status);
                }
            } else {
                // Not ready yet.
            }
        }
        // httpRequest.open('POST', 'http://www.example.org/some.file', true);
        // httpRequest.send();
        // httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        if (options.type === 'GET') {
            httpRequest.open('GET', options.url + "?" + params, true);
            //Content-type数据请求的格式
            options.dataType === 'json' && httpRequest.setRequestHeader('Content-type', 'application/json');
            httpRequest.send(null)
        } else if (options.type === 'POST') {
            httpRequest.open('POST', options.url, true);
            //Content-type数据请求的格式
            options.dataType === 'json' && httpRequest.setRequestHeader('Content-type', 'application/json');
            //设置表单提交时的内容类型
            //Content-type数据请求的格式
            // httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            httpRequest.send(options.body ? JSON.stringify(options.body) : null);
        }
        //设置有效时间
        setTimeout(function () {
            if (httpRequest.readySate !== 4) {
                httpRequest.abort();
            }
        }, options.timeout || 10000)
    }
})(window)

export default $http

