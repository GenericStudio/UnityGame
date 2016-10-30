using Boo.Lang.Runtime;
using System;
using UnityEngine;
using UnityScript.Lang;

[Serializable]
public class Bullet : MonoBehaviour
{
	public Vector2 startPos;

	public Vector2 lastPos;

	public Vector2 nextPos;

	public LineRenderer line;

	public LayerMask Hits;

	public Vector2 velocity;

	public RaycastHit2D hit_ray;

	public LayerMask hit_layer_mask;

	public bool active;

	public int force;

	public int max_distance;

	public Bullet()
	{
		this.active = true;
	}

	public override void Start()
	{
		MonoBehaviour.print("bullet_start: " + this.transform.position);
		UnityEngine.Object.Destroy(this.gameObject, (float)20);
		this.line = (LineRenderer)this.GetComponent("LineRenderer");
		this.line.SetVertexCount(2);
		this.startPos = this.transform.position;
		this.lastPos = this.startPos;
		this.line.SetPosition(0, this.transform.position);
		this.line.SetPosition(1, this.lastPos);
	}

	public override void Initialize(Vector3 muzzle)
	{
		this.lastPos = muzzle;
		this.line.SetPosition(0, this.transform.position);
		this.line.SetPosition(1, this.lastPos);
	}

	public override void Update()
	{
		if (this.active)
		{
			this.transform.position = this.transform.position + this.velocity;
			this.nextPos = new Vector2(this.transform.position.x, this.transform.position.y);
			if (Vector3.Distance(this.startPos, this.nextPos) > (float)this.max_distance)
			{
				UnityEngine.Object.Destroy(this.gameObject);
			}
			this.hit_ray = Physics2D.Linecast(this.lastPos, this.nextPos, this.hit_layer_mask);
			Debug.DrawLine(this.lastPos, this.nextPos, Color.red, (float)2);
			if (this.hit_ray.collider != null)
			{
				this.active = false;
				UnityEngine.Object.Destroy(this.gameObject, (float)5);
				Component component = this.hit_ray.collider.gameObject.transform.root.GetComponent("PlayerMovement");
				if (component)
				{
					UnityRuntimeServices.Invoke(component, "applyGlobalForce", new object[]
					{
						this.velocity.normalized * (float)this.force
					}, typeof(MonoBehaviour));
				}
				MonoBehaviour.print(component);
				MonoBehaviour.print(this.hit_ray.collider.gameObject.name);
				Component component2 = this.hit_ray.collider.GetComponent("Rigidbody2D");
				if (component2)
				{
					RuntimeServices.SetProperty(component2, "velocity", RuntimeServices.InvokeBinaryOperator("op_Addition", UnityRuntimeServices.GetProperty(component2, "velocity"), -this.hit_ray.normal * (float)this.force));
				}
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

	public override void Hit(object gameObject)
	{
		object lhs = UnityRuntimeServices.Invoke(gameObject, "GetComponent", new object[]
		{
			"Rigidbody2D"
		}, typeof(MonoBehaviour));
		if (!RuntimeServices.EqualityOperator(lhs, null))
		{
		}
	}

	public override void FixedUpdate()
	{
	}

	public override void Main()
	{
	}
}
