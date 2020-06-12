const util = require('util')
var express = require('express')
var bodyParser = require('body-parser')
var helmet = require('helmet')
const exec = util.promisify(require('child_process').exec)

const app = express()
app.set('view engine', 'pug')
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Router
const globalRouter = express.Router()
globalRouter.get('/', (req, res) => {
    const Codes = '...'
    res.render('index', { Codes })
})
globalRouter.post('/ping', async (req, res) => {
    const cmdInput = req.body.addr
    const trueORfalse = cmdInput.match(/&|\||^|\(|\)|\;|\,/g)
    if (trueORfalse.length !== 1) {
        const Codes = "Fuck you"
        res.render('index', { Codes })
    } else {
        //cmd /c chcp 65001>nul && <- is for UTF-8 Encoding
        try {
            const { stdout, stderr } = await exec(`cmd /c chcp 65001>nul && cmd.exe /c "ping -n 1 ${cmdInput}"`)
            const Codes = stdout
            res.render('index', { Codes })
        } catch (err) {
            console.log(err)
            const Codes = err
            res.render('index', { Codes })
        }
    }
})


app.use('/', globalRouter)

const port = 3000
const handleListening = () => console.log(`Linstening on : http://localhost:${port}`)
app.listen(port, handleListening)