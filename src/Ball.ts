import * as THREE from 'three'

export class Ball extends THREE.Object3D
{
    readonly radius : number;

    public velocity : THREE.Vector3;
    public initialPosition : THREE.Vector3;
    private shadow : THREE.Mesh;

    constructor(position: THREE.Vector3, radius : number)
    {
        super();
        this.radius = radius;
        this.velocity = new THREE.Vector3();
        this.initialPosition = position;

        // Create the sphere
        var geometry = new THREE.SphereGeometry(this.radius);
        var material = new THREE.MeshPhongMaterial();
        material.color = new THREE.Color(0.335, 0.775, 0.891);
        this.add(new THREE.Mesh(geometry, material));

        // Create a semi-transparent shadow
        var shadowGeometry = new THREE.CircleGeometry(this.radius, 20);
        var shadowMaterial = new THREE.MeshBasicMaterial();
        shadowMaterial.color = new THREE.Color(0, 0, 0); 
        shadowMaterial.transparent = true;
        shadowMaterial.opacity = 0.5;
        this.shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
        this.shadow.rotation.set(-90 * Math.PI / 180, 0, 0);
        this.add(this.shadow);
          
        this.reset();
    }

    public reset() : void
    {
        // Reset the ball's position
        this.position.copy(this.initialPosition);

        // Throw the ball in a random direction
        var randomAngle = Math.random() * Math.PI * 2;
        this.velocity.set(25*Math.cos(randomAngle), 10, 25* Math.sin(randomAngle))
    }

    public update(deltaTime : number) : void
    {   


        if(this.position.y < 2.6) {
            this.position.y=2.6;
            this.velocity.y = this.velocity.y *-1;
            this.velocity.multiplyScalar(.8);
        }      
  
        if(this.position.x > 40) {
            this.position.x = 39
            this.velocity.x = this.velocity.x *-1;
            this.velocity.multiplyScalar(.8);
        }
        if(this.position.x < -40) {
            this.position.x = -39
            this.velocity.x = this.velocity.x *-1;
            this.velocity.multiplyScalar(.8);
        }
        if(this.position.z > 50) {
            this.position.z = 49
            this.velocity.z = this.velocity.z *-1;
            this.velocity.multiplyScalar(.8);
        }
        if(this.position.z < -50) {
            this.position.z = -49
            this.velocity.z = this.velocity.z *-1;
            this.velocity.multiplyScalar(.8);
        }

        if(this.position.y > 35) {
            this.position.y = 34;
            this.velocity.y = this.velocity.y * -1;
            this.velocity.multiplyScalar(.8);
        }
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.position.z += this.velocity.z * deltaTime;
    }

    public updateShadow() : void
    {
        // Move the shadow down and slightly above the ground
        this.shadow.position.set(0, -this.position.y + 0.01, 0);
    }
}