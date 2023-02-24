const db = require('@database/mysql')
const hashService = require('@services/hashService')

exports.find = async (userID) => {
    const [rows,fields] = await db.query(`
        SELECT *
        FROM users
        WHERE id=? LIMIT 1
    `, [userID])
    return rows.length > 0 ? rows[0] : false
}

exports.findByEmail = async (email) => {
    const [rows] = await db.query(`
        SELECT *
        FROM users
        WHERE email=? LIMIT 1
    `, [email])
    return rows.length === 1 ? rows[0] : null
}

exports.findAll = async (columns = []) => {
    // if we pass (id,full_name) to the function as an argument,
    // the value of sqlColumns will be [id,full_name], else it will be [*]
    // which means all records
    const sqlColumns = columns.length > 0 ? columns.join(',') : '*' 
    const [rows, fields] = await db.query(`
        SELECT ${sqlColumns}
        FROM users
        ORDER BY created_at DESC
    `)
    return rows
}

exports.create = async (userData) => {
    const hashedPassword = hashService.hashPassword(userData.password)
    const updatedUserData = {...userData, password: hashedPassword}
    const [result] = await db.query(`INSERT INTO users SET ?`, [updatedUserData])
    return result.insertId
}

exports.delete = async (userID) => {
    const [result] = await db.query(`DELETE FROM users WHERE id=? LIMIT 1`, [userID])
    return result.affectedRows > 0
}

exports.update = async (userID, updateFields) => {
    let updatedUserFields = {}

    // if new password entered
    if (Object.values(updateFields).includes("password")) {
        const hashedPassword = hashService.hashPassword(updateFields.password)
        updatedUserFields = {...updateFields, password: hashedPassword}
    }
    
    updatedUserFields = {...updateFields}
    const [result] = await db.query(`UPDATE users SET ? WHERE id=? LIMIT 1`, [updatedUserFields, userID])
    return result.affectedRows > 0
}