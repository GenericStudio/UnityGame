#pragma strict

private var player : GameObject;
private var cameraa : Camera;

private var targetWorldPoint : Vector3;
private var muzzleTransform : Transform;
var bulletPrefab : Transform;
var shotSpeed : float;
private var nextShotTime : float = 0.0;
var timeBetweenShots : float = 1.0;
private var isShooting : boolean;
private var soundSource : AudioSource;
var FireSound : AudioClip;
private var currSpeed : Vector3;
private var currRotation : Quaternion;
private var AimDirection : Vector3;


private var movement : PlayerMovement;



function Start () {

//retical = GameObject.Find("TargetingRetical");


	soundSource = gameObject.AddComponent(AudioSource);
	soundSource.rolloffMode = AudioRolloffMode.Linear;
	cameraa = Component.FindObjectOfType(Camera);
	muzzleTransform = transform.Find("Barrel/Muzzle");
	player = GameObject.Find("Player");
	
	movement = player.GetComponent.<PlayerMovement>();

}

function aim(){

  
    
}
function GetState(){
	if(movement){
	isPaused = movement.getGameIsPaused();
	}
	//YOU ARE TRYING TO FIND WHY MACHING GUN THROWS ERROR when equipped and Also setting up Echo's for when a kit is equipped. 
	//It must be Selected in Menu- Then Equipped For AimingMode - then Usable by GameMode - Then If it has background Application it Must have a Resting State!(HookShot,Wings)
}

function LateUpdate () {
	if(!readyToShoot2 && !movement.getIsFire2ing()){
		readyToShoot2 = true;
		holdShoot2 = 0;
	}
	
	currRotation = transform.rotation;
	//currSpeed = player.rigidbody.velocity;
	getInputs();
	aim();	
	if(isShooting && nextShotTime <= Time.time){
		Shoot();
	}		
	if(isShooting2){
		Shoot2();
		isShooting2 = false;
	}
	if(holdShoot2 != 0 ){
		if(holdShoot2 + 1 < Time.time ){
			if(GameObject.Find("markerObject(Clone)")){
				Destroy(GameObject.Find("markerObject(Clone)"));
			}
		holdShoot2 = 0;
		}
	}

}

function getInputs(){

	

	if(movement.getIsFire1ing() ){
		isShooting = true;
		
	}else{
		isShooting = false;
	}
	

}
function Shoot(){
	nextShotTime = Time.time + timeBetweenShots;
    var bullet = Instantiate(bulletPrefab, muzzleTransform.position, Quaternion.identity);
    bullet.GetComponent.<Rigidbody>().AddForce(transform.forward * shotSpeed);
   // bullet.rigidbody.AddForce(player.rigidbody.velocity*0.5,ForceMode.Impulse);
    soundSource.PlayOneShot(FireSound);
   
   	
}





