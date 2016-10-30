#pragma strict
private var movement : PlayerMovement;
function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
}

function Update() {
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(GetComponent.<GUITexture>().HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
        	if(movement.getGameIsPaused() && movement.getIsInGameMode()){
        			movement.ExitPauseMode();
        	} 
            	movement.setIsJumping(true);
            	movement.setLetGoOfJump(false);
            	 		
        	}else if(touch.phase == TouchPhase.Ended){
        		movement.setLetGoOfJump(true);
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    if(movement.getIsPressingJump() && misses == count){
    	movement.setLetGoOfJump(true);
    }
    if(movement.getPCDebugging()){
    if(Input.GetButtonDown("Jump")){
    	movement.setIsJumping(true);
    	movement.setLetGoOfJump(false);
    }
	 if(Input.GetButton("Jump")){
    	movement.jump_held = (true);
    }
   	if(Input.GetButtonUp("Jump")){
		       	movement.jump_held = (false);

   		movement.setLetGoOfJump(true);
   	}
   	}
    if(movement.getIsPressingJump() || movement.getIsStillJumping()){
    	GetComponent.<GUITexture>().color = Color.grey;
    	GetComponent.<GUITexture>().color.a = .35;
    }else if(movement.getIsInGameMode() && movement.getGameIsPaused()){
    	GetComponent.<GUITexture>().color = Color.green;
    	GetComponent.<GUITexture>().color.a = 0.35;
    }else{
    	GetComponent.<GUITexture>().color = Color.gray;
     	GetComponent.<GUITexture>().color.a = .15;
     }


}     