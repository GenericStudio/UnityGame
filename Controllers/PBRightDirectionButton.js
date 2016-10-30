#pragma strict
private var movement : PlayerMovement;
function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
}
function Update() {
	var misses : int=0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(GetComponent.<GUITexture>().HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
        		movement.setIsPressingRight(true);
        		if(movement.getGameIsPaused() && movement.getIsInGameMode()){
        			movement.ExitPauseMode();
        		}  
        	}else if(touch.phase == TouchPhase.Moved){
        		movement.setIsPressingRight(true);
        	}else if(touch.phase == TouchPhase.Ended){
        		movement.setIsPressingRight(false);
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    if(movement.getIsPressingRight()  && misses == count){
    	movement.setIsPressingRight(false);
    }
    if(movement.getPCDebugging()){
    if(Input.GetAxis("Horizontal")>0.1){
    	movement.setIsPressingRight(true);
    }
    }
    if(movement.getIsPressingRight()){
   		GetComponent.<GUITexture>().color = Color.gray;
    	GetComponent.<GUITexture>().color.a = .35;
    }else if(movement.getIsInGameMode() && movement.getGameIsPaused()){
    	GetComponent.<GUITexture>().color = Color.green;
    	GetComponent.<GUITexture>().color.a = 0.35;
     }else{
    	GetComponent.<GUITexture>().color = Color.gray;
    	GetComponent.<GUITexture>().color.a = .15;
     }
}