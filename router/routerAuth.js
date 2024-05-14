import { Router } from 'express';
const routerAuth = Router();
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import users from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()

const key_token = process.env.KEY

// Регистрация пользователя
routerAuth.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверка, существует ли пользователь с таким же именем
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Создание нового пользователя
    const newUser = new users({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Аутентификация пользователя
routerAuth.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Поиск пользователя по имени
    const user = await users.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Неверное имя пользователя ' });
    }

    // Проверка пароля
    const comparePassword = bcrypt.compareSync( req.body.password ,user.password)
    if (!comparePassword) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    // Создание JWT токена
    const token = jwt.sign({ username: username},  key_token, { expiresIn: '10h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default routerAuth
