var mapArray, ctx,currentImgMainx,currentImgMainy;
var imgMountain,imgMain,imgEnemy;
//mapArray:決定地圖中每個格子的元素
//ctx:HTML5 Canvas用
//currentImgMainx、currentImgMainy:決定主角的所在座標
//imgMountain、imgMain、imgEnemy:障礙物、主角、敵人的圖片物件

//一開始網頁元件載入之後要出做的事情
$(document).ready(function() { 
//遊戲地形設定
//0:可走、1:障礙、2:終點、3:敵人
   mapArray = [0,1,1,0,0,0,3,1,2];
   ctx = $("#myCanvas")[0].getContext("2d");

//擺上主角 - 使用預設位置
imgMain = new Image();
imgMain.src = "SimpleRPG/images/spriteSheet.png";
currentImgMainx = 0;
currentImgMainy = 0;
imgMain.onload = function()
{ 
 ctx.drawImage(imgMain,0,0,80,130,currentImgMainx,currentImgMainy,200,200);
};
    
//擺上障礙物與敵人
imgMountain = new Image(); //障礙物圖片物件
imgMountain.src = "SimpleRPG/images/material.png" ;
imgEnemy = new Image(); //敵人圖片物件
imgEnemy.src = "SimpleRPG/images/Enemy.png"
imgMountain.onload=function(){
    imgEnemy.onload=function(){
    for(var x in mapArray)
    {
        if(mapArray[x]==1) //擺上障礙物
        {
 ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);
    }else if(mapArray[x]==3) //擺上敵人
    {
    ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200);
    }
}
};};
    
});

//有人按按鍵後要處理的動作寫在這裡
$(document).keydown(function(event){
    var targetImgMainx,targetImgMainy,targetBlock,cutImagePositionx;
    //targetImgMainx、rargetImaMainy:主角即將要移過去的目標位置
    //targetBlock:主角即將要移動過去的那一格編號
    //cutImagePositionx:依據主角朝向什麼方向而決定的圖片
    event.preventDefault();
    //避免點擊鍵盤出現流覽器其他行為，如捲動、放大、換頁..計算出目標位置以及設定新的圖片
    //依據使用者點擊按鍵，
	//alert(event.which);
    switch(event.which){
        case 37://往左走
            targetImgMainx = currentImgMainx-200;
            targetImgMainy = currentImgMainy;
            cutImagePositionx = 175;
            break;
        case 38://往上走
            targetImgMainx = currentImgMainx;
            targetImgMainy = currentImgMainy-200;
            cutImagePositionx = 355;
            break
        case 39://往右走
            targetImgMainx = currentImgMainx+200;
            targetImgMainy = currentImgMainy;
            cutImagePositionx = 540;
            break
        case 40://往下走
            targetImgMainx = currentImgMainx;
            targetImgMainy = currentImgMainy+200;
            cutImagePositionx = 0;
            break
        default://當有人按了這四個按鍵以外的情況
            return;
	}
	
	if(targetImgMainx<=400 && targetImgMainx>=0 && targetImgMainy<=400 && targetImgMainy>=0)//沒有超出邊界
    {
		targetBlock=targetImgMainx/200+targetImgMainy/200*3;
	}else
	{
		targetBlock=-1; //-1代表異常，不移動
	}

    ctx.clearRect(currentImgMainx,currentImgMainy,200,200);//清除主角原本所在位置
     if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3)
	{
		//目標位置異常、遇到障礙物、遇到敵人都不能走，在原地(但稍後會依移動方向轉頭)
	}
    else
	{
		$("#talkbox").text("");
		currentImgMainx=targetImgMainx;
		currentImgMainy=targetImgMainy;
	}
        ctx.drawImage(imgMain,cutImagePositionx,0,80,130,currentImgMainx,currentImgMainy,200,200);
    

    switch(mapArray[targetBlock])
		{
			case undefined://牆壁
				$("#talkbox").text("邊界");
			break;
			case 1://障礙
				$("#talkbox").text("有山");
            break;
			case 2://終點
                $("#talkbox").text("達成任務！");
		    break;
			case 3://有人
				$("#talkbox").text("嗨~");
			break;
		}
});