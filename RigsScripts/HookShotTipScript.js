#pragma strict
private var isStuck : boolean = false;
private var player : GameObject;
private var movement : PlayerMovement;
private var gun : HookShotScript;
private var retract : boolean;
private var rigid : Rigidbody;
private var lettingGoOnPurpose: boolean;
private var hit : RaycastHit;
private var isHasParent : boolean;
private var wantsToRetract: boolean = false;
private var gravity : boolean = false;




function Start () {
	player = GameObject.Find("Player");
	movement = GameObject.Find("Player").GetComponent(PlayerMovement);
	rigid = GetComponent(Rigidbody);
	gun = GameObject.Find("HookShot").GetComponent.<HookShotScript>();
	Physics.IgnoreCollision(gameObject.GetComponent.<Collider>(),player.GetComponent.<Collider>());
	
	
}
function FixedUpdate(){
	if(gravity && rigid){
		GetComponent.<Rigidbody>().AddForce(Vector3.down * 5, ForceMode.Impulse);
	}
}
function Update () {
	//gun.RopeVertexes[0] = transform.position;
	if(isStuck){
	
	}else if(lettingGoOnPurpose){
		print("lettingGoOnPurpose");
		transform.position -= (transform.position - player.transform.position).normalized*Vector3.Distance(player.transform.position, transform.position);
	}else if(retract){
		if(Vector3.Distance(player.transform.position,transform.position)<10){
			letGo();
			
		}else{
		print("Retracting");
		if(!GetComponent(Rigidbody)){
			rigid = gameObject.AddComponent(Rigidbody);
			gun.hookIsRetracting = true;
		}
		rigid.MovePosition(transform.position - (transform.position-player.transform.position).normalized * 10);	
		}
	}else if(wantsToRetract){
		print("wantsToRetract");
		gravity = true;
		if(!movement.getIsFire1ing()){
			retract = true;
			
		}else if(Vector3.Distance(player.transform.position, transform.position) >= gun.maxLengthOfRope){
			GetComponent.<Rigidbody>().MovePosition(transform.position - (transform.position-player.transform.position).normalized * 10);

		}

	
	}else if(Vector3.Distance(player.transform.position, transform.position) >= gun.maxLengthOfRope){
		print("MaximumLength");
		GetComponent.<Rigidbody>().AddForce(-GetComponent.<Rigidbody>().velocity,ForceMode.Impulse);
		wantsToRetract = true;
	}
	if(!isStuck){
		print("firing and looking for interce");
		var layerMask = 1 << 8;
		layerMask = ~layerMask;
		if(Physics.Linecast(player.transform.position, transform.position, hit,layerMask)){
			if(!hit.collider.tag.Equals("1DMG")){
			transform.position = hit.collider.ClosestPointOnBounds(transform.position);
			SetTipIsStuck();
			transform.parent = hit.collider.transform; 
				
			}else{
				letGo();
			}
		}
	}
}
function letGo(){
	lettingGoOnPurpose = true;
	isStuck = false;
	gun.letGo();
	gun.hookIsRetracting = true;
	movement.SetIsHanging(false);
	retract = true;


}


function OnCollisionEnter(hit : Collision){
if(this.transform!=null && player !=null){

	if(hit.collider.tag.Contains("Player")){
	}else{
		if(!hit.collider.tag.Equals("1DMG") && !hit.collider.gameObject.GetComponent("PBCameraZone") && !hit.collider.gameObject.tag.Equals("CheckPoint")&& !hit.collider.gameObject.tag.Equals("Pickup")){
			transform.position = hit.collider.ClosestPointOnBounds(transform.position) + hit.contacts[0].normal ;
			SetTipIsStuck();
			transform.parent = hit.collider.transform; 
				}
		}

	}
}


function SetTipIsStuck(){
	
	
	isStuck = true;
		gun.SetHookIsStuck(true,this.transform,Vector3.Distance(player.transform.position, transform.position));
	Destroy(GetComponent.<Rigidbody>());
	
Destroy(this.GetComponent.<Collider>());
}