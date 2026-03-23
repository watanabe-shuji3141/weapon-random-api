// /api/random.js
export default function handler(req, res) {
  const unique = Date.now();

  res.writeHead(302, {
    Location: `/api/main?t=${unique}`
  });
  res.end();
}
