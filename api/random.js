// /api/random.js
export default function handler(req, res) {
  const { count, names } = req.query;

  const query = new URLSearchParams({
    count,
    names,
    t: Date.now()
  }).toString();

  res.writeHead(302, {
    Location: `/api/main?${query}`
  });
  res.end();
}
