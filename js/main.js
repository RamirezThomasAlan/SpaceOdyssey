// Game variables
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const infoPanel = document.getElementById('info-panel');
const panelTitle = document.getElementById('panel-title');
const panelContent = document.getElementById('panel-content');
const closeBtn = document.getElementById('close-btn');
const startBtn = document.getElementById('start-btn');
const titleScreen = document.getElementById('title-screen');

// Game state
let gameRunning = false;
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 32,
    height: 32,
    speed: 4,
    direction: 'up',
    moving: false,
    engineOn: false
};

// Planets configuration
const planets = [
    {
        type: 'about',
        title: 'About Me',
        x: 400,
        y: 150,
        radius: 50,
        color: '#4cc9f0',
        angle: 0,
        speed: 0.005,
        hasRing: false,
        orbitRadius: 0
    },
    {
        type: 'skills',
        title: 'Skills',
        x: 550,
        y: 300,
        radius: 40,
        color: '#f72585',
        angle: Math.PI/2,
        speed: 0.008,
        hasRing: true,
        orbitRadius: 0
    },
    {
        type: 'projects',
        title: 'Projects',
        x: 400,
        y: 450,
        radius: 45,
        color: '#7209b7',
        angle: Math.PI,
        speed: 0.006,
        hasRing: false,
        orbitRadius: 0
    },
    {
        type: 'contact',
        title: 'Contact',
        x: 250,
        y: 300,
        radius: 35,
        color: '#3a86ff',
        angle: 3*Math.PI/2,
        speed: 0.007,
        hasRing: true,
        orbitRadius: 0
    }
];

// Initialize planet orbits
planets.forEach(planet => {
    planet.orbitRadius = Math.sqrt(Math.pow(planet.x - 400, 2) + Math.pow(planet.y - 300, 2));
    planet.originalX = planet.x;
    planet.originalY = planet.y;
});

// Player info
const playerInfo = {
    about: `
        <p>I'm Thomas Ramírez, a Frontend Developer with experience in creating modern, functional and visually appealing websites.</p>
        <p>I specialize in React and WordPress with Elementor Pro, technologies I master to build responsive digital experiences, fast and with a strong user orientation.</p>
        <p>During the last year I worked on my own projects and in a company as a WordPress Developer, where I developed sites with a focus on performance, SEO and professional design.</p>
        <p>I'm passionate about creating web products that really add value, combining aesthetics, functionality and innovation.</p>
    `,
    skills: `
        <p>Technologies I work with:</p>
        <div id="skills-list">
            <span class="skill-chip">React</span>
            <span class="skill-chip">JavaScript</span>
            <span class="skill-chip">HTML5</span>
            <span class="skill-chip">CSS3</span>
            <span class="skill-chip">Sass</span>
            <span class="skill-chip">Bootstrap</span>
            <span class="skill-chip">WordPress</span>
            <span class="skill-chip">Elementor Pro</span>
            <span class="skill-chip">Git & GitHub</span>
        </div>
    `,
    projects: `
        <div class="project-card">
            <div class="project-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                PixelAdventureGame
            </div>
            <p>🎮 Pixel art adventure game with React - A decision-based interactive game with pixel art style, created with React, pure HTML and CSS.</p>
            <p><strong>Features:</strong> 15+ branching scenes, interactive inventory, 6 different endings with achievements, pixel visual effects, fully responsive.</p>
            <a href="https://ramirezthomasalan.github.io/PixelAdventureGame/" target="_blank" class="project-link">View Project</a>
        </div>
        
        <div class="project-card">
            <div class="project-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                NexusCalc
            </div>
            <p>🧮 Premium calculator with JavaScript - A dark-themed calculator with visual effects, created with HTML, CSS and JavaScript.</p>
            <p><strong>Features:</strong> Basic operations, special functions (%, +/-), keyboard support, confetti effect on large results, fully responsive.</p>
            <a href="https://ramirezthomasalan.github.io/NexusCalc/" target="_blank" class="project-link">View Project</a>
        </div>
        
        <div class="project-card">
            <div class="project-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                PureFrame
            </div>
            <p>🎧 Minimalist headphones landing page - A clean landing page for fictional headphones, created with pure HTML and CSS.</p>
            <p><strong>Features:</strong> Mobile-first design, responsive layout, clean aesthetics, technical specifications section.</p>
            <a href="https://ramirezthomasalan.github.io/PureFrame/" target="_blank" class="project-link">View Project</a>
        </div>
    `,
    contact: `
        <p>🔍 Currently looking for an opportunity as a Frontend Developer Jr/Ssr or WordPress Developer, either as an employee or freelancer.</p>
        
        <div style="margin-top: 20px;">
            <a href="https://portafolio-thomas-ramirez.netlify.app/" target="_blank" class="contact-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Portfolio: portafolio-thomas-ramirez.netlify.app
            </a>
            
            <a href="https://www.linkedin.com/in/thomas-alan-ramirez/" target="_blank" class="contact-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn: linkedin.com/in/thomas-alan-ramirez
            </a>
            
            <a href="https://github.com/RamirezThomasAlan" target="_blank" class="contact-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub: github.com/RamirezThomasAlan
            </a>
            
            <a href="mailto:ramirezthomasalan@gmail.com" class="contact-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email: ramirezthomasalan@gmail.com
            </a>
        </div>
    `
};

// Keyboard and touch controls
const keys = { up: false, down: false, left: false, right: false, space: false };
let isDragging = false;
let lastTouchTime = 0;

// Event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
closeBtn.addEventListener('click', closePanel);
startBtn.addEventListener('click', startGame);
canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
canvas.addEventListener('touchend', handleTouchEnd);

// Initialize game
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game functions
function drawSpaceship() {
    ctx.save();
    ctx.translate(player.x + player.width/2, player.y + player.height/2);
    
    // Rotate based on direction
    switch(player.direction) {
        case 'up': ctx.rotate(0); break;
        case 'right': ctx.rotate(Math.PI/2); break;
        case 'down': ctx.rotate(Math.PI); break;
        case 'left': ctx.rotate(3*Math.PI/2); break;
    }
    
    // Spaceship body
    ctx.fillStyle = '#4cc9f0';
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(10, 10);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.fill();
    
    // Cockpit
    ctx.fillStyle = 'rgba(247, 37, 133, 0.7)';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Engine glow when moving
    if (player.engineOn) {
        ctx.fillStyle = '#f72585';
        ctx.beginPath();
        ctx.moveTo(-8, 10);
        ctx.lineTo(8, 10);
        ctx.lineTo(0, 20);
        ctx.closePath();
        ctx.fill();
        
        // Engine particles
        ctx.fillStyle = 'rgba(247, 37, 133, 0.7)';
        for (let i = 0; i < 5; i++) {
            const size = Math.random() * 4 + 2;
            const offset = (Math.random() * 16) - 8;
            ctx.beginPath();
            ctx.arc(offset, 10 + Math.random() * 15 + 5, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    ctx.restore();
}

function drawPlanets() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    planets.forEach(planet => {
        // Update planet position in orbit
        planet.angle += planet.speed;
        planet.x = centerX + Math.cos(planet.angle) * planet.orbitRadius;
        planet.y = centerY + Math.sin(planet.angle) * planet.orbitRadius;
        
        // Draw planet
        ctx.save();
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        
        // Create gradient for planet
        const gradient = ctx.createRadialGradient(
            planet.x - planet.radius * 0.3,
            planet.y - planet.radius * 0.3,
            planet.radius * 0.1,
            planet.x,
            planet.y,
            planet.radius
        );
        
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(1, '#1a1a2e');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
        
        // Draw planet ring if it has one
        if (planet.hasRing) {
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(
                planet.x, planet.y,
                planet.radius * 1.5, planet.radius * 0.5,
                planet.angle, 0, Math.PI * 2
            );
            ctx.strokeStyle = planet.color;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
        }
        
        // Draw planet glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius * 1.1, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
            planet.x, planet.y, planet.radius * 0.5,
            planet.x, planet.y, planet.radius * 1.1
        );
        glowGradient.addColorStop(0, planet.color);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.globalCompositeOperation = 'lighter';
        ctx.fill();
        ctx.restore();
        
        // Draw planet label
        ctx.save();
        ctx.font = 'bold 14px Rajdhani';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(planet.title, planet.x, planet.y + planet.radius + 10);
        
        // Label glow
        ctx.shadowColor = planet.color;
        ctx.shadowBlur = 10;
        ctx.fillText(planet.title, planet.x, planet.y + planet.radius + 10);
        ctx.restore();
    });
}

function drawStars() {
    // Draw background stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5;
        const opacity = Math.random() * 0.8 + 0.2;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
    
    // Draw some twinkling stars
    const time = Date.now() * 0.001;
    for (let i = 0; i < 30; i++) {
        const x = (Math.sin(time + i) * 100 + i * 80) % canvas.width;
        const y = (Math.cos(time + i * 0.5) * 50 + i * 60) % canvas.height;
        const size = Math.sin(time + i) * 0.5 + 1.5;
        const opacity = Math.sin(time + i * 0.3) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function updatePlayer() {
    if (keys.up && player.y > 0) player.y -= player.speed;
    if (keys.down && player.y < canvas.height - player.height) player.y += player.speed;
    if (keys.left && player.x > 0) player.x -= player.speed;
    if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;
    
    // Check for planet collisions
    if (keys.space && infoPanel.style.display !== 'block') {
        checkPlanetInteraction();
    }
}

function checkPlanetInteraction() {
    planets.forEach(planet => {
        const distance = Math.sqrt(
            Math.pow(player.x + player.width/2 - planet.x, 2) + 
            Math.pow(player.y + player.height/2 - planet.y, 2)
        );
        
        if (distance < planet.radius + 20) {
            panelTitle.textContent = planet.title;
            panelContent.innerHTML = playerInfo[planet.type];
            infoPanel.style.display = 'block';
        }
    });
}

function checkTouchInteraction(x, y) {
    planets.forEach(planet => {
        const distance = Math.sqrt(
            Math.pow(x - planet.x, 2) + 
            Math.pow(y - planet.y, 2)
        );
        
        if (distance < planet.radius + 20) {
            panelTitle.textContent = planet.title;
            panelContent.innerHTML = playerInfo[planet.type];
            infoPanel.style.display = 'block';
        }
    });
}

function gameLoop() {
    if (!gameRunning) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw space background
    drawStars();
    
    // Draw planets
    drawPlanets();
    
    // Update and draw player
    updatePlayer();
    drawSpaceship();
    
    // Continue loop
    requestAnimationFrame(gameLoop);
}

// Event handlers
function handleKeyDown(e) {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp': 
            keys.up = true; 
            player.direction = 'up'; 
            player.moving = true; 
            player.engineOn = true; 
            break;
        case 'ArrowDown': 
            keys.down = true; 
            player.direction = 'down'; 
            player.moving = true; 
            player.engineOn = true; 
            break;
        case 'ArrowLeft': 
            keys.left = true; 
            player.direction = 'left'; 
            player.moving = true; 
            player.engineOn = true; 
            break;
        case 'ArrowRight': 
            keys.right = true; 
            player.direction = 'right'; 
            player.moving = true; 
            player.engineOn = true; 
            break;
        case ' ': 
            keys.space = true; 
            break;
    }
}

function handleKeyUp(e) {
    switch(e.key) {
        case 'ArrowUp': 
            keys.up = false; 
            if (!keys.down && !keys.left && !keys.right) { 
                player.moving = false; 
                player.engineOn = false; 
            } 
            break;
        case 'ArrowDown': 
            keys.down = false; 
            if (!keys.up && !keys.left && !keys.right) { 
                player.moving = false; 
                player.engineOn = false; 
            } 
            break;
        case 'ArrowLeft': 
            keys.left = false; 
            if (!keys.up && !keys.down && !keys.right) { 
                player.moving = false; 
                player.engineOn = false; 
            } 
            break;
        case 'ArrowRight': 
            keys.right = false; 
            if (!keys.up && !keys.down && !keys.left) { 
                player.moving = false; 
                player.engineOn = false; 
            } 
            break;
        case ' ': 
            keys.space = false; 
            break;
    }
}

function handleTouchStart(e) {
    e.preventDefault();
    const touchTime = Date.now();
    const isQuickTap = touchTime - lastTouchTime < 300;
    lastTouchTime = touchTime;
    
    const rect = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const touchY = e.touches[0].clientY - rect.top;
    
    player.x = touchX - player.width/2;
    player.y = touchY - player.height/2;
    player.moving = true;
    player.engineOn = true;
    isDragging = true;
    
    if (isQuickTap) {
        checkTouchInteraction(touchX, touchY);
    }
}

function handleTouchMove(e) {
    if (isDragging) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;
        
        player.x = touchX - player.width/2;
        player.y = touchY - player.height/2;
    }
}

function handleTouchEnd() {
    isDragging = false;
    player.moving = false;
    player.engineOn = false;
}

function resizeCanvas() {
    if (window.innerWidth <= 768) {
        // Mobile layout
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;
        
        planets.forEach(planet => {
            planet.radius = planet.originalRadius * (window.innerWidth / 800) * 0.8;
            planet.orbitRadius = Math.min(canvas.width, canvas.height) * 0.35;
        });
        
        player.width = 32 * (window.innerWidth / 800);
        player.height = 32 * (window.innerWidth / 800);
        player.speed = 4 * (window.innerWidth / 800);
    } else {
        // PC layout
        canvas.width = 800;
        canvas.height = 600;
        
        planets.forEach(planet => {
            planet.radius = planet.originalRadius;
            planet.orbitRadius = Math.sqrt(
                Math.pow(planet.originalX - 400, 2) + 
                Math.pow(planet.originalY - 300, 2)
            );
        });
        
        player.width = 32;
        player.height = 32;
        player.speed = 4;
    }
    
    // Center player
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height / 2 - player.height / 2;
}

function closePanel() {
    infoPanel.style.display = 'none';
}

function startGame() {
    titleScreen.style.display = 'none';
    gameRunning = true;
    resizeCanvas();
    gameLoop();
}