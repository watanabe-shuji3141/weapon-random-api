// /api/main.js
import weapons from "../data/weapons.json";

export default function handler(req, res) {

  const count = parseInt(req.query.count) || 4;

  const names = req.query.names
    ? req.query.names.split(",")
    : Array.from({ length: count }, (_, i) => `Player${i+1}`);

  const results = names.map(name => {
    const weapon = weapons[Math.floor(Math.random() * weapons.length)];
    return `${name}（${weapon.name.ja_JP}）`;
  });

  const text = `
===========================
◇武器ルーレット結果
===========================

${results.join("\n")}
`;

  const ogDescription = results.join(" / ");

  // 🔥 URLもユニークにしておく（念押し）
  const fullUrl = `https://your-domain.com/api/main?t=${Date.now()}`;

  const html = `
<!DOCTYPE html>
<html>
<head>

<meta charset="utf-8">

<meta property="og:title" content="スプラ武器ルーレット結果">
<meta property="og:description" content="${ogDescription}">
<meta property="og:type" content="website">
<meta property="og:url" content="${fullUrl}">
<meta property="og:image" content="https://static.wikia.nocookie.net/splatoon/images/6/6c/Splatoon_3_logo.png">

<title>武器ルーレット結果</title>

<style>
body{
  background:#111;
  color:#00ff88;
  font-family:monospace;
  padding:40px;
}
.box{
  white-space:pre;
  border:2px solid #00ff88;
  padding:20px;
}
</style>

</head>

<body>

<h1>武器ルーレット結果</h1>

<div class="box">
${text}
</div>

</body>
</html>
`;

  // 🔥 キャッシュ完全殺し（重要）
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
