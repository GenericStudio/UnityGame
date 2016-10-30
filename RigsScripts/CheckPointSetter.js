var spawnSpot : GameObject;
var SpawnPoint : Array = new Array(1);
var activeSpawnPoint : GameObject;
var animatingCoolDown : boolean;
var jumpLocation : Vector3;
var play : GameObject;
var movement : PlayerMovement;
var chargedSound : AudioClip;
var isMainSelection: boolean;
var Paused : boolean;
var respawnSound : AudioClip;
var indicator : ObjectLabel;

function Start () {
	play = GameObject.Find("GameManagers").GetComponent.<GameManager>().PlayerOne;
	
	movement = play.GetComponent.<PlayerMovement>();
	
	
}

function setCheckPoint(called_by){
	if(GameObject.Find("CheckPoint(Clone)")){
		Destroy(GameObject.Find("CheckPoint(Clone)"));
	}
	
		var spawn = Instantiate(spawnSpot,transform.position,Quaternion.identity);
		if(spawn !=null && movement !=null){
		activeSpawnPoint = spawn;
		indicator = activeSpawnPoint.gameObject.GetComponentInChildren(ObjectLabel);
		indicator.target = activeSpawnPoint.transform;
		movement.setCheckpoint(activeSpawnPoint.transform.position,true);
		animateCoolDown(true);
		}
		
		
}
function getIsMainSelection(){
	return isMainSelection;
}
function setIsMainSelection(bool){
	isMainSelection = bool;
}
function getIsPaused(){
	return Paused;
}
function setIsPaused(bool){
	Paused = bool;
}
function playRespawnSound(){
	movement.playSound(respawnSound);

}
function Update () {
	if(isMainSelection){
		if(movement.getIsFire1ing() ){
			setCheckPoint("getIsFire1ing");
		}else if(movement.getIsFire2ing() && play.GetComponent(PlayerMovement).isHasCheckpoint()&& (Time.time - movement.getCheckPointTimer()>5)){
			movement.sendBackToCheckPoint();
		}
	}
	if(animatingCoolDown){
		if(Time.time - movement.getCheckPointTimer()<5){
			activeSpawnPoint.GetComponent.<Renderer>().material.color=Color.Lerp(activeSpawnPoint.GetComponent.<Renderer>().material.color,Color.yellow,.005);
		}else{
			activeSpawnPoint.GetComponent.<Renderer>().material.color = Color.green;
			animatingCoolDown = false;
			movement.playSound(chargedSound);
		}
	}
	if(indicator){
		indicator.gameObject.GetComponent.<GUITexture>().color = activeSpawnPoint.GetComponent.<Renderer>().material.color;

	}
}
function animateCoolDown(bool){
	
	animatingCoolDown = true;
	activeSpawnPoint.GetComponent.<Renderer>().material.color = Color.red;
}



