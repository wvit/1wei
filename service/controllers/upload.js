const { server } = require('../configs/serverConfig');
const statusCode = require('../configs/statusCode');

class File {
  // 添加文件
  async upload(ctx) {
    const { filename } = ctx.req.file;
    ctx.body = {
      code: statusCode.success,
      data: {
        path: `${server.address}/uploadFiles/${filename}`,
        filename,
      },
      msg: '上传成功'
    }
  }
}

module.exports = new File();