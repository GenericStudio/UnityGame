
var startPos: Vector2;
var lastPos: Vector2;
var nextPos: Vector2;
var line: LineRenderer;
var Hits: LayerMask;
var velocity: Vector2;
var hit_ray: RaycastHit2D;
var hit_layer_mask: LayerMask;
var active : boolean = true;
var force :int;
// Use this for initialization
function Start() {
	print("bullet_start: " + transform.position);
	Destroy(this.gameObject, 20);
	line = GetComponent("LineRenderer");
	line.SetVertexCount(2);
	startPos = transform.position;
	lastPos = startPos;
	line.SetPosition(0, transform.position);
	line.SetPosition(1, lastPos);
}
function Initialize(muzzle: Vector3) {

	lastPos = muzzle;
	line.SetPosition(0, transform.position);
	line.SetPosition(1, lastPos);
}

// Update is called once per frame
function Update() {
	if(active){
	transform.position += velocity;
	nextPos = new Vector2(transform.position.x, transform.position.y);
	if (Vector3.Distance(startPos, nextPos) > max_distance) {
		Destroy(this.gameObject);
	}

	hit_ray = Physics2D.Linecast(lastPos, nextPos, hit_layer_mask);
	Debug.DrawLine(lastPos, nextPos, Color.red, 2);
	if (hit_ray.collider != null) {
		print(hit_ray.collider.gameObject.name);
		//Destroy(this.gameObject);
		active=false;
		var enemy_rigid = hit_ray.collider.GetComponent("Rigidbody2D");
		if(enemy_rigid) enemy_rigid.velocity  += -hit_ray.normal*force;
	}
	line.SetPosition(0, lastPos );
	line.SetPosition(1, nextPos);
	lastPos = nextPos;
	//	print("bullet_update: " + transform.position);
	}else{
		line.SetPosition(0, hit_ray.point );
		line.SetPosition(1,  hit_ray.point + hit_ray.normal);
	}

}

function Hit(gameObject) {
	var coll = gameObject.GetComponent("Rigidbody2D");
	if (coll != null) {


	}
}
function FixedUpdate() {
}


var max_distance: int;

