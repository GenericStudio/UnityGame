using System;
using UnityEngine;


[Serializable]
public class Gun : MonoBehaviour
{
	public GameObject Bullet;

	public int bulletRange;

	public Transform Muzzle;

	public AudioClip Shot_Sound;

	public AudioClip Cock_Sound;

	public int ammo;

	public int max_ammo;

	public int bullets_per;

	public float Spread;

	public float shot_speed;

	public bool TriggerDown;

	public bool Cocked;

	public bool AutoCock;

	public Item Item;

	public Vector2 kickback;

	public int bullet_force;

	public AudioSource gun_audio;

	public bool auto_fire;

	public float rate_limit;

	private float last_fire_time;
	private float marked_dead_at;

	public  void Start()
	{
		if(!Item) Item = (Item)GetComponent("Item");
		this.Muzzle = this.transform.FindChild("Muzzle").transform;
		this.gun_audio = this.GetComponent<AudioSource>();
	}

	public  void Update()
	{
		if (this.Item.Holder != null && Time.time - this.last_fire_time > this.rate_limit && (this.Item.Holder.player.Inputs.fire.state == key_state.Down || (this.auto_fire && this.Item.Holder.player.Inputs.fire.state == key_state.Hold)))
		{
			this.last_fire_time = Time.time;
			if (this.Cocked)
			{
				this.TriggerDown = true;
				this.shoot();
			}
			else
			{
				if (this.gun_audio)
				{
					this.gun_audio.PlayOneShot(this.Cock_Sound);
				}
				this.Cocked = true;
			}
		}
	}

	public  void shoot()
	{
		MonoBehaviour.print("shoot called");
		if (this.ammo >= 1)
		{
			this.ammo--;
			if (this.gun_audio)
			{
				this.gun_audio.PlayOneShot(this.Shot_Sound);
			}
			this.Item.Holder.player.applyForce(this.kickback);
			if (!this.AutoCock)
			{
				this.Cocked = false;
			}
			for (int i = 0; i < this.bullets_per; i++)
			{
			   GameObject bullet = (GameObject)Instantiate(Bullet, Muzzle.position, Muzzle.rotation);
        Bullet bull_script = (Bullet)bullet.GetComponent("Bullet");
        bull_script._velocity = (transform.right * (Item.Holder.player.flipX ? -shot_speed : shot_speed)) + transform.up * UnityEngine.Random.Range(-Spread, Spread);
        bull_script.max_distance = bulletRange;
        bull_script.Initialize(Muzzle.transform.position);
        bull_script.force = bullet_force;
			}
		}else{
			Item.MarkedForDeath = true;
		}
	}

	public  void Main()
	{
	}
}
