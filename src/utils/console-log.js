import debug from 'debug'

// 通过配置 DEBUG 值来控制打印哪些日志，例如 DEBUG = console，那么只打印 logName 为 console 的日志
// 如果 DEBUG = console* 那么就会打印 logName 以 console 开头的所有日志，如 console:cabinfo，console:manual 等
localStorage.debug = process.env.VUE_APP_LOG_DEBUG

/**
 * 1. 支持 chrome devtools console 日志彩色打印；
 * 2. 支持日志分类打印
 * 3. 通过配置 DEBUG 的值，来控制哪些日志打印、哪些不打印；
 */
export default class ConsoleLog {
    constructor(logName) {
        this.debug = debug(logName)
    }
    /**
     * 冗余的、重视度不高的信息
     * @param {string} msg 要输出的日志信息
     */
    verbose(msg) {
        this.debug('VERBOSE', msg)
    }
    /**
     * 有一定重视度的提示信息
     * @param {string} msg 要输出的日志信息
     */
    info(msg) {
        this.debug('%cINFO', 'background-color:blue; color:white', msg)
    }
    /**
     * 比较重要的警告的信息
     * @param {string} msg 要输出的日志信息
     */
    warn(msg) {
        this.debug('%cWARN', 'background-color:yellow; color:gray', msg)
    }
    /**
     * 重视度最高的错误的信息
     * @param {string} msg 要输出的日志信息
     */
    error(msg) {
        this.debug('%cERROR', 'background-color:red; color:white', msg)
    }
}
