cc.Class({
    extends:cc.Component,
    properties:{
      Radius:0,
    },
    onLoad(){},
    start(){},
    update(dt){
      if(this.GetRole()<this.Radius){
        this.Picked();
        return;
      }
      var Opacity=1-this.game.Timer/this.game.StarDuration;
      var MinOpacity=40;
      this.node.opacity=MinOpacity+Math.floor(Opacity*(255-MinOpacity));
    },
    GetRole:function(){
      var RolePos=this.game.Role.getPosition();
      var dist=this.node.position.sub(RolePos).mag();
      return dist;
    },
    Picked:function(){
      this.game.NewStar();
      this.game.GetScore();
      this.node.destroy();
    },
});
