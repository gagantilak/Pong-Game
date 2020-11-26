let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let leftpaddle=document.querySelector(".left");
let rightPaddle=document.querySelector(".right");

let boardBound=board.getBoundingClientRect();
let x=true;
let y=true;
let leftPlayerLives=3;
let rightPlayerLives=3;


document.addEventListener("keydown",function(e){
    if(e.key=="w"){
        movePaddle(leftpaddle,-window.innerHeight*0.1);
    }else if(e.key=="s"){
        movePaddle(leftpaddle,window.innerHeight*0.1);
    }else if(e.key=="ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight*0.1);
    }else if(e.key=="ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight*0.1);
    }
})
function setcolor(idx){
    let allicons=document.querySelectorAll(".fas.fa-circle");
    allicons[idx].style.Color="#686de0";
}
function movePaddle(cPaddle,change){
    cPaddleBound=cPaddle.getBoundingClientRect();
    if(cPaddleBound.top+change>=boardBound.top&&cPaddleBound.bottom+change<=boardBound.bottom){
        cPaddle.style.top=cPaddleBound.top+change+"px";
    }
    
}


function moveBall(){
    let ballcord=ball.getBoundingClientRect();
    let balltop=ballcord.top;
    let ballLeft=ballcord.left;
    let ballBottom=ballcord.bottom;
    let ballRight=ballcord.right;

    let hasTouchedLeft=ballLeft<boardBound.left;
    let hasTouchedRight=ballRight>boardBound.right;
    if(hasTouchedLeft||hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLives--;
            setcolor(leftPlayerLives);
            if(leftPlayerLives==0){
                alert("Game Over! Player B won!!");
                document.location.reload();
            }else{
                resetgame();
            }
        }else{
            rightPlayerLives--;
            setcolor(3+rightPlayerLives);
            if(rightPlayerLives==0){
                alert("Game Over! Player A won!!");
                document.location.reload();
            }else{
                resetgame();
            }
        }
    }
    
    function resetgame(){
        ball.style.top=window.innerHeight*0.45+"px";
        ball.style.left=window.innerWidth*0.45+"px";
        requestAnimationFrame(moveBall);
    }


    if(balltop<=boardBound.top||ballBottom>=boardBound.bottom){
        y=!y;
    }

    //if(ballLeft<=boardBound.left||ballRight>=boardBound.right){
      // x=!x;
    //}

    let leftPaddleBound=leftpaddle.getBoundingClientRect();
    let rightPaddleBound=rightPaddle.getBoundingClientRect();
    if(ballLeft<=leftPaddleBound.right&&ballRight>=leftPaddleBound.left&&balltop+30>=leftPaddleBound.top&&ballBottom-30<=leftPaddleBound.bottom){
        x=!x;
    }
    if(ballLeft<=rightPaddleBound.right&&ballRight>=rightPaddleBound.left&&balltop+30>=rightPaddleBound.top&&ballBottom-30<=rightPaddleBound.bottom){
        x=!x;
    }


    ball.style.top=y==true? balltop+4+"px":balltop-4+"px";
    ball.style.left=x==true? ballLeft+4+"px":ballLeft-4+"px";
    requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);

