export default ({ app: { router, store } }) => {
    // Every time the route changes (fired on initialization too)
    router.afterEach((to, from) => {
        if (to.name == "index") {
            store.commit("setHomeLayout", true);
            console.log("Going to home page!");
        } else {
            store.commit("setHomeLayout", false);
            console.log("Not Home Page!")
        }
    })
 }