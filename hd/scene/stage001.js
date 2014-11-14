var Stage1 = function()
{
}

Stage1.Load = function()
{
	john.x = 0
	john.y = 640 - 32
	john.weaponX = john.x

	mapWidth = 300

	cri = new Spawn(img)
	cri.x = 150
	cri.y = 640 - 32
	cri.isSealed = false
	actorList.push(cri)


	johnBase = new JohnBase(img, "johnBase")
	johnBase.x = -32 * 4
	johnBase.y = 640 - 32 * 4
	actorList.push(johnBase)

	enemyBase = new EnemyBase(img, "enemyBase")
	enemyBase.x = mapWidth - enemyBase.colliWidth - john.colliWidth
	enemyBase.y = 640 - 32 * 4
	enemyBase.hp = 300
	enemyBase.maxHp = enemyBase.hp
	actorList.push(enemyBase)

	actorList.push(john);
	
	blockList.push( new Block( -9999, 640, 9999 * 2, 32, "rgba(200, 200, 200, 1)" ) )
}	

Stage1.lastUpdated = Renderer.curr

Stage1.Update = function()
{
	
}