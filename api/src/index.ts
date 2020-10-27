import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.json({ ok: 'ok' });
});

app.listen(3333);
