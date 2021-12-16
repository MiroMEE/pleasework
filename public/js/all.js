const socket = io();
const main = document.querySelector('.rohDiv');
let i=0,width,height,so_;
const startUp = (width,height)=>{
    client_NAME();
    server_for_clients();
    main.style.width = width+"px";
    main.style.height = height+"px";
};
function server_for_clients(){
    socket.on('nameback',(value)=>{
        new player(value);
    });
};
const player = (value,w,a,s,d,id)=>{
    i+=1;
    const playerName = document.createElement('div');
    playerName.innerText = value;
    playerName.id = "player"+i;
    main.append(playerName);
    playerName.style.position = 'fixed';
    const clasPlayer = new getPlayerMove('player'+i,"player"+i);
    document.addEventListener('keypress',(event)=>{
        switch(true){
            case event.key == w||event.key == w.toUpperCase():
                clasPlayer.move_y('minus');
                break;
            case event.key == a||event.key == a.toUpperCase():
                clasPlayer.move_x('minus');
                break;
            case event.key == s||event.key == s.toUpperCase():
                clasPlayer.move_y('plus');
                break;
            case event.key == d||event.key == d.toUpperCase():
                clasPlayer.move_x('plus');
                break;
            default:
                break;
        };
    });/*BUGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG NEED NAME_CLIENT*/
    socket.on('sentBack',(value)=>{
        //if(!(your_name.id==value[2])){
            console.log("CHANGE!");
            document.querySelector('#'+value[2]).style.left = value[0]+"px";
            document.querySelector('#'+value[2]).style.top = value[1]+"px";
        //};
    });
};
class getPlayerMove{
    constructor(name,player){
        this.x = 0;
        this.y = 0;
        this.player = document.getElementById(player);
    };
    move_x(val){
        if(val=='minus'){
            so_ = -1
        } else if(val=='plus'){
            so_ = +1
        };
        this.x=(this.x+([so_]*10))
        this.player.style.left = this.x+'px';
        changeSend(this.x,this.y,this.player.id);
    };
    move_y(val){
        if(val=='minus'){
            so_ = -1
        } else if(val=='plus'){
            so_ = +1
        };
        this.y=(this.y+[so_]*10);
        this.player.style.top = this.y+'px';
        changeSend(this.x,this.y,this.player.id);
    };
};
function changeSend(x,y,who){
    socket.emit('sentPosi',[x,y,who]);
};

function client_NAME(){
    let h=0;
    const maslo = document.getElementById('savNam');
    maslo.addEventListener('click',()=>{
        const inputt = document.getElementById('save');
        socket.emit('CLIENT_NAME',inputt.value);
        maslo.remove();
        inputt.remove();
        player(inputt.value,'w','a','s','d',h);
        h+=1;
    });
};


startUp(900,600);