using Boo.Lang.Runtime;
using CompilerGenerated;
using System;
using UnityEngine;
using UnityScript.Lang;

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

	public override void Start()
	{
		this.Muzzle = this.transform.FindChild("Muzzle").transform;
		this.Item.fire = new __Gun_Start$callable0$25_22__(this.shoot);
		this.gun_audio = this.GetComponent<AudioSource>();
	}

	public override void Update()
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

	public override void shoot()
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
				GameObject gameObject = (GameObject)UnityEngine.Object.Instantiate(this.Bullet, this.Muzzle.position, this.Muzzle.rotation);
				Component component = gameObject.GetComponent("Bullet");
				RuntimeServices.SetProperty(component, "velocity", new Vector2((!this.Item.Holder.player.flipX) ? this.shot_speed : (-this.shot_speed), UnityEngine.Random.Range(-this.Spread, this.Spread)));
				RuntimeServices.SetProperty(component, "max_distance", this.bulletRange);
				UnityRuntimeServices.Invoke(component, "Initialize", new object[]
				{
					this.Muzzle.transform.position
				}, typeof(MonoBehaviour));
				RuntimeServices.SetProperty(component, "force", this.bullet_force);
			}
		}
	}

	public override void Main()
	{
	}
}
