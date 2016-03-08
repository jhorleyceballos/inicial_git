var x               =   50;
var y               =   50;
var canvas          =   null;
var ctx             =   null;
var lastPress       =   null;
function draw (ctx) {
    ctx.fillStyle   = 'rgb(57, 57, 57)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle   = '#0f0';
    ctx.fillRect(x, y, 10, 10);

    ctx.fillText(lastPress, 20, 20);
}

document.addEventListener('keydown', ev => {
    lastPress       =   ev.which;
}, false);

function run() {
    window.requestAnimationFrame(run);
    update();
    draw(ctx);
}

function update(){
    if (x > canvas.width) x = 0
    if (x < 0) x = canvas.width
    if (y > canvas.height) y = 0
    if (y < 0) y = canvas.height
    //left
    if (lastPress === 39) x += 5;
    //right
    if (lastPress === 37) x -= 5;
    //up
    if (lastPress === 38) y -= 8;
    //down
    if (lastPress === 40) y += 8;
    //default
    if (lastPress === null) x += 5;
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    run();
}

window.addEventListener('load', init, false);
