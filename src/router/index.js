import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('../pages' + file)
  }
}

export default new Router({
  routes: [
    route("/login",'/Login',"Login"),
    {
      path:"/",
      component: () => import('../pages/Layout'),  //异步加载
      redirect:"/login",
      children:[
        route("/chat/login","/Login","Login"),
        route("/chat/layout","/Layout","Layout"),
        route("/chat/c1","/C1","C1"),
        route("/chat/c2","/C2","C2"),
        route("/chat/c3","/C3","C3"),
        route("/chat/socket","/Socket","Socket"),
        route("/chat/video","/Video","Video"),
        route("/chat/sidebar","/Sidebar","Sidebar")
      ]
    }
  ]
})
