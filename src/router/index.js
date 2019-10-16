import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Upload from '@/components/UploadPage'
import AddPhotos from '@/components/AddPhotos'
import NewProject from '@/components/NewProject'
import PhotoList from '@/components/PhotoList'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/panda",
      name: "Home",
      component: Home
    },
    {
      path: "/panda/login",
      name: "Login",
      component: Login
    },
    {
      path: "/panda/upload",
      name: "Upload",
      component: Upload
    },
    {
      path: "/panda/add",
      name: "Add",
      component: AddPhotos
    },
    {
      path: "/panda/editPhoto/:id",
      name: "Edit",
      component: AddPhotos
    },
    {
      path: "/panda/photoList",
      name: "PhotoList",
      component: PhotoList
    },
    {
      path: "/panda/newProject",
      name: "NewProject",
      component: NewProject,
    }
  ]
});
