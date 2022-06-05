// const { Client } = require('pg')
require('dotenv').config()
const { Pool } = require('pg')

console.log(typeof process.env, typeof process.env.PGPASSWORD, JSON.stringify(process.env))

// console.log(process.env)


const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
})

const express = require('express');
const app = express();

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))

app.get("/todos", async(req, res) => {
    const myResults = await readTodos();
    res.header('Content-Type', 'application/json');
    // res.send(JSON.stringify(myResults.rows));
    res.send(JSON.stringify(myResults))
});

app.listen(8080, () => console.log('web server listening on port 8080'))

start();

async function connect() {
    try {
        await pool.connect();
    } catch (e) {
        console.log(`failed to connect: ${e}`)
    }
}

async function start() {
    await connect()
}



async function readTodos() {
    try {
        const results = await pool.query("select * from test")
        return results.rows
    } catch (e) {
        return []
    }
}


// client.connect()
//     .then(() => client.query("select * from test"))
//     .then(results => console.table(results.rows))
//     .then(() => console.log("connected successfully"))
//     .catch(e => console.log(e))
//     .finally(() => client.end())
