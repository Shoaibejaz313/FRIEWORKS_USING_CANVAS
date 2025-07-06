const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
let gravity = 0.05;
let friction = 0.99;

class Particles {
    constructor(x, y, color,velocity) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.color = color;
        this.velocity = velocity
        this.alpha =1;
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction
        this.velocity.y += gravity; 
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.alpha -= 0.005;
    }
}


let particlesArray = [];
let mouse = {
    x:undefined,
    y:undefined
}

addEventListener("click", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    let power = 30;
    let particle = 200;
    let angleincrement = (Math.PI * 2)/particle;
    for (let i = 0; i < particle; i++) {
        particlesArray.push(new Particles(mouse.x,mouse.y,`hsl(${Math.random() * 360}, 50%,50%)`,{
            x:Math.cos(angleincrement * i) * Math.random() * power,
            y:Math.sin(angleincrement * i) * Math.random() * power
        }));
    }
})


function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0,0,0,0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle,i) => {
        if(particle.alpha > 0){
            particle.update();
        }else if(particle.alpha < 0){
          particlesArray.splice(i,1);
        }
    })
}
console.log(particlesArray)

animate();