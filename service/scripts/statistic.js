const TencentUsers = require('../models/tencentUsers');
const ReqLogs = require('../models/reqLogs');
const nodeMailer = require('nodemailer');
const { smtp } = require('../configs/serverConfig');
const { getDate } = require('../utils/util');

class Statistic {
  constructor() {
    this.tencentUserLog();
    this.reqLog();
  }
  // 腾讯用户记录
  async  tencentUserLog() {
    const queryRule = {
      addTime: {
        $regex: new RegExp(getDate(Date.now()), 'i')
      }
    };
    const userIds = await TencentUsers.find(queryRule).distinct('openId');
    const users = [];
    const userLogs = [];

    new Promise(resolve => {
      userIds.forEach(async item => {
        const user = await TencentUsers.findOne({ openId: item });
        const userAll = await TencentUsers.find({ openId: item, ...queryRule });
        const userLog = [];
        userAll.forEach(userAllItem => userLog.push(userAllItem.addTime));
        userLogs.push(userLog);
        users.push(user);
        if (users.length === userIds.length) resolve();
      })
    }).then(() => {
      const setUserLog = index => {
        let userLog = '';
        userLogs[index].forEach(item => {
          userLog += `<option>${item}</option> `;
        });
        return userLog;
      };
      let list = '';
      users.forEach((item, index) => {
        list += `
              <tr>
                <td>${item.nickName}</td>
                <td>${item.province} ${item.city}</td>
                <td>${item.type}</td>
                <td>
                  <select style='-webkit-appearance:none;background:#fff;'>
                    ${setUserLog(index)}
                  </select>
                </td>
                <td>${item.gender === 1 ? '男' : '女'}</td>
                <td><a href='${item.avatarUrl}'>查看</a></td>
              </tr>`;
      });
      const html = `
        <table style='width:100%;text-align:center;font-size:12px;'>
          <tr>
            <th>昵称</th>
            <th>地址</th>
            <th>类型</th>
            <th>访问记录</th>
            <th>性别</th>
            <th>头像</th>
          </tr>
          ${list}
        </table>
        `;
      const { host, port, user, pass } = smtp;
      const mailOption = {
        from: `1wei数据统计 <${user}>`,
        to: '1083926534@qq.com',
        subject: '腾讯用户访客统计',
        html
      };
      const transporter = nodeMailer.createTransport({
        host,
        port,
        secure: false,
        auth: { user, pass }
      });
      transporter.sendMail(mailOption);
    });
  }
  // 用户请求接口记录
  async reqLog() {
    const queryRule = {
      reqDate: {
        $regex: new RegExp(getDate(Date.now()), 'i')
      }
    };
    const logIps = await ReqLogs.find(queryRule).distinct('ip');
    const logs = [];
    const logDates = [];
    const logReqUrls = [];

    new Promise(resolve => {
      logIps.forEach(async item => {
        const log = await ReqLogs.findOne({ ip: item });
        const logItemAll = await ReqLogs.find({ ip: item, ...queryRule });
        const logDate = [];
        const logReqUrl = [];
        logItemAll.forEach(logItem => {
          logDate.push(logItem.reqDate);
          logReqUrl.push(logItem.url);
        });
        logDates.push(logDate);
        logReqUrls.push(logReqUrl);
        logs.push(log);
        if (logs.length === logIps.length) resolve();
      })
    }).then(() => {
      const setLogDate = index => {
        let logData = '';
        logDates[index].forEach(item => {
          logData += `<option>${item}</option> `;
        });
        return logData;
      };
      const setLogReqUrl = index => {
        let logReqUrl = '';
        logReqUrls[index].forEach(item => {
          logReqUrl += `<option>${item}</option> `;
        });
        return logReqUrl;
      };
      let list = '';
      logs.forEach((item, index) => {
        list += `
              <tr>
                <td>${item.ip}</td>
                <td>${item.city}</td>
                <td>
                <select style='-webkit-appearance:none;background:#fff;'>
                  ${setLogReqUrl(index)}
                </select>
              </td>
                <td>
                  <select style='-webkit-appearance:none;background:#fff;'>
                    ${setLogDate(index)}
                  </select>
                </td>
                <td>${item.userAgent}</td>
              </tr>`;
      });
      const html = `
        <table style='width:100%;text-align:center;font-size:12px;'>
          <tr>
            <th>ip</th>
            <th>地址</th>
            <th>接口</th>
            <th>时间</th>
            <th>设备</th>
          </tr>
          ${list}
        </table>
        `;
      const { host, port, user, pass } = smtp;
      const mailOption = {
        from: `1wei数据统计 <${user}>`,
        to: '1083926534@qq.com',
        subject: '接口访问统计',
        html
      };
      const transporter = nodeMailer.createTransport({
        host,
        port,
        secure: false,
        auth: { user, pass }
      });
      transporter.sendMail(mailOption);
    });
  }
}

module.exports = new Statistic();