import {Request, Response} from "express";
import firebase from "../utils/firebase.util.js";


function uploadUserAvatar(req: Request, res: Response) {
  if(!req.file) {
    return res.status(400).send({
      message: "Error: No file found",
      isSuccessful: false
    })
  }

  const { metadata } = req.body
  const uid = metadata?.uid
  if (!uid) {
    return res.status(400).send({
      message: "Error: No user found",
      isSuccessful: false
    })
  }

  const blob = firebase.bucket.file('users/' + uid)

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    }
  })

  blobWriter.on('error', (err) => {
    console.log(err)
  })

  blobWriter.on('finish', () => {
    res.status(200).send({
      message: "Upload successful",
      isSuccessful: true
    })
  })

  blobWriter.end(req.file.buffer)
}

function getUserAvatar(req: Request, res: Response) {
  try {
    const { metadata } = req.body
    const uid = metadata?.uid
    if (!uid) {
      return res.status(400).send({
        message: "Error: No user found",
        isSuccessful: false
      })
    }

    const blob = firebase.bucket.file('users/' + uid)
    const blobStream = blob.createReadStream()
    return blobStream.pipe(res);
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Error: Internal server error",
      isSuccessful: false
    });
  }
}

export default {
  uploadUserAvatar,
  getUserAvatar
}