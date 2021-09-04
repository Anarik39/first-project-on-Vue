import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "PageIndex" */ "../pages/PageIndex"),
      name: "Index",
    },
    {
      path: "/calculator",
      component: () =>
        import(
          /* webpackChunkName: "PageCalculator" */ "../pages/PageCalculator"
        ),
      name: "Calculator",
    },
    {
      path: "/add/payment/:category",
      component: () =>
        import(/* webpackChunkName: "PageIndex" */ "../pages/PageIndex"),
      name: "AddPaymentFormUrl",
    },
    {
      path: "/404",
      component: () =>
        import(/* webpackChunkName: "Page404" */ "../pages/Page404"),
      name: "404",
    },
    {
      path: "*",
      component: () =>
        import(/* webpackChunkName: "Page404" */ "../pages/Page404"),
      name: "error",
    },
  ],
});

const getTitleByRouteName = (routeName) => {
  return {
    Index: "Page index",
    Calculator: "Page Calculator",
    error: "Not Found",
    "404": "Not Found",
    AddPaymentFormUrl: "Index",
  }[routeName];
};

router.afterEach((to) => {
  document.title = getTitleByRouteName(to.name);
});

export default router;
