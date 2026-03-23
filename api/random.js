// import weapons from "../data/weapons.json"

// export default async function handler(req, res) {

//  function randomWeapon(){
//   return weapons[Math.floor(Math.random()*weapons.length)]
//  }

//  let names = req.query.names

//  // デフォルト4人
//  if(!names){
//   names = ["Player1","Player2","Player3","Player4"]
//  }

//  if(typeof names === "string"){
//   names = names.split(",")
//  }

//  names = names.slice(0,8)

//  let result = `===========================
// ◇武器ルーレット結果
// ===========================

// `

//  for(let name of names){

//   const weapon = randomWeapon()

//   // result += `${name}（${weapon.name}）\n`
//   result += `${name}（${weapon.name.ja_JP}）\n`

//  }

//  res.setHeader("Content-Type","text/plain; charset=utf-8")
//  res.status(200).send(result)

// }
import weapons from "../data/weapons.json";

export default function handler(req, res) {
  const fullUrl = `https://weapon-random-api.vercel.app/api/random?t=${Date.now()}`;
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

  // Discord OGP用 description
  const ogDescription = results.join(" / ");

  const html = `
<!DOCTYPE html>
<html>
<head>

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
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
