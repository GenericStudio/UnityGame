#pragma strict

private var movement : PlayerMovement;
 var up			: GameObject;
 var down 		: GameObject;
 var left 		: GameObject;
 var right		: GameObject;
 var jump 		: GameObject;
 var fire1 		: GameObject;
 var fire2 		: GameObject;
 var aimArea 	: GameObject;
 var joyStick   : GameObject;
 var AimState   : GameObject;
 var GameState  : GameObject;
 var MenuState  : GameObject;
 var Checkpoint  : GameObject;
  var Portal  : GameObject;
   var Hook  : GameObject;
    var Wing  : GameObject;
     var Gun  : GameObject;






function getFire1(){
return fire1;
}

function getFire2(){
return fire2;
}
function getAimPad(){
return joyStick;
}
function getDownButton(){
return down;
}
function getUpButton(){
	return up;
}
function getLeftButton(){
	return left;
}
function getRightButton(){
	return right;
}
function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
	MenuState.SetActive(true);
	AimState.SetActive(!movement.getPCDebugging());	
	GameState.SetActive(!movement.getPCDebugging());	
	
	MenuState.GetComponent.<GUITexture>().pixelInset.x=Screen.width-(Screen.height/3);
	MenuState.GetComponent.<GUITexture>().pixelInset.y=Screen.height-(Screen.height/6);
	MenuState.GetComponent.<GUITexture>().pixelInset.width=(Screen.height/3);
	MenuState.GetComponent.<GUITexture>().pixelInset.height=(Screen.height/6);
	//MenuState.guiText.pixelOffset.x = MenuState.guiTexture.pixelInset.x;
	//MenuState.guiText.pixelOffset.y = Screen.height;
	//MenuState.guiText.material.color=Color.black;	
			
	GameState.GetComponent.<GUITexture>().pixelInset.x=Screen.width-(Screen.height/3*3);
	GameState.GetComponent.<GUITexture>().pixelInset.y=Screen.height-(Screen.height/6);
	GameState.GetComponent.<GUITexture>().pixelInset.width=(Screen.height/3);
	GameState.GetComponent.<GUITexture>().pixelInset.height=(Screen.height/6);	
	GameState.GetComponent.<GUIText>().pixelOffset.x = GameState.GetComponent.<GUITexture>().pixelInset.x;
	GameState.GetComponent.<GUIText>().pixelOffset.y = Screen.height;
	GameState.GetComponent.<GUIText>().material.color=Color.black;
	GameState.GetComponent.<GUIText>().text="";

	AimState.GetComponent.<GUITexture>().pixelInset.x=Screen.width-(Screen.height/3*2);
	AimState.GetComponent.<GUITexture>().pixelInset.y=Screen.height-(Screen.height/6);
	AimState.GetComponent.<GUITexture>().pixelInset.width=(Screen.height/3);
	AimState.GetComponent.<GUITexture>().pixelInset.height=(Screen.height/6);	
	//AimState.guiText.material.color=Color.black;
	//AimState.guiText.pixelOffset.x = AimState.guiTexture.pixelInset.x;
	//AimState.guiText.pixelOffset.y = Screen.height;
Checkpoint.GetComponent.<GUITexture>().pixelInset.x=Screen.width/15;
Checkpoint.GetComponent.<GUITexture>().pixelInset.y=Screen.height - Screen.width/15;
Checkpoint.GetComponent.<GUITexture>().pixelInset.width=Screen.width/15;
Checkpoint.GetComponent.<GUITexture>().pixelInset.height=Screen.width/15;

Portal.GetComponent.<GUITexture>().pixelInset.x=Screen.width/15*2;
Portal.GetComponent.<GUITexture>().pixelInset.y=Screen.height - Screen.width/15;
Portal.GetComponent.<GUITexture>().pixelInset.width=Screen.width/15;
Portal.GetComponent.<GUITexture>().pixelInset.height=Screen.width/15;

Gun.GetComponent.<GUITexture>().pixelInset.x=Screen.width/15*3;
Gun.GetComponent.<GUITexture>().pixelInset.y=Screen.height - Screen.width/15;
Gun.GetComponent.<GUITexture>().pixelInset.width=Screen.width/15;
Gun.GetComponent.<GUITexture>().pixelInset.height=Screen.width/15;

Hook.GetComponent.<GUITexture>().pixelInset.x=Screen.width/15*4;
Hook.GetComponent.<GUITexture>().pixelInset.y=Screen.height - Screen.width/15;
Hook.GetComponent.<GUITexture>().pixelInset.width=Screen.width/15;
Hook.GetComponent.<GUITexture>().pixelInset.height=Screen.width/15;

Wing.GetComponent.<GUITexture>().pixelInset.x=Screen.width/15*5;
Wing.GetComponent.<GUITexture>().pixelInset.y=Screen.height - Screen.width/15;
Wing.GetComponent.<GUITexture>().pixelInset.width=Screen.width/15;
Wing.GetComponent.<GUITexture>().pixelInset.height=Screen.width/15;

}

function setGun(){
	up.SetActive(false);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	aimArea.SetActive(true);
	joyStick.SetActive(true);

	//AimArea
	standardAimArea();
	if(!movement.getPCDebugging()){	


	//JumpButton
	jump.GetComponent.<GUITexture>().pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.GetComponent.<GUITexture>().pixelInset.width = 0.20*Screen.width;
	jump.GetComponent.<GUITexture>().pixelInset.y = 0 ;
	jump.GetComponent.<GUITexture>().pixelInset.height = 0.20*Screen.width;

	/////////////////////
	left.GetComponent.<GUITexture>().pixelInset.x = 0;
	left.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	left.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	left.GetComponent.<GUITexture>().pixelInset.height =(0.15*Screen.width);

	//right
	right.GetComponent.<GUITexture>().pixelInset.x = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	right.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);

	//down
	down.GetComponent.<GUITexture>().pixelInset.x = .1*Screen.width;
	down.GetComponent.<GUITexture>().pixelInset.width = Screen.width*.10;
	down.GetComponent.<GUITexture>().pixelInset.y = 0;
	down.GetComponent.<GUITexture>().pixelInset.height = 0.10*Screen.width;


	///////
	joyStick.GetComponent.<GUITexture>().pixelInset.x = Screen.width*.6 ;
	joyStick.GetComponent.<GUITexture>().pixelInset.width = Screen.width/5;
	joyStick.GetComponent.<GUITexture>().pixelInset.y = 0;
	joyStick.GetComponent.<GUITexture>().pixelInset.height = (0.2*Screen.width);
	///////////
	fire2.GetComponent.<GUITexture>().pixelInset.x =  0.3*Screen.width;
	fire2.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	fire2.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire2.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);
	//fire2
	fire1.GetComponent.<GUITexture>().pixelInset.x = 0.45*Screen.width;
	fire1.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	fire1.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire1.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);
}else{
		set_controls_hidden();
	}

}

function standardAimArea(){
if(movement!=null){
	if(movement.getPCDebugging()){	
	aimArea.GetComponent.<GUITexture>().pixelInset.x=0;
	aimArea.GetComponent.<GUITexture>().pixelInset.y = 0;
	aimArea.GetComponent.<GUITexture>().pixelInset.width = Screen.width;
	aimArea.GetComponent.<GUITexture>().pixelInset.height = Screen.height;
	
	}else{
	aimArea.GetComponent.<GUITexture>().pixelInset.x=Screen.width/3;
	aimArea.GetComponent.<GUITexture>().pixelInset.y = (Screen.height/4);
	aimArea.GetComponent.<GUITexture>().pixelInset.width = Screen.width/3;
	aimArea.GetComponent.<GUITexture>().pixelInset.height = (Screen.height/2);
	}
	}else{
		movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
		standardAimArea();
	}

}
function setIsRelativeAiming(){
	aimArea.SetActive(false);
	joyStick.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	joyStick.GetComponent.<GUITexture>().pixelInset.x = Screen.width*.45 ;
	joyStick.GetComponent.<GUITexture>().pixelInset.width = Screen.width/5;
	joyStick.GetComponent.<GUITexture>().pixelInset.y = 0;
	joyStick.GetComponent.<GUITexture>().pixelInset.height = (0.2*Screen.width);
	
	fire2.GetComponent.<GUITexture>().pixelInset.x =  0.25*Screen.width;
	fire2.GetComponent.<GUITexture>().pixelInset.width = Screen.width*.1;
	fire2.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire2.GetComponent.<GUITexture>().pixelInset.height = (0.1*Screen.width);
	fire1.GetComponent.<GUITexture>().pixelInset.x =  0.25*Screen.width;
	fire1.GetComponent.<GUITexture>().pixelInset.width = Screen.width*.1;
	fire1.GetComponent.<GUITexture>().pixelInset.y = Screen.width*.1;
	fire1.GetComponent.<GUITexture>().pixelInset.height = (0.1*Screen.width);





}
function setPortals(){
	up.SetActive(false);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	aimArea.SetActive(true);
	joyStick.SetActive(true);

	//AimArea
	standardAimArea();
	if(!movement.getPCDebugging()){	


	//JumpButton
	jump.GetComponent.<GUITexture>().pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.GetComponent.<GUITexture>().pixelInset.width = 0.20*Screen.width;
	jump.GetComponent.<GUITexture>().pixelInset.y = 0 ;
	jump.GetComponent.<GUITexture>().pixelInset.height = 0.20*Screen.width;


	//left
	left.GetComponent.<GUITexture>().pixelInset.x = 0;
	left.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	left.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	left.GetComponent.<GUITexture>().pixelInset.height =(0.15*Screen.width);

	//right
	right.GetComponent.<GUITexture>().pixelInset.x = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	right.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);

	//down
	down.GetComponent.<GUITexture>().pixelInset.x = .1*Screen.width;
	down.GetComponent.<GUITexture>().pixelInset.width = Screen.width*.10;
	down.GetComponent.<GUITexture>().pixelInset.y = 0;
	down.GetComponent.<GUITexture>().pixelInset.height = 0.10*Screen.width;

	//fire1
	joyStick.GetComponent.<GUITexture>().pixelInset.x = Screen.width*.6 ;
	joyStick.GetComponent.<GUITexture>().pixelInset.width = Screen.width/5;
	joyStick.GetComponent.<GUITexture>().pixelInset.y = 0;
	joyStick.GetComponent.<GUITexture>().pixelInset.height = (0.2*Screen.width);
	///////////
	fire2.GetComponent.<GUITexture>().pixelInset.x =  0.3*Screen.width;
	fire2.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	fire2.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire2.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);
	//fire2
	fire1.GetComponent.<GUITexture>().pixelInset.x = 0.45*Screen.width;
	fire1.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	fire1.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire1.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);
}else{
		set_controls_hidden();
	}

}

function setHookShot(){
	up.SetActive(true);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	aimArea.SetActive(true);
	joyStick.SetActive(true);
	//AimArea
	standardAimArea();

	if(!movement.getPCDebugging()){	
	//JumpButton
	jump.GetComponent.<GUITexture>().pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.GetComponent.<GUITexture>().pixelInset.width = 0.20*Screen.width;
	jump.GetComponent.<GUITexture>().pixelInset.y = 0 ;
	jump.GetComponent.<GUITexture>().pixelInset.height = 0.20*Screen.width;


//	up
	up.GetComponent.<GUITexture>().pixelInset.x = .1*Screen.width;
	up.GetComponent.<GUITexture>().pixelInset.width = (0.1*Screen.width);
	up.GetComponent.<GUITexture>().pixelInset.y = (0.25*Screen.width);
	up.GetComponent.<GUITexture>().pixelInset.height = (0.1*Screen.width);
	//left
	left.GetComponent.<GUITexture>().pixelInset.x = 0;
	left.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	left.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	left.GetComponent.<GUITexture>().pixelInset.height =(0.15*Screen.width);

	//right
	right.GetComponent.<GUITexture>().pixelInset.x = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	right.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);

	//down
	down.GetComponent.<GUITexture>().pixelInset.x = .1*Screen.width;
	down.GetComponent.<GUITexture>().pixelInset.width = Screen.width*.10;
	down.GetComponent.<GUITexture>().pixelInset.y = 0;
	down.GetComponent.<GUITexture>().pixelInset.height = 0.10*Screen.width;

	//fire1
	joyStick.GetComponent.<GUITexture>().pixelInset.x = Screen.width*.6 ;
	joyStick.GetComponent.<GUITexture>().pixelInset.width = Screen.width/5;
	joyStick.GetComponent.<GUITexture>().pixelInset.y = 0;
	joyStick.GetComponent.<GUITexture>().pixelInset.height = (0.2*Screen.width);
	///////////
	fire2.GetComponent.<GUITexture>().pixelInset.x =  0.3*Screen.width;
	fire2.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	fire2.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire2.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);
	//fire2
	fire1.GetComponent.<GUITexture>().pixelInset.x = 0.45*Screen.width;
	fire1.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	fire1.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire1.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);
	}else{
		set_controls_hidden();
	}

}
function set_controls_hidden(){
//JumpButton
	jump.GetComponent.<GUITexture>().pixelInset.x =0;
	jump.GetComponent.<GUITexture>().pixelInset.width = 0;
	jump.GetComponent.<GUITexture>().pixelInset.y = 0 ;
	jump.GetComponent.<GUITexture>().pixelInset.height = 0;


//	up
	up.GetComponent.<GUITexture>().pixelInset.x = 0;
	up.GetComponent.<GUITexture>().pixelInset.width = 0;
	up.GetComponent.<GUITexture>().pixelInset.y = 0;
	up.GetComponent.<GUITexture>().pixelInset.height = 0;
	//left
	left.GetComponent.<GUITexture>().pixelInset.x = 0;
	left.GetComponent.<GUITexture>().pixelInset.width = 0;
	left.GetComponent.<GUITexture>().pixelInset.y = 0;
	left.GetComponent.<GUITexture>().pixelInset.height =0;

	//right
	right.GetComponent.<GUITexture>().pixelInset.x = 0;
	right.GetComponent.<GUITexture>().pixelInset.width = 0;
	right.GetComponent.<GUITexture>().pixelInset.y =0;
	right.GetComponent.<GUITexture>().pixelInset.height = 0;

	//down
	down.GetComponent.<GUITexture>().pixelInset.x = 0;
	down.GetComponent.<GUITexture>().pixelInset.width = 0;
	down.GetComponent.<GUITexture>().pixelInset.y = 0;
	down.GetComponent.<GUITexture>().pixelInset.height = 0;

	//fire1
	joyStick.GetComponent.<GUITexture>().pixelInset.x =0;
	joyStick.GetComponent.<GUITexture>().pixelInset.width = 0;
	joyStick.GetComponent.<GUITexture>().pixelInset.y = 0;
	joyStick.GetComponent.<GUITexture>().pixelInset.height = 0;
	///////////
	fire2.GetComponent.<GUITexture>().pixelInset.x =  0;
	fire2.GetComponent.<GUITexture>().pixelInset.width = 0;
	fire2.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire2.GetComponent.<GUITexture>().pixelInset.height = 0;
	//fire2
	fire1.GetComponent.<GUITexture>().pixelInset.x = 0;
	fire1.GetComponent.<GUITexture>().pixelInset.width = 0;
	fire1.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire1.GetComponent.<GUITexture>().pixelInset.height = 0;
}
function setNoFireNoAim(){
	up.SetActive(false);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(false);
	fire2.SetActive(false);
	aimArea.SetActive(true);
	joyStick.SetActive(false);
	standardAimArea();
	if(!movement.getPCDebugging()){	

	//left
	left.GetComponent.<GUITexture>().pixelInset.x = 0;
	left.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	left.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	left.GetComponent.<GUITexture>().pixelInset.height =(0.15*Screen.width);

	//right
	right.GetComponent.<GUITexture>().pixelInset.x = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	right.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);

	//down
	down.GetComponent.<GUITexture>().pixelInset.x = .1*Screen.width;
	down.GetComponent.<GUITexture>().pixelInset.width = Screen.width*.10;
	down.GetComponent.<GUITexture>().pixelInset.y = 0;
	down.GetComponent.<GUITexture>().pixelInset.height = 0.10*Screen.width;

	//Jump
	jump.GetComponent.<GUITexture>().pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.GetComponent.<GUITexture>().pixelInset.width = 0.20*Screen.width;
	jump.GetComponent.<GUITexture>().pixelInset.y = 0 ;
	jump.GetComponent.<GUITexture>().pixelInset.height = 0.20*Screen.width;

}else{
		set_controls_hidden();
	}
	
}
function setAiming(){
	up.SetActive(false);
	down.SetActive(false);
	left.SetActive(false);
	right.SetActive(false);
	jump.SetActive(false);
	fire1.SetActive(false);
	fire2.SetActive(false);
	aimArea.SetActive(true);
	joyStick.SetActive(false);
	aimArea.GetComponent.<GUITexture>().pixelInset = Rect(0,0,Screen.width,Screen.height);
}
function showControls(){
	var rig = PlayerPrefs.GetString("Rig");
	if(rig.Equals("HookShotRig")){
		setHookShot();
	}else if(rig.Equals("PortalRig") ){
		setPortals();
	}else if( rig.Equals("GunRig")){
		setGun();
	}else if(rig.Equals("CheckPointRig")){
		setCheckPoint();
	}else{
		setNoFireNoAim();
	}
}

function setCheckPoint(){
	up.SetActive(false);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	aimArea.SetActive(true);
	joyStick.SetActive(false);
	if(!movement.getPCDebugging()){	

	//JumpButton
	jump.GetComponent.<GUITexture>().pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.GetComponent.<GUITexture>().pixelInset.width = 0.20*Screen.width;
	jump.GetComponent.<GUITexture>().pixelInset.y = 0 ;
	jump.GetComponent.<GUITexture>().pixelInset.height = 0.20*Screen.width;

	//left
	left.GetComponent.<GUITexture>().pixelInset.x = 0;
	left.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	left.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	left.GetComponent.<GUITexture>().pixelInset.height =(0.15*Screen.width);

	//right
	right.GetComponent.<GUITexture>().pixelInset.x = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	right.GetComponent.<GUITexture>().pixelInset.y = 0.10*Screen.width;
	right.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);

	//down
	down.GetComponent.<GUITexture>().pixelInset.x = .1*Screen.width;
	down.GetComponent.<GUITexture>().pixelInset.width = Screen.width*.10;
	down.GetComponent.<GUITexture>().pixelInset.y = 0;
	down.GetComponent.<GUITexture>().pixelInset.height = 0.10*Screen.width;
	
	//fire1
	fire2.GetComponent.<GUITexture>().pixelInset.x =  0.3*Screen.width;
	fire2.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	fire2.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire2.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);
	//fire2
	fire1.GetComponent.<GUITexture>().pixelInset.x = 0.45*Screen.width;
	fire1.GetComponent.<GUITexture>().pixelInset.width = (0.15*Screen.width);
	fire1.GetComponent.<GUITexture>().pixelInset.y = 0;
	fire1.GetComponent.<GUITexture>().pixelInset.height = (0.15*Screen.width);
}else{
		set_controls_hidden();
	}
	standardAimArea();

}


function hideControls(){
	up.SetActive(false);
	down.SetActive(false);
	left.SetActive(false);
	right.SetActive(false);
	jump.SetActive(false);
	fire1.SetActive(false);
	fire2.SetActive(false);
	aimArea.SetActive(false);
	joyStick.SetActive(false);
}