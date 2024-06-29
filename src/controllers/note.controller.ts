import { Request, Response } from 'express';
import noteService from "../services/note.service.js";

async function getAllNotes(req: Request, res: Response): Promise<any> {
    try {
        const { metadata } = req.body;
        const userId = metadata?.uid;
        if (!userId) {
            return res.status(400).json({
                isSuccessful: false,
                message: "userId is required"
            });
        }
        const notes = await noteService.getNotesByUserId(userId);
        if (!notes) {
            return res.status(500).json({
                isSuccessful: false,
                message: "Internal server error"
            });
        }

        return res.status(200).json({
            isSuccessful: true,
            message: notes && notes.length > 0 ?
                `Notes for user id ${userId} are found` :
                `Notes for user id ${userId} are not found`,
            data: notes
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal error`
        });
    }
}

async function addUserNote(req: Request, res: Response): Promise<any> {
    try {
        const { metadata } = req.body;
        const userId = metadata?.uid;
        const { lessonId } = req.body;
        
        if (!userId || !lessonId) {
            return res.status(400).json({
                isSuccessful: false,
                message: "userId and lessonId are required"
            });
        }

        const isAdded = await noteService.addUserNote(userId, lessonId);
        if (!isAdded) {
            return res.status(500).json({
                isSuccessful: false,
                message: "Internal server error"
            });
        }

        return res.status(201).json({
            isSuccessful: true,
            data:{
                isAdded: true
            },
            message: `Note with lesson_id ${lessonId} was successfully added to user with id ${userId}`
        });
    } catch (error) {
        return res.status(500).json({
            isSuccessful: false,
            message: `Internal error`
        });
    }
}

async function checkUserNoteExists(req: Request, res: Response): Promise<any> {
    try {
        const { metadata } = req.body;
        const userId = metadata?.uid;
        const { lessonId } = req.body;
        if (!userId || !lessonId) {
            return res.status(400).json({
                isSuccessful: false,
                message: "userId and lessonId are required"
            });
        }

        const exists = await noteService.checkUserNoteExists(userId, lessonId);
        return res.status(200).json({
            isSuccessful: true,
            message: exists ? `Note with id ${lessonId} exists for user with id ${userId}` : `Note with lesson id ${lessonId} does not exist for user with id ${userId}`,
            data: { exists: exists }
        });
    } catch (error) {
        return res.status(500).json({
            isSuccessful: false,
            message: `Internal error`
        });
    }
}

export default {
    getAllNotes,
    addUserNote,
    checkUserNoteExists,
}
