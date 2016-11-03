using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ItemSpawner : MonoBehaviour {

	public List<GameObject> items;
	public bool single;
	public float delay; 
	private GameObject last_child; 
	private float last_spawn_time;
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
		if(last_child == null && ( Time.time - last_spawn_time > delay)){
			SpawnItem();
		}
	}
	void SpawnItem(){
		last_spawn_time = Time.time;
		last_child = (GameObject)Instantiate(items[UnityEngine.Random.Range(0, items.Count)], transform.position, transform.rotation);
	}
}
