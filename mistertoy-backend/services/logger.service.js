// import fs from 'fs'

// export const loggerService = {
//     debug(...args) {
//         doLog('DEBUG', ...args)
//     },
//     info(...args) {
//         doLog('INFO', ...args)
//     },
//     warn(...args) {
//         doLog('WARN', ...args)
//     },
//     error(...args) {
//         doLog('ERROR', ...args)
//     }
// }

// const logsDir = './logs'

// if (!fs.existsSync(logsDir)) {
//     fs.mkdirSync(logsDir)
// }

// //define the time format
// function doLog(level, ...args) {

//     const strs = args.map(arg =>
//         (typeof arg === 'string' || _isError(arg)) ? arg : JSON.stringify(arg)
//     )
//     var line = strs.join(' | ')
//     line = `${_getTime()} - ${level} - ${line}\n`

//     console.log(line)
//     fs.appendFile(`${logsDir}/backend.log`, line, (err) => {
//         if (err) console.log('FATAL: cannot write to log file')
//     })
// }

// function _getTime() {
//     let now = new Date()
//     return now.toLocaleString('he')
// }

// function _isError(e) {
//     return e && e.stack && e.message
// }
import fs  from 'fs'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

export const logger = {
    debug(...args) {
        if (process.env.NODE_NEV === 'production') return
        _doLog('DEBUG', ...args)
    },
    info(...args) {
        _doLog('INFO', ...args)
    },
    warn(...args) {
        _doLog('WARN', ...args)
    },
    error(...args) {
        _doLog('ERROR', ...args)
    }
}

function _getTime() {
    let now = new Date()
    return now.toLocaleString('he')
}

function _isError(e) {
    return e && e.stack && e.message
}

function _doLog(level, ...args) {

    const strs = args.map(arg =>
        (typeof arg === 'string' || _isError(arg)) ? arg : JSON.stringify(arg)
    )

    var line = strs.join(' | ')
    line = `${_getTime()} - ${level} - ${line} \n`
    console.log(line)
    fs.appendFile('./logs/backend.log', line, (err) =>{
        if (err) console.log('FATAL: cannot write to log file')
    })
}