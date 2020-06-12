const { exec } = require('child_process')

const cmdInput = "/../../../../windows/system32/calc.exe"
export const runCmd = exec(`cmd.exe /c "ping 127.0.0.1${cmdInput}"`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`)
        return
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
    }
    console.log(`stdout: ${stdout}`)
})