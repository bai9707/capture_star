cc.Class({
    extends: cc.Component,
    properties:{
      Audio:{
        default:null,
        type:cc.AudioClip
      },
      Height:0,
      Duration:0,
      Speed:0,
      Accel:0
    },
    onLoad(){
      this.Action=this.set();
      this.node.runAction(this.Action);
      this.accLeft=false;
      this.accRight=false;
      this.xSpeed=0;
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onDown,this);
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onUp,this);
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
    },
    onDestroy(){
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onDown,this);
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onUp,this);
    },
    onDown(e){
      switch(e.keyCode){
        case cc.macro.KEY.a:
          this.accLeft=true;
        break;
        case cc.macro.KEY.d:
          this.accRight=true;
        break;
      }
    },
    onUp(e){
      switch(e.keyCode){
        case cc.macro.KEY.a:
          this.accLeft=false;
        break;
        case cc.macro.KEY.d:
          this.accRight=false;
        break;
      }
    },
    set(){
      var Up=cc.moveBy(this.Duration,cc.v2(0,this.Height)).easing(cc.easeCubicActionOut());
      var Down=cc.moveBy(this.Duration,cc.v2(0,-this.Height)).easing(cc.easeCubicActionIn());
      var callback=cc.callFunc(this.RoleSound,this);
      return cc.repeatForever(cc.sequence(Up,Down,callback));
    },
    RoleSound(){
      cc.audioEngine.playEffect(this.Audio,false);
    }
});
