const db = require('@database/mysql')
const commentStatus = require('./commentStatus')


exports.findAll = async () => {
    // select all columns from table posts and its alias name will be p
    // select all columns from table users and its alias name will be s
    // Join
    const [rows,fields] = await db.query(`
        SELECT c.*,p.title
        FROM comments c
        JOIN posts p ON c.post_id=p.id
        ORDER BY c.created_at DESC
    `)
    return rows
}

// inserting a new post to the db
exports.create = async (postData) => {
    const [result] = await db.query(`INSERT INTO posts SET ?`, [postData])
    return result.insertId
}

// updating a post from db, by its ID
exports.update = async (postID, updateFields) => {
    const [result] = await db.query(`UPDATE posts SET ? WHERE id=? LIMIT 1`, [updateFields, postID])
    return result.affectedRows > 0
}

exports.approve = async (commentID) => {
    const [result] = await db.query(`UPDATE comments SET status=? WHERE id=? LIMIT 1`, [commentStatus.APPROVED, commentID])
    return result.affectedRows > 0
}

exports.reject = async (commentID) => {
    const [result] = await db.query(`UPDATE comments SET status=? WHERE id=? LIMIT 1`, [commentStatus.REJECTED, commentID])
    return result.affectedRows > 0
}

// deleting a commnet from db, by its ID
exports.delete = async (commentID) => {
    const [result] = await db.query(`DELETE FROM comments WHERE id=? LIMIT 1`, [commentID])
    return result.affectedRows > 0
}