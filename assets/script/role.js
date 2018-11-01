cc.Class({
    extends: cc.Component,
    properties:{
      Role:{
        default:null,
        type:cc.Node
      },
      Speed:0,
      Accel:0,
      direction_l:"",
      direction_r:"",
    },
    onLoad(){
      this.accLeft=false;
      this.accRight=false;
      this.xSpeed=0;
      this.Role.living=this;
    },
    start(){},
    update(dt){
      if(this.accLeft){
        this.xSpeed-=this.Accel*dt;
      }else if(this.accRight){
        this.xSpeed+=this.Accel*dt;
      }
      if(Math.abs(this.xSpeed)>this.maxMoveSpeed){
        this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed);
      }
      this.node.x+=this.xSpeed*dt;
      this.node.x=this.node.x>480?this.node.x=-480:
      this.node.x<-480?this.node.x=480:this.node.x;
    },
    onMonitor(){
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onDown,this);
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onUp,this);
    },
    onDestroy(){
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onDown,this);
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onUp,this);
      this.accLeft=false;
      this.accRight=false;
      this.xSpeed=0;
    },
    onDown(e){
      switch(e.keyCode){
        case cc.macro.KEY[this.direction_l]:
          this.accLeft=true;
        break;
        case cc.macro.KEY[this.direction_r]:
          this.accRight=true;
        break;
      }
    },
    onUp(e){
      switch(e.keyCode){
        case cc.macro.KEY[this.direction_l]:
          this.accLeft=false;
        break;
        case cc.macro.KEY[this.direction_r]:
          this.accRight=false;
        break;
      }
    },
});