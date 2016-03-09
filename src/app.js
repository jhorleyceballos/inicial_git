$(() => {
    const socket        =   io();
    const key_enter     =   13;
    const key_down      =   40;
    const key_left      =   37;
    const key_up        =   38;
    const key_right     =   39;
    var canvas          =   null;
    var ctx             =   null;
    var dir             =   0;
    var lastPress       =   null;
    var lastPressRemote =   null;
    var pause           =   true;
    var x               =   50;
    var y               =   300;

    document.addEventListener('keydown', ev => {
        lastPress       =   ev.which;
        socket.emit('key', lastPress);
    }, false);

    socket.on('key', key => {
        lastPressRemote = key;
        console.log(lastPressRemote);
    });

    function draw (ctx) {
        ctx.font        =   '20px Arial';

        ctx.fillStyle   =   '#2e2a2a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle   =   '#31b95f';
        ctx.fillRect(x, y, 20, 20);

        ctx.fillText(`Las Key: ${lastPress}`, 10, 25)

        if (pause) {
            ctx.textAlign   =   'center';
            ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 2);
            ctx.textAlign   =   'left';
        }
    }

    function reDraw () {
        window.requestAnimationFrame(reDraw);
        draw(ctx)
    }

    function run () {
        setTimeout(run, 50);
        update();
    }

    function update () {
        if (!pause) {
            if (lastPress === key_up || lastPressRemote === key_up) dir = 0;
            if (lastPress === key_down || lastPressRemote === key_down) dir = 2;
            if (lastPress === key_left || lastPressRemote === key_left) dir = 3;
            if (lastPress === key_right || lastPressRemote === key_right) dir = 1;
            //---------------------------//

            if (dir === 0) y -= 15;
            if (dir === 1) x += 15;
            if (dir === 2) y += 15;
            if (dir === 3) x -= 15;

            //--------------------------//

            if (x > canvas.width) x = 0;
            if (y > canvas.height) y = 0;
            if (x < 0) x = canvas.width;
            if (y < 0) y = canvas.height;
        }

        if (lastPress === key_enter || lastPressRemote === key_enter) {
            pause   =   !pause;
            lastPress   =   null;
        }
    }

    function init () {
        canvas  =   document.getElementById('canvas');
        ctx     =   canvas.getContext('2d');

        run();
        reDraw();
    }

    init();



});
