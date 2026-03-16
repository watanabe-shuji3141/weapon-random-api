export default async function handler(req, res) {

 const response = await fetch(https://stat.ink/api/v3/weapon)
 const weapons = await response.json()

 const random =
  weapons[Math.floor(Math.random()*weapons.length)]

 res.status(200).json(random)

}
