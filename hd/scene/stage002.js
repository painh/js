var Stage2 = function()
{
}

Stage2.Load = function()
{
	john.x = 0
	john.y = 640 - 32

	mapWidth = 500

	var  i = 0
	for( i = mapWidth / 4; i < mapWidth / 4 * 3; i += mapWidth / 4)
	{
		cri = new Spawn(img)
		cri.x = i
		cri.y = 640 - 32
		actorList.push(cri)
	}

	cri = new Spawn(img)
	cri.x = i
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
	enemyBase.hp = 1000
	enemyBase.maxHp = enemyBase.hp
	actorList.push(enemyBase)

	actorList.push(john);
	
	blockList.push( new Block( -9999, 640, 9999 * 2, 32, "rgba(200, 200, 200, 1)" ) )

	var secondFloorY = 640 - 100
	var cnt = randomRange(0, 20)
	var floorX = 0
	var floorWidth = 0
}	