using UnityEngine;
using System.Collections;
using System.Collections.Generic;
public class CameraTarget : MonoBehaviour {
	public CameraScript cameraScript;
	// Use this for initialization
	void Start () {
		cameraScript = (CameraScript)GameObject.Find("GameCamera").GetComponent("CameraScript");
		cameraScript.targets.Add(transform);
	}
	
	// Update is called once per frame
	void Update () {
	
	}

		void OnDestroy () {
		cameraScript.targets.Remove(transform);
	}
}
