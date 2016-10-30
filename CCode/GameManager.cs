using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {

		public GameObject[] players;
		public Transform[] spawnPoints;
		public bool[] active;

	// Use this for initialization
	void Start () {
		for(var i = 0; i < players.Length; i++){
			if(active[i]){
				SpawnPlayer(i);
			}
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	public void SpawnPlayer(int index){
		GameObject obj = (GameObject)Instantiate(players[index], spawnPoints[UnityEngine.Random.Range(0, spawnPoints.Length-1)].position, Quaternion.identity);
		PlayerMovement player = (PlayerMovement)obj.GetComponent("PlayerMovement");
		player.player_num = index;
		player.gameManager = this;
	}
}
