cc.Class({
    extends:cc.Component,
    properties: {
      Prefab:{
        default:null,
        type:cc.Prefab
      },
      Ground:{
        default:null,
        type:cc.Node
      },
      Role:{
        default:null,
        type:cc.Node
      },
      Score:{
        default:null,
        type:cc.Label
      },
      Audio:{
        default:null,
        type:cc.AudioClip
      },
      Role_Audio:{
        default:null,
        type:cc.AudioClip
      },
      Button:{
        default:null,
        type:cc.Node
      },
      MaxStar:0,
      MinStar:0,
      Height:0,
      Duration:0,
    },
    onLoad(){
      this.groundY=this.Ground.y+this.Ground.height/2;
      this.Timer=0;
      this.StarDuration=0;
      this.Number=0;
      this.Game_start=false;
      this.Over=true;
    },
    start(){},
    update(dt){
      if(this.Timer>this.StarDuration&&this.Game_start&&this.Over){
        this.Over=false;
        this.GameOver();
        return;
      }
      this.Timer+=dt;
    },
    GameStart:function(){
      this.Button.active=false;
      this.Action=this.Set();
      this.Role.runAction(this.Action);
      this.NewStar();
      this.Role.living.onMonitor();
      this.Game_start=true;
    },
    GameOver:function(){
      this.Role.living.onDestroy();
      this.Role.stopAllActions();
      this.vanish.destroy();
      // cc.director.loadScene("game");
    },
    GetScore:function(){
      this.Number+=1;
      this.Score.string=this.Number;
      cc.audioEngine.playEffect(this.Audio,false);
    },
    NewStar:function(){
      var newstar=cc.instantiate(this.Prefab);
      this.node.addChild(newstar);
      newstar.setPosition(this.GetNewPosition());
      newstar.getComponent("star").game=this;
      this.vanish=newstar.getComponent("star").node;
      this.StarDuration=this.MinStar+Math.random()*(this.MaxStar-this.MinStar);
      this.Timer=0;
    },
    GetNewPosition:function(){
      var randX=0;
      var randY=this.groundY+Math.random()*this.Role.getComponent("role").Height+25;
      var maxX=this.node.width/2;
      randX=(Math.random()-0.5)*2*maxX;
      return cc.v2(randX,randY);
    },
    Set(){
      var Up=cc.moveBy(this.Duration,cc.v2(0,this.Height)).easing(cc.easeCubicActionOut());
      var Down=cc.moveBy(this.Duration,cc.v2(0,-this.Height)).easing(cc.easeCubicActionIn());
      var callback=cc.callFunc(this.RoleSound,this);
      return cc.repeatForever(cc.sequence(Up,Down,callback));
    },
    RoleSound(){
      cc.audioEngine.playEffect(this.Role_Audio,false);
    }
});
