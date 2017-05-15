import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/Layout.vue'
import Index from '@/view/Index'
import Introduce from '@/view/Introduce'
import Company from '@/view/Company'
import CompanyDetails from '@/view/CompanyDetails'
import TerraceDetails from '@/view/TerraceDetails'
import PolicyHall from '@/view/PolicyHall'
import NewPolicy from '@/view/NewPolicyD'
import Special from '@/view/SpecialD'
import Activity from '@/view/Activity'
import ActivityD from '@/view/ActivityD'
import Notice from '@/view/Notice'
import NoticePost from '@/view/NoticePost'
import NoticeEdit from '@/view/NoticeEdit'
import NoticeD from '@/view/NoticeD'
import Login from '@/view/Login'
import EditUser from '@/view/EditUser'
import ServeCenter from '@/view/ServeCenter'
import Version from '@/view/Version'
import ActivityEnroll from '@/view/ActivityEnroll'
import SpecialEnroll from '@/view/SpecialEnroll'
import EnterpriseDemand from '@/view/EnterpriseDemand'
import Supply from '@/view/Supply'
import EnterpriseServices from '@/view/EnterpriseServices'
import PropertyServices from '@/view/PropertyServices'
import ServiceList from '@/view/ServiceList'
import ServiceD from '@/view/ServiceD'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      // name: 'layout',
      component: Layout,
      children: [
        { path: '/', redirect: '/index' },
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/introduce',
          name: 'introduce',
          component: Introduce
        },
        {
          path: '/company',
          name: 'company',
          component: Company
        }

      ]
    },
    {
      path: '/cdetails/:id',
      name: 'companydetails',
      component: CompanyDetails
    },
    {
      path: '/tdetails/:id',
      name: 'terraceDetails',
      component: TerraceDetails
    },
    {
      path: '/policyhall',
      name: 'policyHall',
      component: PolicyHall
    }
    ,
    {
      path: '/newpolicy/:id',
      name: 'newPolicy',
      component: NewPolicy
    },

    {
      path: '/special/:id',
      name: 'special',
      component: Special
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    {
      path: '/activity/:id',
      name: 'activityD',
      component: ActivityD
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },

    {
      path: '/notice/:id',
      name: 'noticeD',
      component: NoticeD
    },
    {
      path: '/noticepost',

      name: 'noticepost',
      component:NoticePost
    },

    {
      path: '/eoticeedit/:id',

      name: 'eoticeedit',
      component:NoticeEdit
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/edituser',
      name: 'edituser',
      component: EditUser
    },
    {
      path: '/servecenter',
      name: 'servecenter',
      component: ServeCenter
    },
    {
      path: '/version',
      name: 'version',
      component: Version
    },
    {
      path: '/activityenroll/:id',
      name: 'activityenroll',
      component: ActivityEnroll
    },
    {
      path: '/specialenroll/:id',
      name: 'specialenroll',
      component: SpecialEnroll
    },
    {
      path: '/enterprisedemand',
      name: 'enterprisedemand',
      component: EnterpriseDemand
    },
    {
      path: '/supply',
      name: 'supply',
      component: Supply
    },
    {
      path: '/enterpriseservices',
      name: 'enterpriseservices',
      component: EnterpriseServices
    },
    {
      path: '/servicelist/:id',
      name: 'servicelist',
      component: ServiceList
    },
    {
      path: '/serviced/:id',
      name: 'serviced',
      component: ServiceD
    },
    {
      path: '/propertyservices',
      name: 'propertyservices',
      component: PropertyServices
    }




  ]
})
