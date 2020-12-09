


//下载参数
var http = require("http");
var fs = require("fs");
var {data , data2} = require("./data");
var downFlag = false;

/**
 * 下载回调
 */
function getHttpReqCallback(imgSrc, dirName, fileName) {

    var callback = function (res) {
        console.log("request: " + imgSrc + " return status: " + res.statusCode);
        var contentLength = parseInt(res.headers['content-length']);

        var downLength = 0;

        var out = fs.createWriteStream(dirName + "/" + fileName);
        res.on('data', function (chunk) {

            downLength += chunk.length;
            var progress = Math.floor(downLength * 100 / contentLength);
            var str = "下载：" + progress + "%";
            console.log(str);

            //写文件
            out.write(chunk, function () {
                //console.log(chunk.length);

            });

        });
        res.on('end', function () {
            downFlag = false;
            console.log("end downloading " + imgSrc);
            if (isNaN(contentLength)) {
                console.log(imgSrc + " content length error");
                return;
            }
            if (downLength < contentLength) {
                console.log(imgSrc + " download error, try again");
                return;
            }
        });
    };

    return callback;
}

/**x
 * 下载开始
 */
function startDownloadTask(imgSrc, dirName, fileName) {
    console.log("start downloading " + imgSrc);
    var req = http.request(imgSrc, getHttpReqCallback(imgSrc, dirName, fileName));
    req.on('error', function (e) {
        console.log("request " + imgSrc + " error, try again");
    });
    req.end();
}

// startDownloadTask('下载地址', '本地存储路径', '文件名');

// data.forEach(({ name, url }, index) => { 
//     console.log(`下载第${index}个总数：${data.length}`);
//     startDownloadTask(url, '/Users/zhenglifeng/Downloads/test/download', name  + '_' +  index + '.pdf');
// })
 
data2.forEach(({ name, url }, index) => { 
    console.log(`下载第${index}个总数：${data.length}`);
    startDownloadTask(url, '/Users/zhenglifeng/Downloads/test/说明文档', name  + '.pdf');
})
 
