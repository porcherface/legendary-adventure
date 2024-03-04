
export class PhysicsEngine {
    repulsionConstant: number = 1; 
    springConstant: number = 50; // Spring stiffness
    springRestLength: number = 0;
    // Function to update sprite position and velocity
    updateSprite(sprite: any, deltaTime: number) {
        // Apply gravity and update position as before
        if(sprite.velocity) {
            sprite.x += sprite.velocity.x * deltaTime;
            sprite.y += sprite.velocity.y * deltaTime;
        }
    }

    // Function to handle interactions with ranged forces
    handleRangedInteractions(sprites: any[], deltaTime: number) {
        sprites.forEach((spriteA, index) => {
            for (let j = index + 1; j < sprites.length; j++) {
                const spriteB = sprites[j];

                // Calculate the force between spriteA and spriteB
                const force = this.calculateSpringForce(spriteA, spriteB, this.springRestLength)
                + this.calculateRepulsiveForce(spriteA, spriteB);

                // Apply the force to both sprites
                this.applyForce(spriteA, spriteB, force, deltaTime);
            }
        });
    }

    // Calculate repulsive force (for non-connected objects)
    calculateRepulsiveForce(spriteA: any, spriteB: any): number {
        const distanceX = spriteB.x - spriteA.x;
        const distanceY = spriteB.y - spriteA.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance === 0) return 0;

        // Repulsive force magnitude (similar to Coulomb's law)
        const force = this.repulsionConstant / (distance ** 2);

        return force;
    }

    // Calculate spring-like force (for connected objects, i.e., links in the skill tree)
    calculateSpringForce(spriteA: any, spriteB: any, restLength: number): number {
        const distanceX = spriteB.x - spriteA.x;
        const distanceY = spriteB.y - spriteA.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        // Displacement from the rest length of the spring
        const displacement = distance - restLength;

        // Spring force magnitude (Hooke's law)
        const force = -this.springConstant * displacement;

        return force;
    }

    // Apply the force to the objects, updating their velocities
    applyForce(spriteA: any, spriteB: any, force: number, deltaTime: number) {
        const distanceX = spriteB.x - spriteA.x;
        const distanceY = spriteB.y - spriteA.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        // Normalize the distance vector
        const nx = distanceX / distance;
        const ny = distanceY / distance;

        // Update velocities based on force and object mass
        spriteA.velocity.x += (nx * force / spriteA.mass) * deltaTime;
        spriteA.velocity.y += (ny * force / spriteA.mass) * deltaTime;
        spriteB.velocity.x -= (nx * force / spriteB.mass) * deltaTime;
        spriteB.velocity.y -= (ny * force / spriteB.mass) * deltaTime;
    }
}