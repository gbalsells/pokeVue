const routes = [
  {
    name: "pokemonList",
    path: "/",
    component: () => import("./pages/PokemonList.vue"),
  },
  {
    name: "pokemon",
    path: "/pokemon/:id",
    component: () => import("./pages/Pokemon.vue"),
  },
  {
    name: "itemList",
    path: "/items",
    component: () => import("./pages/ItemList.vue"),
  },
  {
    name: "item",
    path: "/item/:id",
    component: () => import("./pages/Item.vue"),
  },
  {
    name: "locationList",
    path: "/locations",
    component: () => import("./pages/LocationList.vue"),
  },
  {
    name: "location",
    path: "/location/:id",
    component: () => import("./pages/Location.vue"),
  },
];

export default routes;
