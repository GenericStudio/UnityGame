#pragma strict
private var movement : PlayerMovement;
private var isPressingThis : boolean;
//private var thisTouch : Touch;

function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
}

function Update() {
if(movement.getPCDebugging()){
   		if(Input.GetMouseButtonDown(0)&& GetComponent.<GUITexture>().HitTest(Input.mousePosition)){
			isPressingThis=true;
						movement.setIsFire1ing(false);

		}
		if(isPressingThis && Input.GetMouseButton(0) && GetComponent.<GUITexture>().HitTest(Input.mousePosition)){
									movement.setIsFire1ing(false);

		}
		if(Input.GetMouseButtonUp(0)&& !GetComponent.<GUITexture>().HitTest(Input.mousePosition)){
		isPressingThis = false;
		}
		

		
   		if(isPressingThis && (Input.GetMouseButtonUp(0)&& GetComponent.<GUITexture>().HitTest(Input.mousePosition)) && PlayerPrefs.GetInt("GunRigUnlocked",0) == 1){
   			movement.setRig("GunRig");
    	movement.ActivateRig();  
    				movement.setIsFire1ing(false);
     
   		}
   }else{
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(GetComponent.<GUITexture>().HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
            	movement.setRig("GunRig");
    			movement.ActivateRig();       
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    }
   
   
    if(movement.getIsInGameMode() &&    PlayerPrefs.GetString("Rig") == "GunRig"){
    	GetComponent.<GUITexture>().color = Color.green;
    	GetComponent.<GUITexture>().color.a = 0.35;
    }else if(PlayerPrefs.GetInt("GunRigUnlocked",0) == 1){
     	GetComponent.<GUITexture>().color = Color.gray;
    	GetComponent.<GUITexture>().color.a = .20;
    	}else{
    	GetComponent.<GUITexture>().color = Color.gray;
    	GetComponent.<GUITexture>().color.a = .05;
     }
  
}