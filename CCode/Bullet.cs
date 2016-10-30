using System;
using UnityEngine;


[Serializable]
public class Bullet : MonoBehaviour
{
	public Vector2 startPos;

	public Vector2 lastPos;

	public Vector2 nextPos;

	public LineRenderer line;

	public LayerMask Hits;

	public Vector2 _velocity;

	public RaycastHit2D hit_ray;

	public LayerMask hit_layer_mask;

	public bool active;

	public int force;

	public int max_distance;

	public Bullet()
	{
		this.active = true;
	}

	public  void Start()
	{
		MonoBehaviour.print("bullet_start: " + this.transform.position);
		GameObject.Destroy(this.gameObject, (float)20);
		this.line = (LineRenderer)this.GetComponent("LineRenderer");
		this.line.SetVertexCount(2);
		this.startPos = this.transform.position;
		this.lastPos = this.startPos;
		this.line.SetPosition(0, this.transform.position);
		this.line.SetPosition(1, this.lastPos);
	}

	public  void Initialize(Vector3 muzzle)
	{
		this.lastPos = muzzle;
		this.line.SetPosition(0, this.transform.position);
		this.line.SetPosition(1, this.lastPos);
	}

	public  void Update()
	{
		if (this.active)
		{
			this.transform.position = this.transform.position + (Vector3)this._velocity;
			this.nextPos = new Vector2(this.transform.position.x, this.transform.position.y);
			if (Vector3.Distance(this.startPos, this.nextPos) > (float)this.max_distance)
			{
				GameObject.Destroy(this.gameObject);
			}
			this.hit_ray = Physics2D.Linecast(this.lastPos, this.nextPos, this.hit_layer_mask);
			Debug.DrawLine(this.lastPos, this.nextPos, Color.red, (float)2);
			if (this.hit_ray.collider != null)
			{
				this.active = false;
				GameObject.Destroy(this.gameObject, (float)5);
				PlayerMovement component = (PlayerMovement)this.hit_ray.collider.gameObject.transform.root.GetComponent("PlayerMovement");
				if (component){
					component.applyGlobalForce(_velocity.normalized * (float)force);
					component.ReceiveDamage(1);
				}
				active=false;
				Rigidbody2D enemy_rigid = (Rigidbody2D)hit_ray.collider.GetComponent("Rigidbody2D");
				if(enemy_rigid) enemy_rigid.velocity  += -hit_ray.normal*force;
			}
			this.line.SetPosition(0, this.lastPos);
			this.line.SetPosition(1, this.nextPos);
			this.lastPos = this.nextPos;
		}
		else
		{
			this.line.SetPosition(0, this.hit_ray.point);
			this.line.SetPosition(1, this.hit_ray.point + this.hit_ray.normal);
		}
	}

	public  void Hit(GameObject obj)
	{
		Rigidbody2D coll = (Rigidbody2D)obj.GetComponent("Rigidbody2D");
	}

	public  void FixedUpdate()
	{
	}

	public  void Main()
	{
	}
}
