#pragma strict
private var movement : PlayerMovement;
private var ready : boolean = false;
function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
}
function Update() {

 if(movement.getPCDebugging()){
    if(GetComponent.<GUITexture>().HitTest(Input.mousePosition)&&Input.GetMouseButtonDown(0) && movement.getIsInAimMode()){ 
    	 movement.EnterGameMode();
   }else if(GetComponent.<GUITexture>().HitTest(Input.mousePosition)&&Input.GetMouseButtonDown(0) && movement.getIsInGameMode() && movement.getGameIsPaused()){
    	movement.ExitPauseMode();
     } 
     }
else{
	if(ready && Input.touchCount == 0){
		ready = true;
	}
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(GetComponent.<GUITexture>().HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
        		if(!movement.getIsInGameMode()){
        			movement.EnterGameMode();
        		}else if(movement.getIsInGameMode() && movement.getGameIsPaused()){
        			movement.ExitPauseMode();
        		}
        	}
   		 }
    }
   }


    if(movement.getIsInGameMode() && !movement.getGameIsPaused()){
     	GetComponent.<GUITexture>().color = Color.grey;
    	GetComponent.<GUITexture>().color.a = .10;
    		
		GetComponent.<GUIText>().text="";

    }else if(movement.getIsInGameMode() && movement.getGameIsPaused()){
    	GetComponent.<GUITexture>().color = Color.green;
    	GetComponent.<GUITexture>().color.a = .35;
   ;	
		GetComponent.<GUIText>().text="Un-pause";
    }else if(!movement.getIsInGameMode()){
    	GetComponent.<GUIText>().text="Return To Game";

    	GetComponent.<GUITexture>().color = Color.yellow;
    	GetComponent.<GUITexture>().color.a = .35;
	
     }
}