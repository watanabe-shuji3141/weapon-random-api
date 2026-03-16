import weapons from "../data/weapons.json"

export default async function handler(req, res) {

 function randomWeapon(){
  return weapons[Math.floor(Math.random()*weapons.length)]
 }

 let names = req.query.names

 // デフォルト4人
 if(!names){
  names = ["Name1","Name2","Name3","Name4"]
 }

 if(typeof names === "string"){
  names = names.split(",")
 }

 names = names.slice(0,8)

 let result = `===========================
◇武器ルーレット結果
===========================

`

 for(let name of names){

  const weapon = randomWeapon()

  // result += `${name}（${weapon.name}）\n`
  result += `${name}（${weapon.name.ja_JP}）\n`

 }

 res.setHeader("Content-Type","text/plain; charset=utf-8")
 res.status(200).send(result)

}
