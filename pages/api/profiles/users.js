const db = require('../../../lib/db')
const escape = require('sql-template-strings')
import {setOptions, getSession} from 'next-auth/client'

setOptions({site: process.env.SITE})

module.exports = async (req, res) => {
    const session = await getSession({req})

    if (!session || !session.user) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const users = await db.query(escape`
    SELECT *
    FROM users
  `)
    res.status(200).json({users})
}
