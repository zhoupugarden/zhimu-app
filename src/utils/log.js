// log.js
const VERSION = "0.0.1"; // 业务代码版本号，用户灰度过程中观察问题
const canIUseLogManage = wx.canIUse("getLogManager");
const logger = canIUseLogManage ? wx.getLogManager({level: 0}) : null;
var realtimeLogger = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
/**
 * @param {string} file 所在文件名
 * @param  {...any} arg 参数
 */
export function DEBUG(file, ...args) {
  console.debug(file, " | ", ...args);

  if (!canIUseLogManage) {
    logger.debug(`[${VERSION}]`, file, " | ", ...args);
  }
  realtimeLogger && realtimeLogger.info(`[${VERSION}]`, file, " | ", ...args);
}
/**
 *
 * @param {string} file 所在文件名
 * @param  {...any} arg 参数
 */
export function RUN(file, ...args) {
  console.log(file, " | ", ...args);
  if (!canIUseLogManage) {
    logger.log(`[${VERSION}]`, file, " | ", ...args);
  }
  realtimeLogger && realtimeLogger.info(`[${VERSION}]`, file, " | ", ...args);
}
/**
 *
 * @param {string} file 所在文件名
 * @param  {...any} arg 参数
 */
export function ERROR(file, ...args) {
  console.error(file, " | ", ...args);

  console.log("canIUseLogManage", canIUseLogManage)
  console.log("realtimeLogger", realtimeLogger)

  if (!canIUseLogManage) {
    logger.warn(`[${VERSION}]`, file, " | ", ...args);
  }
  if (realtimeLogger) {
    realtimeLogger.error(`[${VERSION}]`, file, " | ", ...args);
    // 判断是否支持设置模糊搜索
    // 错误的信息可记录到 FilterMsg，方便搜索定位
    if (realtimeLogger.addFilterMsg) {
      try {
        realtimeLogger.addFilterMsg(
          `[${VERSION}] ${file} ${JSON.stringify(args)}`
        );
      } catch (e) {
        realtimeLogger.addFilterMsg(`[${VERSION}] ${file}`);
      }
    }
  }
}
// 方便将页面名字自动打印
export function getLogger(fileName) {
  return {
    DEBUG: function(...args) {
      DEBUG(fileName, ...args);
    },
    RUN: function(...args) {
      RUN(fileName, ...args);
    },
    ERROR: function(...args) {
      ERROR(fileName, ...args);
    }
  };
}
