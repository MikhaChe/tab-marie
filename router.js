import { Router } from "express";
import { getDataSpreadsheet } from "./get-data-spreadsheet.js";
import { findOne } from "./find-user-spreadsheet.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {check, validationResult} from "express-validator";
import dotenv from 'dotenv';
import {authMiddleWare} from './middleware/auth.middleware.js';

dotenv.config();


// var corsOptions = {
//   origin: 'http://192.168.100.6:8080',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const router = new Router();

router.post('/login', 
  async (req, res) => {
  try {
    console.log(req.body);
    const {email, password} = req.body;
    
    const searchResult = await findOne({email, password});
    const user = searchResult[0];
    
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }    
  //   const isPassValid = bcrypt.compare(password, user.password);
    const isPassValid = (password === user.password) ? true : false;
    if (!isPassValid) {
      return res.status(400).json({message: "Invalid password"});
    }
    console.log(user.email, ", Pass is " + isPassValid);
    const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: "1h"});
    return res.json({
      token, 
      user: {
        id: user.id,
        email: user.email
      }
    })

  } catch (e) {
    console.log(e);
    res.send({message: "Server error"});
  }
})

router.post('/posts', async (req, res) => {
  try{
    const {date} = req.body;

    const getData = await getDataSpreadsheet();
    
    res.json(getData);
  } catch (e)  {
    res.status(500).json(e);
  }
});

// router.get('/auth', authMiddleWare,
// async (req, res) => {
//   try{
//     const user = await findOne();
    
//     res.json(getData);
//   } catch (e)  {
//     res.status(500).json(e);
//   }
// });

router.get('/get', async (req, res) => {
  try{
    const getData = await getDataSpreadsheet(2);
    
    res.json(getData);
  } catch (e)  {
    res.status(500).json(e);
  }
});

export default router;