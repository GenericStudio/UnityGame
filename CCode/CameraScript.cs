using System;
using UnityEngine;

[Serializable]
public class CameraScript : MonoBehaviour
{
	public Transform[] targets;

	public float smoothingFactor;

	public int zoom;

	public Camera cam;

	public int outer_percent;

	public int inner_percent;

	public override void Start()
	{
	}

	public override void Update()
	{
		Vector3 a = new Vector3((float)0, (float)0, (float)0);
		float num = (float)0;
		int num2 = Screen.width / 100 * this.outer_percent;
		int num3 = Screen.width - Screen.width / 100 * this.outer_percent;
		int num4 = Screen.height / 100 * this.outer_percent;
		int num5 = Screen.height - Screen.height / 100 * this.outer_percent;
		int num6 = Screen.width / 10 * this.inner_percent;
		int num7 = Screen.width - Screen.width / 100 * this.inner_percent;
		int num8 = Screen.height / 10 * this.inner_percent;
		int num9 = Screen.height - Screen.height / 100 * this.inner_percent;
		int num10 = 1000000;
		int num11 = 1000000;
		int num12 = 0;
		int num13 = 0;
		int i = 0;
		Transform[] array = this.targets;
		int length = array.Length;
		while (i < length)
		{
			a += array[i].position;
			num += (float)1;
			Vector3 vector = this.cam.WorldToScreenPoint(array[i].position);
			num10 = (int)Mathf.Min((float)num10, vector.x);
			num11 = (int)Mathf.Min((float)num11, vector.y);
			num12 = (int)Mathf.Max((float)num12, vector.x);
			num13 = (int)Mathf.Max((float)num13, vector.y);
			i++;
		}
		if (num2 > num10 || num4 > num11)
		{
			this.zoom--;
		}
		if (num3 < num12 || num5 < num13)
		{
			this.zoom--;
		}
		if (num10 > num6 && num12 < num7 && num11 > num8 && num13 < num9)
		{
			this.zoom++;
		}
		this.zoom = Mathf.Min(this.zoom, -200);
		Vector3 v = a / num;
		Vector2 vector2 = Vector2.Lerp(this.transform.position, v, this.smoothingFactor);
		this.transform.position = new Vector3(vector2.x, vector2.y, (float)this.zoom);
	}

	public override void Main()
	{
	}
}
