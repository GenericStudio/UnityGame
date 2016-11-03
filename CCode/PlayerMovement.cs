using System;
using UnityEngine;

[Serializable]
public class PlayerMovement : MonoBehaviour
{
	public Item FeetEquipment;
	public float runSpeed;

	public float accel;

	public float jump_force;

	public float gravity;

	public bool slow_fall;

	public Animator _animator;

	public SpriteRenderer _sprite;

	public bool flipX;

	private HandScript hand;

	public Vector2 externalForces;

	public float horizontalInput;

	public float verticalInput;

	public RaycastHit2D floor_ray;

	public RaycastHit2D left_ray;

	public RaycastHit2D right_ray;

	public Vector2 staticFrame;

	public Vector2 currSpeed;

	public bool isStillJumping;

	public bool isAirborn;

	public bool isOnLeftWall;

	public bool isOnRightWall;

	public bool isWallJumping;

	public float timeTouchingSomething;

	public float timeTouchingTheFloor;

	public bool isTouchingFloor;

	public bool isTouchingSomething;

	public float speedMax;

	public Rigidbody2D rigid;

	public BoxCollider2D head;

	public InputManager Inputs;

	public LayerMask floor_layer_mask;

	public int ground_speed;

	public int player_num;

	public int health;

	public GameManager gameManager;
    public bool can_jump;
    public bool jump_triggered;
    public float slow_fall_speed;

    public PlayerMovement()
	{
		this.runSpeed = 35f;
		this.accel = (float)1;
		this.jump_force = (float)35;
		this.gravity = 65f;
		this.floor_ray = default(RaycastHit2D);
		this.left_ray = default(RaycastHit2D);
		this.right_ray = default(RaycastHit2D);
	}

	public  void Start()
	{
		this.Inputs = (InputManager)this.GetComponent("InputManager");
		Time.timeScale = (float)1;
		float time = Time.time;
		this.rigid = (Rigidbody2D)this.GetComponent(typeof(Rigidbody2D));
		this.hand = (HandScript)this.gameObject.transform.Find("Hand").GetComponent("HandScript");
	}

	public  void Update()
	{
		int num = 0;
		Vector3 position = this.transform.position;
		float num2 = position.z = (float)num;
		Vector3 vector = this.transform.position = position;
		this.currSpeed = this.rigid.velocity;
		this.currSpeed += this.externalForces;
		this.externalForces = default(Vector2);
		this.getInputs();
		this.whatAmITouching();
		if (this.Inputs.down.state == key_state.Hold)
		{
			this.head.gameObject.SetActive(false);
		}
		else
		{
			this.head.gameObject.SetActive(true);
		}
		this.handleHorizontal();
		this.handleJumps();
		this.applyGravity();
		this.rigid.velocity = this.currSpeed;
		this.UpdateAnimator();
		this.setStaticFrame(default(Vector2));
    }

	public  void UpdateAnimator()
	{
		if (this.horizontalInput != (float)0)
		{
			if (this.horizontalInput < (float)0)
			{
				this.flipX = true;
			}
			else
			{
				this.flipX = false;
			}
		}
		this._animator.SetBool("Grounded", this.isTouchingFloor);
		this._animator.SetFloat("Speed", Mathf.Abs(this.currSpeed.x) * (float)20);
		this._animator.SetFloat("vSpeed", this.currSpeed.y);
		this._animator.SetBool("Crouching", this.Inputs.down.state == key_state.Hold);
		this._animator.SetBool("LookingUp", this.Inputs.up.state == key_state.Hold);
			_animator.SetBool("WallClinging", !isTouchingFloor && (isOnLeftWall || isOnRightWall));

		
		this._animator.SetBool("Jetpacking", this.slow_fall);
		if (this.isOnRightWall)
		{
			this.flipX = true;
		}
		if (this.isOnLeftWall)
		{
			this.flipX = false;
		}
		if (this.flipX)
		{
			int num = -1;
			Vector3 localScale = this.transform.localScale;
			float num2 = localScale.x = (float)num;
			Vector3 vector = this.transform.localScale = localScale;
		}
		else
		{
			int num3 = 1;
			Vector3 localScale2 = this.transform.localScale;
			float num4 = localScale2.x = (float)num3;
			Vector3 vector2 = this.transform.localScale = localScale2;
		}
	}

	public  void handleJumps()
	{
		float num = this.jump_force;
        if (isTouchingFloor) can_jump = true;
        if (this.Inputs.jump.state == key_state.Down) jump_triggered = true;
		if ( jump_triggered)
		{
            jump_triggered = false;
			if (can_jump)
			{
				this.isStillJumping = true;
				this.currSpeed.y = this.currSpeed.y + (this.staticFrame.y + num);
			}
			else if (this.isOnLeftWall || this.isOnRightWall)
			{
				this.currSpeed.y = this.staticFrame.y + num / 1.5f;
				this.currSpeed.x = this.currSpeed.x + ((!this.isOnLeftWall) ? ((float)0) : num);
				this.currSpeed.x = this.currSpeed.x - ((!this.isOnRightWall) ? ((float)0) : num);
				this.isStillJumping = true;
			}
            
		}
		if (this.Inputs.jump.state == key_state.Up)
		{
			if (this.isStillJumping && this.currSpeed.y > (float)5)
			{
				this.currSpeed.y = this.currSpeed.y - Mathf.Min(this.currSpeed.y / (float)2, num / (float)2);
			}
			this.isStillJumping = false;
		}
		bool arg_169_0;
		if (arg_169_0 = !this.isTouchingFloor)
		{
			arg_169_0 = !this.isStillJumping;
		}
		bool arg_183_1;
		if (arg_183_1 = arg_169_0)
		{
			arg_183_1 = (this.Inputs.jump.state == key_state.Hold);
		}
        if (!isTouchingFloor || isStillJumping) can_jump = false;
    }

	public  void handleHorizontal()
	{
		this.ground_speed = (int)(this.currSpeed.x - this.staticFrame.x);
		float ground_speed_magnitude = Mathf.Abs(this.ground_speed);
		this.speedMax = (this.Inputs.down.state == key_state.None)?this.runSpeed:this.runSpeed/3 + Mathf.Abs(this.staticFrame.x);
		float num2 = this.speedMax - (float)ground_speed_magnitude;
		if (Mathf.Abs(this.horizontalInput) > 0.1f)
		{
			if (Mathf.Sign(this.horizontalInput) == Mathf.Sign((float)this.ground_speed))
			{
                if (num2 < 0) num2 *= 3;
				this.currSpeed.x = this.currSpeed.x + num2 * (Time.fixedDeltaTime * this.accel) * Mathf.Sign(this.horizontalInput);
			}
			else
			{
				this.currSpeed.x = this.currSpeed.x + this.speedMax * (Time.fixedDeltaTime * this.accel) * Mathf.Sign(this.horizontalInput) * (float)2;
			}
		}
		else if (ground_speed_magnitude > 4)
		{
			if (this.Inputs.down.state == key_state.Hold)
			{
				this.currSpeed.x = this.currSpeed.x - (float)this.ground_speed * Time.fixedDeltaTime * this.accel / 1.5f;
			}
			else
			{
				this.currSpeed.x = this.currSpeed.x - (float)this.ground_speed * Time.fixedDeltaTime * this.accel * (float)4;
			}
		}
		else
		{
			this.currSpeed.x = this.staticFrame.x;
		}
	}

	public  void getInputs()
	{
		if (this.Inputs.left.state == key_state.Hold)
		{
			this.horizontalInput = (float)-1;
		}
		else if (this.Inputs.right.state == key_state.Hold)
		{
			this.horizontalInput = (float)1;
		}
		else
		{
			this.horizontalInput = (float)0;
		}
		if (this.Inputs.down.state == key_state.Hold)
		{
			this.verticalInput = (float)-1;
		}
		else if (this.Inputs.up.state == key_state.Hold)
		{
			this.verticalInput = (float)1;
		}
		else
		{
			this.verticalInput = (float)0;
		}
	}

	public  void whatAmITouching()
	{
		this.isTouchingFloor = false;
		this.isOnLeftWall = false;
		this.isOnRightWall = false;
		int num = 1;
		Vector2 vector = new Vector2(this.transform.position.x, this.transform.position.y);
		Vector2 vector2 = new Vector2((this.transform.position - this.transform.right * (float)num).x, (this.transform.position - this.transform.right * (float)num).y);
		Vector2 vector3 = new Vector2((this.transform.position + this.transform.right * (float)num).x, (this.transform.position + this.transform.right * (float)num).y);
		Vector2 a = new Vector2((this.transform.position - this.transform.up * 1.5f).x, (this.transform.position - this.transform.up * 1.5f).y);
		this.right_ray = Physics2D.Linecast(vector, vector3, this.floor_layer_mask);
		if (this.right_ray.collider != null)
		{
			this.isOnRightWall = true;
			Debug.DrawLine(vector, vector3, Color.red, (float)2);
		}
		this.right_ray = Physics2D.Linecast(vector + new Vector2((float)0, (float)1), vector3 + new Vector2((float)0, (float)1), this.floor_layer_mask);
		if (this.right_ray.collider != null)
		{
			this.isOnRightWall = true;
			Debug.DrawLine(vector + new Vector2((float)0, (float)1), vector3 + new Vector2((float)0, (float)1), Color.red, (float)2);
		}
		this.left_ray = Physics2D.Linecast(vector + new Vector2((float)0, (float)1), vector2 + new Vector2((float)0, (float)1), this.floor_layer_mask);
		if (this.left_ray.collider != null)
		{
			this.isOnLeftWall = true;
			Debug.DrawLine(vector + new Vector2((float)0, (float)1), vector2 + new Vector2((float)0, (float)1), Color.yellow, (float)2);
		}
		this.left_ray = Physics2D.Linecast(vector, vector2, this.floor_layer_mask);
		if (this.left_ray.collider != null)
		{
			this.isOnLeftWall = true;
			Debug.DrawLine(vector, vector2, Color.yellow, (float)2);
		}
		this.floor_ray = Physics2D.Linecast(vector + Vector2.left / (float)2, a + Vector2.left / (float)2, this.floor_layer_mask);
		if (this.floor_ray.collider != null)
		{
			this.isTouchingFloor = true;
			Debug.DrawLine(vector + Vector2.left / (float)2, a + Vector2.left / (float)2, Color.blue, (float)2);
		}
		this.floor_ray = Physics2D.Linecast(vector - Vector2.left / (float)2, a - Vector2.left / (float)2, this.floor_layer_mask);
		if (this.floor_ray.collider != null)
		{
			this.isTouchingFloor = true;
			Debug.DrawLine(vector - Vector2.left / (float)2, a - Vector2.left / (float)2, Color.blue, (float)2);
		}
		bool arg_44B_0;
		if (arg_44B_0 = !this.isTouchingFloor)
		{
			arg_44B_0 = !this.isOnLeftWall;
		}
		bool arg_45B_1;
		if (arg_45B_1 = arg_44B_0)
		{
			arg_45B_1 = !this.isOnRightWall;
		}
		this.isAirborn = arg_45B_1;
	}

	public  void OnCollisionStay2D(Collision2D hit)
	{
		if (hit.gameObject.GetComponent<Rigidbody2D>() && hit.rigidbody.mass * hit.rigidbody.velocity.magnitude > this.GetComponent<Rigidbody2D>().mass * this.GetComponent<Rigidbody2D>().velocity.magnitude)
		{
			this.setStaticFrame(hit.gameObject.GetComponent<Rigidbody2D>().velocity);
		}
	}

	public  void setStaticFrame(Vector3 outsideAction)
	{
	}

	public  void applyForce(Vector2 force)
	{
		this.externalForces += ((!this.flipX) ? force : new Vector2(-force.x, force.y));
	}

	public  void applyGlobalForce(Vector2 force)
	{
		this.externalForces += force;
	}

	public  void applyGravity()
	{
		if (this.currSpeed.y > (float)-140)
		{
			if (this.currSpeed.y < (float)slow_fall_speed &&( (this.isOnLeftWall && this.Inputs.left.state == key_state.Hold) || (this.isOnRightWall && this.Inputs.right.state == key_state.Hold) || (this.slow_fall)))
			{
				this.currSpeed.y = this.currSpeed.y / 1.02f;
			}
			else
			{
				this.currSpeed.y = this.currSpeed.y - this.gravity * Time.fixedDeltaTime;
			}
		}
        slow_fall = false;

    }

	public void ReceiveDamage(int amount){
		health-=amount;
		if(health<0){
			KillPlayer();
		}
	}
	public void KillPlayer(){
		gameManager.SpawnPlayer(player_num);
		Destroy(this.gameObject);
	}

	public  void Main()
	{
	}
}
