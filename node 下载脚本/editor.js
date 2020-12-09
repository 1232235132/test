
let fs = require('fs')


// fs.readdir('./download',(err,files)=>{
//     files.forEach((filename)=>{
//         console.log(filename )

//         //  //运用正则表达式替换oldPath中不想要的部分
//         //  var oldPath = path + '/' + filename,
//          newPath = path + '/' + filename.replace(/_\d*/g, '')

//         //  fs.rename(oldPath, newPath, function(err) {
//         //      if (!err) {
//         //          console.log(filename + '副本替换成功!')
//         //      } 
//         //  })
//     })
// })
path = './download'
fs.readdir(path, (err, files) => {
    if (err) {
        console.error(err)
        return
    }
    files.forEach((filename) => {

        let oldPath = path + '/' + filename;
        let newPath = path + '/' + filename.replace(/_\d*/g, '');
        fs.rename(oldPath, newPath, function (err) {
            if (!err) {
                console.log(filename + '文件名称修改成功!')
            }
        })

    })


})