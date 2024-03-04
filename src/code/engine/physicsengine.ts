
export class PhysicsEngine {
    

    /** PHYSICAL ___CONSTANTS____ **/
    repulsionConstant: number = -0.1; 
    springConstant: number = -0.1; // Spring stiffness
    springRestLength: number = 100;
    dampeningConstant: number = 0.01;

    // Function to update sprite position and velocity
    updateSprite(sprite: any, deltaTime: number) {
        // Apply gravity and update position as before
        if(sprite.velocity) {
            sprite.x += sprite.velocity.x * deltaTime;
            sprite.y += sprite.velocity.y * deltaTime;
        }
    }
    handleRangedInteractions(sprites: any[], deltaTime: number, linkedNodes: [any, any][]) {
        sprites.forEach((spriteA, index) => {
            for (let j = index + 1; j < sprites.length; j++) {
                const spriteB = sprites[j];

                // Initialize total force to 0
                let force = 0;

                // Check if the pair is linked (i.e., parent-child relationship)
                const isLinked = linkedNodes.some(([parent, child]) => 
                    (spriteA === parent && spriteB === child) || (spriteA === child && spriteB === parent));

                // Apply spring force if the sprites are linked
                if (isLinked) {
                    force += this.calculateSpringForce(spriteA, spriteB, this.springRestLength);
                }

                // Apply repulsive force for all pairs
                force += this.calculateRepulsiveForce(spriteA, spriteB);

                if (index == 0) {
                    force = 0
                }

                // Apply the total force to both sprites
                this.applyForce(spriteA, spriteB, force, deltaTime);
                //console.log("force on "+index+": "+force);
            }

            const dampingForce = this.calculateDampingForce(spriteA);
            spriteA.velocity.x += dampingForce.x * deltaTime;
            spriteA.velocity.y += dampingForce.y * deltaTime;
            
            /* viscosity f = - c*v */
            this.updateSprite(spriteA, deltaTime);
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
    calculateDampingForce(sprite: any): { x: number; y: number } {
        // Damping force is proportional to the negative of velocity
        const fx = -this.dampeningConstant * sprite.velocity.x;
        const fy = -this.dampeningConstant * sprite.velocity.y;

        return { x: fx, y: fy };
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