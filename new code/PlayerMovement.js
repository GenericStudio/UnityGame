public var runSpeed: float = 35.0;
public var accel: float = 1;
public var jump_force: float = 35;
public var gravity: float = 65.0;
var slow_fall = false;
public var _animator: Animator;
public var _sprite: SpriteRenderer;
public var flipX: boolean;
private var hand: HandScript;
var externalForces: Vector2;
var horizontalInput: float = 0;
var verticalInput: float = 0;
public var floor_ray: RaycastHit2D = new RaycastHit2D();
public var left_ray: RaycastHit2D = new RaycastHit2D();
public var right_ray: RaycastHit2D = new RaycastHit2D();
public var staticFrame: Vector3;
public var currSpeed: Vector3;
public var isStillJumping: boolean;
public var isAirborn: boolean;
public var isOnLeftWall: boolean = false;
public var isOnRightWall: boolean = false;
public var isWallJumping: boolean = false;
public var timeTouchingSomething: float;
public var timeTouchingTheFloor: float;
public var isTouchingFloor: boolean;
public var isTouchingSomething: boolean;
public var speedMax: float = 0;
public var rigid: Rigidbody2D;
public var head: BoxCollider2D;
public var Inputs: InputManager;
public var floor_layer_mask: LayerMask;
public var gameManager : GameManager;
public var player_num : int;
public var health : int;

function Start() {
	Inputs = GetComponent("InputManager");
	Time.timeScale = 1;
	timeAtStart = Time.time;
	rigid = GetComponent(Rigidbody2D);
	hand = gameObject.transform.Find("Hand").GetComponent("HandScript");
	gameManager = GameObject.Find("GameManager").GetComponent("GameManager");
}

function Update() {

	transform.position.z = 0;
	currSpeed = rigid.velocity;  //1:Get Velocity going into this frame
	currSpeed += externalForces;
	externalForces = new Vector2();
	getInputs();//3:Get what the user is trying to do this frame
	whatAmITouching();
	if (Inputs.down.state == key_state.Hold) head.gameObject.SetActive(false);
	else head.gameObject.SetActive(true);;
	handleHorizontal(); //4:Apply LeftRight Movements
	handleJumps();//5: Apply Up down movements
	applyGravity();
	rigid.velocity = currSpeed;
	UpdateAnimator();
	setStaticFrame(new Vector2());
}
/// <summary>
/// This is called at Update() and sets each of the animators parameters to their corresponding State values
/// </summary>
function UpdateAnimator() {
	if (horizontalInput != 0) {
		if (horizontalInput < 0) flipX = true;
		else flipX = false;
	}

	_animator.SetBool("Grounded", isTouchingFloor);
	_animator.SetFloat("Speed", Mathf.Abs(currSpeed.x));
	_animator.SetFloat("vSpeed", currSpeed.y);
	//	_animator.SetBool("Running", BehaviorState.Running);
	//	_animator.SetBool("Dashing", BehaviorState.Dashing);
	_animator.SetBool("Crouching", Inputs.down.state == key_state.Hold);
	_animator.SetBool("LookingUp", Inputs.up.state == key_state.Hold);
	_animator.SetBool("WallClinging", !isTouchingFloor && isOnLeftWall || isOnRightWall);
	_animator.SetBool("Jetpacking", slow_fall);
	//_animator.SetBool("Diving", BehaviorState.Diving);
	//	_animator.SetBool("LadderClimbing", BehaviorState.LadderClimbing);
	//	_animator.SetFloat("LadderClimbingSpeed", BehaviorState.LadderClimbingSpeed);
	//	_animator.SetBool("FiringStop", BehaviorState.FiringStop);
	//_animator.SetBool("Firing", Inputs.fire.state == key_state.Down);
	//	_animator.SetInteger("FiringDirection", BehaviorState.FiringDirection);
	//	_animator.SetBool("MeleeAttacking", Inputs.grab.state == key_state.Hold);
	if (isOnRightWall) flipX = true;
	if (isOnLeftWall) flipX = false;
	if (flipX) transform.localScale.x = -1;
	else transform.localScale.x = 1;


}



function handleJumps() {
	jumpMax = jump_force;
	if (Inputs.jump.state == key_state.Down) {
		if (isTouchingFloor) {
			isStillJumping = true;
			currSpeed.y += (staticFrame.y + jumpMax);
		} else if (isOnLeftWall || isOnRightWall) {
			currSpeed.y = (staticFrame.y + jumpMax / 1.5);
			currSpeed.x += (isOnLeftWall) ? jumpMax : 0;
			currSpeed.x -= (isOnRightWall) ? jumpMax : 0;
			isStillJumping = true;
		}
    }
   	if (Inputs.jump.state == key_state.Up) {
		if (isStillJumping && currSpeed.y > 5) {
			currSpeed.y -= Mathf.Min(currSpeed.y / 2, jumpMax / 2);
		}
		isStillJumping = false;
   	}
	   slow_fall = (!isTouchingFloor && !isStillJumping && Inputs.jump.state == key_state.Hold);
}

var ground_speed = 0;
function handleHorizontal() {
	ground_speed = currSpeed.x - staticFrame.x;
	var ground_speed_magnitude = Mathf.Abs(ground_speed);
	speedMax = (((Inputs.down.state == key_state.None) ? runSpeed : runSpeed / 3) + Mathf.Abs(staticFrame.x));
	var dif = speedMax - ground_speed_magnitude;
	if (Mathf.Abs(horizontalInput) > 0.1) {
		if ((Mathf.Sign(horizontalInput) == Mathf.Sign(ground_speed))) {
			currSpeed.x += dif * (Time.fixedDeltaTime * accel) * Mathf.Sign(horizontalInput);
		} else {
			currSpeed.x += speedMax * (Time.fixedDeltaTime * accel) * Mathf.Sign(horizontalInput) * 2;
		}

	} else { //Stopping from no input
		if (ground_speed_magnitude > 4) {
			if (Inputs.down.state == key_state.Hold) {
				currSpeed.x -= (ground_speed * Time.fixedDeltaTime * accel) / 1.5;
			} else {
				currSpeed.x -= ground_speed * Time.fixedDeltaTime * accel * 4;
			}
		} else {
			//	print("stopped");
			currSpeed.x = staticFrame.x;
		}
	}
}

function getInputs() {
	if (Inputs.left.state == key_state.Hold) {
		horizontalInput = -1;
	} else if (Inputs.right.state == key_state.Hold) {
		horizontalInput = 1;
	} else {
		horizontalInput = 0;
	}
	//horizontalInput = movementJoy.position.x;
	if (Inputs.down.state == key_state.Hold) {
		verticalInput = -1;
	} else if (Inputs.up.state == key_state.Hold) {
		verticalInput = 1;
	} else {
		verticalInput = 0;
	}
}

function whatAmITouching() {
	isTouchingFloor = false;
	isOnLeftWall = false;
	isOnRightWall = false;

	var horizontal_look_dist = 1;
	var horizontal_center_offset = 2;
	var origin_2d = Vector2(transform.position.x, transform.position.y);
	var left_2d = Vector2((transform.position - transform.right * horizontal_look_dist).x, (transform.position - transform.right * horizontal_look_dist).y);
	var right_2d = Vector2((transform.position + transform.right * horizontal_look_dist).x, (transform.position + transform.right * horizontal_look_dist).y);
	var up_2d = Vector2((transform.position - transform.up * 1.5).x, (transform.position - transform.up * 1.5).y);

	right_ray = Physics2D.Linecast(origin_2d, right_2d, floor_layer_mask);
	if (right_ray.collider != null) {
		isOnRightWall = true;
		Debug.DrawLine(origin_2d, right_2d, Color.red, 2);
	}

	right_ray = Physics2D.Linecast(origin_2d + new Vector2(0, 1), right_2d + new Vector2(0, 1), floor_layer_mask);
	if (right_ray.collider != null) {
		isOnRightWall = true;
		Debug.DrawLine(origin_2d + new Vector2(0, 1), right_2d + new Vector2(0, 1), Color.red, 2);
	}

	left_ray = Physics2D.Linecast(origin_2d + new Vector2(0, 1), left_2d + new Vector2(0, 1), floor_layer_mask);
	if (left_ray.collider != null) {
		isOnLeftWall = true;
		Debug.DrawLine(origin_2d + new Vector2(0, 1), left_2d + new Vector2(0, 1), Color.yellow, 2);
	}

	left_ray = Physics2D.Linecast(origin_2d, left_2d, floor_layer_mask);
	if (left_ray.collider != null) {
		isOnLeftWall = true;
		Debug.DrawLine(origin_2d, left_2d, Color.yellow, 2);
	}

	floor_ray = Physics2D.Linecast(origin_2d + Vector2.left / 2, up_2d + Vector2.left / 2, floor_layer_mask);
	if (floor_ray.collider != null) {
		isTouchingFloor = true;
		Debug.DrawLine(origin_2d + Vector2.left / 2, up_2d + Vector2.left / 2, Color.blue, 2);
	}
	floor_ray = Physics2D.Linecast(origin_2d - Vector2.left / 2, up_2d - Vector2.left / 2, floor_layer_mask);
	if (floor_ray.collider != null) {
		isTouchingFloor = true;
		Debug.DrawLine(origin_2d - Vector2.left / 2, up_2d - Vector2.left / 2, Color.blue, 2);
	}
	isAirborn = (!isTouchingFloor && !isOnLeftWall && !isOnRightWall);
}


function OnCollisionStay2D(hit: Collision2D) {
	if (hit.gameObject.GetComponent.<Rigidbody2D>() && hit.rigidbody.mass * hit.rigidbody.velocity.magnitude > GetComponent.<Rigidbody2D>().mass * GetComponent.<Rigidbody2D>().velocity.magnitude) {
		setStaticFrame((hit.gameObject.GetComponent.<Rigidbody2D>().velocity));
	}
}


function setStaticFrame(outsideAction: Vector3) {
	//	staticFrame = outsideAction;
}



function applyForce(force: Vector2) {
	//Apply forces, but with positve y's'
	externalForces += (flipX) ? new Vector2(-force.x, force.y) : force;
}
function applyGlobalForce(force: Vector2) {
	externalForces += force;
}


function applyGravity() {
	if (currSpeed.y > -140) {
		if (((isOnLeftWall && Inputs.left.state == key_state.Hold) || (isOnRightWall && Inputs.right.state == key_state.Hold) || slow_fall) && currSpeed.y < -10) {
			currSpeed.y = currSpeed.y / 1.02;
			//apply gravityies
		} else {
			currSpeed.y -= gravity * Time.fixedDeltaTime;
		}
		//add extra gravity if user wants it
		//	if (Inputs.down.state == key_state.Hold) {
		//		currSpeed.y -= gravity * Time.fixedDeltaTime;
		//	}

	} else {
		//////////print(currSpeed.y);
	}
}
function ReceiveDamage(amount){
	health -= amount;
	if(health < 0){
		killPlayer();
	}
}

function killPlayer(){
	gameManager.SpawnPlayer(player_num);
	Destroy(this.gameObject);

}
function OnDestroy() {
	
}
