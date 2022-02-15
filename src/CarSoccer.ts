import * as THREE from 'three'
import { GraphicsApp } from './GraphicsApp'
import { Car } from './Car'
import { Ball } from './Ball';

export class CarSoccer extends GraphicsApp
{
    private inputVector : THREE.Vector2;
    private car : Car;
    private ball : Ball; 

    constructor()
    {
        // Pass in the aspect ratio as a parameter
        super(2);
        
        // Initialize all member variables here
        // This will help prevent runtime errors
        this.inputVector = new THREE.Vector2();
        this.car = new Car(new THREE.Vector3(0, 1, 45), new THREE.Vector3(4, 4, 5), 4);
        this.ball = new Ball(new THREE.Vector3(0, 2.6, 0), 2.6);
    }

    createScene() : void
    {
        // Setup camera
        this.camera.position.set(0, 63, 73);
        this.camera.lookAt(0, 0, 0);
        this.camera.up.set(0, 1, 0);

        // Create an ambient light
        var ambientLight = new THREE.AmbientLight('white', .3);
        this.scene.add(ambientLight);

        // Create a directional light
        var directionalLight = new THREE.DirectionalLight('white', .6);
        directionalLight.position.set(0, 2, 1);
        this.scene.add(directionalLight)

        // Load a texture and set it as the background
        this.scene.background = new THREE.TextureLoader().load('assets/crowd.png')

        // Create the green field material
        var fieldMaterial = new THREE.MeshLambertMaterial();
        fieldMaterial.color = new THREE.Color(16/255, 46/255, 9/255);

        // Create a field mesh
        var field = new THREE.Mesh(new THREE.BoxGeometry(100, 1, 120), fieldMaterial);
        field.position.set(0, -.501, 0);
        this.scene.add(field);

        // Load in the pitch image and create a texture
        var pitchMaterial = new THREE.MeshLambertMaterial();
        pitchMaterial.map = new THREE.TextureLoader().load('assets/pitch.png');

        // Create the mesh for the pitch
        var pitch = new THREE.Mesh(new THREE.BoxGeometry(80, 1, 100), pitchMaterial);
        pitch.position.set(0, -0.5, 0);
        this.scene.add(pitch);

        // Add the car and ball to the scene
        this.scene.add(this.car);
        this.scene.add(this.ball);

        //Top-right corner line
        var material = new THREE.LineBasicMaterial({color: 0x00ff00});
        var points1 = [];
        points1.push( new THREE.Vector3( 40, 0, -50 ) );
        points1.push( new THREE.Vector3( 40, 35, -50 ) );
        var geometry = new THREE.BufferGeometry().setFromPoints( points1 );
        var line1 = new THREE.Line(geometry, material);
        this.scene.add(line1);

        //Top-left corner line
        var points2 = [];
        points2.push( new THREE.Vector3( -40, 0, -50 ) );
        points2.push( new THREE.Vector3( -40, 35, -50 ) );
        var geometry = new THREE.BufferGeometry().setFromPoints( points2 );
        var line2 = new THREE.Line(geometry, material);
        this.scene.add(line2);

        //Bottom-right corner line
        var points3 = [];
        points3.push( new THREE.Vector3( 40, 0, 50 ) );
        points3.push( new THREE.Vector3( 40, 35, 50 ) );
        var geometry = new THREE.BufferGeometry().setFromPoints( points3 );
        var line3 = new THREE.Line(geometry, material);
        this.scene.add(line3);

        //Bottom-left corner line
        var points4 = [];
        points4.push( new THREE.Vector3( -40, 0, 50 ) );
        points4.push( new THREE.Vector3( -40, 35, 50 ) );
        var geometry = new THREE.BufferGeometry().setFromPoints( points4 );
        var line4 = new THREE.Line(geometry, material);
        this.scene.add(line4);

        //Horizontal stuff
        var points = [];
        points.push( new THREE.Vector3( 40, 35, 50 ) );
        points.push( new THREE.Vector3( -40, 35, 50 ) );
        points.push( new THREE.Vector3( -40, 35, -50 ) );
        points.push( new THREE.Vector3( 40, 35, -50 ) );
        points.push( new THREE.Vector3( 40, 35, 50 ) );
        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var line = new THREE.Line(geometry, material);
        this.scene.add(line);

        const box = new THREE.Box3(new THREE.Vector3(-40, 0, -50), new THREE.Vector3(40, 35, 50));
        const boxMesh = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial())
        boxMesh.geometry.computeBoundingBox();
        const helper = new THREE.Box3Helper(box);
        this.scene.add(helper);


        //Top Goal
        const goalMaterial1 = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
        const goalPoints1= []
        goalPoints1.push( new THREE.Vector3( 10, 10, -50 ) );
        goalPoints1.push( new THREE.Vector3( -10, 10, -50 ) );
        goalPoints1.push( new THREE.Vector3( -10, 0, -50 ) );
        goalPoints1.push( new THREE.Vector3( 10, 0, -50 ) );
        goalPoints1.push( new THREE.Vector3( 10, 10, -50 ) );
        goalPoints1.push( new THREE.Vector3( 5, 10, -50 ) );
        goalPoints1.push( new THREE.Vector3( 5, 0, -50 ) );
        goalPoints1.push( new THREE.Vector3( 0, 0, -50 ) );
        goalPoints1.push( new THREE.Vector3( 0, 10, -50 ) );
        goalPoints1.push( new THREE.Vector3( -5, 10, -50 ) );
        goalPoints1.push( new THREE.Vector3( -5, 0, -50 ) );
        goalPoints1.push( new THREE.Vector3( -10, 0, -50 ) );
        goalPoints1.push( new THREE.Vector3( -10, 2.5, -50 ) );
        goalPoints1.push( new THREE.Vector3( 10, 2.5, -50 ) );
        goalPoints1.push( new THREE.Vector3( -10, 2.5, -50 ) );
        goalPoints1.push( new THREE.Vector3( -10, 5, -50 ) );
        goalPoints1.push( new THREE.Vector3( 10, 5, -50 ) );
        goalPoints1.push( new THREE.Vector3( 10, 7.5, -50 ) );
        goalPoints1.push( new THREE.Vector3( -10, 7.5, -50 ) );
        var geometry = new THREE.BufferGeometry().setFromPoints(goalPoints1);
        var goalLine1 = new THREE.Line(geometry, goalMaterial1);
        this.scene.add( goalLine1 );

        //Bottom Goal
        const goalMaterial2 = new THREE.MeshBasicMaterial( {color: 0xFFA500} );
        const goalPoints2= []
        goalPoints2.push( new THREE.Vector3( 10, 10, 50 ) );
        goalPoints2.push( new THREE.Vector3( -10, 10, 50 ) );
        goalPoints2.push( new THREE.Vector3( -10, 0, 50 ) );
        goalPoints2.push( new THREE.Vector3( 10, 0, 50 ) );
        goalPoints2.push( new THREE.Vector3( 10, 10, 50 ) );
        goalPoints2.push( new THREE.Vector3( 5, 10, 50 ) );
        goalPoints2.push( new THREE.Vector3( 5, 0, 50 ) );
        goalPoints2.push( new THREE.Vector3( 0, 0, 50 ) );
        goalPoints2.push( new THREE.Vector3( 0, 10, 50 ) );
        goalPoints2.push( new THREE.Vector3( -5, 10, 50 ) );
        goalPoints2.push( new THREE.Vector3( -5, 0, 50 ) );
        goalPoints2.push( new THREE.Vector3( -10, 0, 50 ) );
        goalPoints2.push( new THREE.Vector3( -10, 2.5, 50 ) );
        goalPoints2.push( new THREE.Vector3( 10, 2.5, 50 ) );
        goalPoints2.push( new THREE.Vector3( -10, 2.5, 50 ) );
        goalPoints2.push( new THREE.Vector3( -10, 5, 50 ) );
        goalPoints2.push( new THREE.Vector3( 10, 5, 50 ) );
        goalPoints2.push( new THREE.Vector3( 10, 7.5, 50 ) );
        goalPoints2.push( new THREE.Vector3( -10, 7.5, 50 ) );
        var geometry = new THREE.BufferGeometry().setFromPoints(goalPoints2);
        var goalLine2 = new THREE.Line(geometry, goalMaterial2);
        this.scene.add( goalLine2 );
    }

    update(deltaTime : number) : void
    {
        // Speed in meters/sec
        const carMaxSpeed = 30;
        const accelerationRate = 20;
        const rotationRate = 6;
        const gravityRate = 20;
        // Move the car based on the user input vector

        if((this.ball.position.x < 10 && this.ball.position.x > -10) && (this.ball.position.y < 20) && (this.ball.position.z <= -50 || this.ball.position.z >= 50)) {
            this.ball.reset();
            this.car.reset();
            this.ball.velocity = new THREE.Vector3(0,0,0);
        }

        if(this.inputVector.y != 0){
            this.car.velocity.set(0, 0, this.car.velocity.z+accelerationRate*deltaTime*(-this.inputVector.y));
            this.car.rotateY(rotationRate * -this.inputVector.x * deltaTime);
        }

            

        if(this.inputVector.y == 0) {
            if(this.car.velocity.z > 0) {
                this.car.velocity.set(0, 0, this.car.velocity.z + (-40 * deltaTime));
            }
            else if(this.car.velocity.z < 0) {
                this.car.velocity.set(0, 0, this.car.velocity.z + (40 * deltaTime));
            }
            
        }

        this.car.update(deltaTime);

        // Update the ball physics
        if(this.ball.position.y >= 2.6) {
            this.ball.velocity.subVectors(this.ball.velocity, new THREE.Vector3(0, gravityRate * deltaTime, 0));
        }

        var distance = Math.sqrt((this.ball.position.x -this.car.position.x) * (this.ball.position.x-this.car.position.x) + (this.ball.position.y - this.car.position.y) * (this.ball.position.y-this.car.position.y) + (this.ball.position.z -this.car.position.z) * (this.ball.position.z-this.car.position.z));
        if(distance < (this.car.collisionRadius + this.ball.radius)) {
            console.log("here");
            var trueCarVelocity = this.car.velocity;
            trueCarVelocity.applyEuler(this.car.rotation);
            var normal= new THREE.Vector3(0,0,0);
            normal.subVectors(this.ball.position,this.car.position)
            normal = normal.normalize();
            var relVelocity = new THREE.Vector3(0,0,0);
            relVelocity.subVectors(this.ball.velocity,trueCarVelocity);
            var dotProduct = relVelocity.dot(normal);
            dotProduct *= 2;
            normal.multiplyScalar(dotProduct);
            var newRelative = new THREE.Vector3(0,0,0);
            newRelative.subVectors(relVelocity, normal);
            this.ball.velocity.addVectors(trueCarVelocity,newRelative);

            var truePosition = new THREE.Vector3();
            truePosition.subVectors(this.car.position, this.ball.position);
            truePosition = truePosition.normalize();
            var offset = Math.abs((this.car.collisionRadius + this.ball.radius+6)-distance);
            this.ball.position.subVectors(this.car.position,truePosition.multiplyScalar(offset));
        }


        this.ball.update(deltaTime);

        // Update the ball shadow
        this.ball.updateShadow();
    }

    // Event handler for keyboard input
    // You don't need to modify this function
    onKeyDown(event: KeyboardEvent): void 
    {
        if(event.key == 'w' || event.key == 'ArrowUp')
            this.inputVector.y = 1;
        else if(event.key == 's' || event.key == 'ArrowDown')
            this.inputVector.y = -1;
        else if(event.key == 'a' || event.key == 'ArrowLeft')
            this.inputVector.x = -1;
        else if(event.key == 'd' || event.key == 'ArrowRight')
            this.inputVector.x = 1;
        else if(event.key == ' ')
        {
            this.car.reset();
            this.ball.reset();
        }
    }

    // Event handler for keyboard input
    // You don't need to modify this function
    onKeyUp(event: KeyboardEvent): void 
    {
        if((event.key == 'w' || event.key == 'ArrowUp') && this.inputVector.y == 1)
            this.inputVector.y = 0;
        else if((event.key == 's' || event.key == 'ArrowDown') && this.inputVector.y == -1)
            this.inputVector.y = 0;
        else if((event.key == 'a' || event.key == 'ArrowLeft')  && this.inputVector.x == -1)
            this.inputVector.x = 0;
        else if((event.key == 'd' || event.key == 'ArrowRight')  && this.inputVector.x == 1)
            this.inputVector.x = 0;
    }
}
