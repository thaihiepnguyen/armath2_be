import { NoteEntity } from "../entities/note.entity.js";
import db from "../util/db.js";

async function getNotesByUserId(userId: number): Promise<NoteEntity[] | undefined> {
    try {
        const sql = `
            SELECT n.*, l.name AS lesson_name
            FROM notes n
            JOIN user_notes un ON n.id = un.note_id
            JOIN lessons l ON n.lesson_id = l.lesson_id
            WHERE un.user_id = ?;
        `;
        const rawData = await db.raw(sql, [userId]);        
        return rawData.rows;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

async function addUserNote(userId: number, lessonId: number): Promise<boolean> {
    try {
        const noteSql = `
            SELECT id
            FROM notes
            WHERE lesson_id = ?;
        `;
        const noteData = await db.raw(noteSql, [lessonId]);
        if (noteData.rows.length === 0) {
            throw new Error(`No note found for lesson_id ${lessonId}`);
        }
        const noteId = noteData.rows[0].id;

        const sql = `
            INSERT INTO user_notes (user_id, note_id)
            VALUES (?, ?);
        `;
        await db.raw(sql, [userId, noteId]);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}


async function checkUserNoteExists(userId: number, lesson_id: number): Promise<boolean> {
    try {
        const noteSql = `
            SELECT id
            FROM notes
            WHERE lesson_id = ?;
        `;
        const noteData = await db.raw(noteSql, [lesson_id]);
        if (noteData.rows.length === 0) {
            return false;
        }
        const noteId = noteData.rows[0].id;

        const sql = `
            SELECT 1
            FROM user_notes
            WHERE user_id = ? AND note_id = ?;
        `;
        const rawData = await db.raw(sql, [userId, noteId]);
        return rawData.rows.length > 0;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export default {
    getNotesByUserId,
    addUserNote,
    checkUserNoteExists,
}
