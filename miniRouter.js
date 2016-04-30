/**
 * Created by 明多牧 on 2016/4/29.
 */
(function () {
    window['miniRouter']=mRouter;

    function mRouter() {
        var allRouter=[];
        
        this.add=function (target) {
          if(typeof target==='object'){
              if(typeof target.route==='string'&&typeof target.action==='function'){
                  allRouter.forEach(function (e) {
                      if(e.route===target.route){
                          console.log('miniRouter - Add failed because of same route');
                          return false;
                      }
                  });
                  allRouter.push(target);
                  return this;
              }else {
                  console.log('miniRouter - Add failed because of wrong add object name');
                  return false;
              }
          }else {
              console.log('miniRouter - Add failed because of wrong ');
              return false;
          }
        };

        this.delete=function (targetRoute) {
            allRouter.forEach(function (e) {
                if(e.route===targetRoute){
                    e.route=null;
                    e.action=null;
                }
            });
            return this;
        };
        
        this.start=function () {

            var route=window.location.toString().split('#')[1];
            allRouter.forEach(function (e) {
                if(e.route==route){
                    e.action();
                }
            });

            window.onhashchange=function (change) {
                var route=change.newURL.split('#')[1];
                allRouter.forEach(function (e) {
                    if(e.route==route){
                        e.action();
                    }
                })

            }

        }
    }
})();