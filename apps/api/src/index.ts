import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'betpulse-api',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`BetPulse API listening on port ${port}`);
});
