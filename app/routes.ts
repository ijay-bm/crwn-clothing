import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/shop", "./routes/shop.tsx"),

  layout("./layouts/public-only.tsx", [
    route("/sign-in", "./routes/sign-in.tsx"),
    route("/sign-up", "./routes/sign-up.tsx"),
  ]),

  route("/checkout", "./routes/checkout.tsx"),
] satisfies RouteConfig;
