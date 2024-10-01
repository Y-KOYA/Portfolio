import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient({ log: ['query'] });

router.use(express.json());

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findMany();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({error: 'サーバーエラーです'}) //ログをだすのとフロント側にももっと分かりやすいエラー内容を伝える
  }
});

/* API */
router.get('/api/v1/portfolio', async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findMany();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'サーバーエラーです'});
  }
});

router.put('/api/v1/portfolio/1', async (req, res) => {
  const id = 1
  const { profile, achievement, skill } = req.body;

  try {
    const updatedTask = await prisma.portfolio.update({
      where: { id },
      data: { 
        profile,
        achievement,
        skill,
      },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'サーバーエラーです'});
  }
});

export { router };