using System;
using UnityEngine;


[Serializable]
public class Grenade : MonoBehaviour
{
	public GameObject Bullet;
	public int bullets_per;
	public int bulletRange;


	public Transform Muzzle;


	public AudioClip Shot_Sound;
	public AudioClip Cock_Sound;


	public float shot_speed;
	public float delay;

	public bool Cocked;

	public bool AutoCock;

	public Item Item;


	public int bullet_force;

	public AudioSource gun_audio;



	private float last_fire_time;

	public  void Start()
	{
		this.Muzzle = this.transform.FindChild("Muzzle").transform;
		this.gun_audio = this.GetComponent<AudioSource>();
	}

	public  void Update()
	{
		if(last_fire_time > 0 && Time.time - last_fire_time > this.delay){
				this.shoot();
		}
		if(!Item.Holder) return;
		if (last_fire_time == 0 && (this.Item.Holder.player.Inputs.fire.state == key_state.Down))
		{
			this.last_fire_time = Time.time;
				if (this.gun_audio)
				{
					this.gun_audio.PlayOneShot(this.Cock_Sound);
				}
		}
	}

	public  void shoot()
	{
		MonoBehaviour.print("shoot called");
	
			if (this.gun_audio)
			{
				this.gun_audio.PlayOneShot(this.Shot_Sound);
			}
		
		for (int i = 0; i < this.bullets_per; i++)
			{
				GameObject bullet = (GameObject)Instantiate(Bullet, Muzzle.position, Muzzle.rotation);
				Bullet bull_script = (Bullet)bullet.GetComponent("Bullet");
				bull_script._velocity = UnityEngine.Random.insideUnitCircle.normalized * shot_speed;
				bull_script.max_distance = bulletRange;
				bull_script.Initialize(Muzzle.transform.position);
				bull_script.force = bullet_force;
			}
			Destroy(this.gameObject);
			
		
	}

	public  void Main()
	{
	}
}
