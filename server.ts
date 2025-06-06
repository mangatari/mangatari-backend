import app from './app';

const PORT: number = parseInt(process.env.PORT || '5005', 10);

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});