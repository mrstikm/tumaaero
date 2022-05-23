

const Sybase = require('sybase-promised')
const db = new Sybase({
    host: '192.168.100.2',
    port: 5000,
    dbname: 'presneobrabeni',
    username: 'PANEL',
    password: '20Panel20'
})

let stopQuery = false

const getData = async () => {
    if(!stopQuery) {
        console.log('spoustim!');
        stopQuery = true
        try {
            await db.connect()
            let result = await db.query('SELECT * FROM D3000S.USER_Report1')
            await db.disconnect()
            stopQuery = false
            console.log(result);
            return result
        } catch(error) {
            console.log(error);
        }
    }
}
// getData()
// setTimeout(() => { getData() },2000 )

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.get("/report1", async (req, res, next) => {
    let data = await getData()
    // console.log(data);
    res.json(data);
   });

app.listen(3001, () => {
    console.log('Server running');
})