import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.SUB_MAIL,
      pass: process.env.PASS,
    }
  });

  // 管理人が受け取るメール
  const toHostMailData = {
    from: req.body.email,
    to: 'brackcat09+work@gmail.com',
    subject: `[お問い合わせ] ${req.body.name}様より`,
    text: `${req.body.massage} Send from ${req.body.email}`,
    html: `
      <p>【名前】</p>
      <p>${req.body.name}</p>
      <p>【メールアドレス】</p>
      <p>${req.body.email}</p>
      <p>【内容】</p>
      <p>${req.body.message}</p>
      `
    }

    try {
      const info = await transporter.sendMail(toHostMailData);
      console.log(info);
      return res.status(200).json({ message: '成功しました' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'メールの送信に失敗しました' });
    }
}