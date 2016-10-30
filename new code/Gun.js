var Bullet: GameObject;
var bulletRange: int;
var Muzzle: Transform;
var Shot_Sound: AudioClip;
var Cock_Sound: AudioClip;
var ammo: int;
var max_ammo: int;
var bullets_per: int;
var Spread: int;
var shot_speed: int;
var TriggerDown: boolean;
var Cocked: boolean;
var AutoCock: boolean;
var Item: Item;
var kickback: Vector2;
var bullet_force: int;
 var gun_audio: AudioSource;
// Use this for initialization
function Start() {
    Muzzle = transform.FindChild("Muzzle").transform;
    Item.fire = this.shoot;
    gun_audio = GetComponent.<AudioSource>();
}

function Update() {
    if (Item.Holder != null) {

        if (Item.Holder.player.Inputs.fire.state == key_state.Down) {
           
       
            if (Cocked) {

                TriggerDown = true;
                shoot();
                Cocked=AutoCock;
            }
            else {
              if (gun_audio) gun_audio.PlayOneShot(Cock_Sound);
                Cocked = true;
            }
        }
    }
   

}

function shoot() {
    print("shoot called");
    if (ammo < 1) return;
    ammo--;
   
    if (gun_audio) gun_audio.PlayOneShot(Shot_Sound);
    Item.Holder.player.applyForce(kickback);
    Cocked = false;
    if (AutoCock) Cocked = true;
    for (var i = 0; i < bullets_per; i++) {
        var bullet = Instantiate(Bullet, Muzzle.position, Muzzle.rotation);
        var bull_script = bullet.GetComponent("Bullet");
        bull_script.velocity = new Vector2((Item.Holder.player.flipX ? -shot_speed : shot_speed), 0) + ((Random.insideUnitCircle * Random.Range(-Spread, Spread)) * 0.2);
        bull_script.max_distance = bulletRange;
        bull_script.Initialize(Muzzle.transform.position);
        bull_script.force = bullet_force;
    }
}