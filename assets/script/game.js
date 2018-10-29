cc.Class({
    extends: cc.Component,
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
      MaxStar:0,
      MinStar:0,
    },
    onLoad(){
      this.groundY=this.Ground.y+this.Ground.height/2;
      this.Timer=0;
      this.StarDuration=0;
      this.NewStar();
      this.Number=0;
    },
    start(){},
    update(dt){
      if(this.Timer>this.StarDuration){
        return;
        this.GameOver();
        return;
      }
      this.Timer+=dt;
    },
    GameOver:function(){
      this.Role.stopAllActions();
      cc.director.loadScene("game");
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
});
