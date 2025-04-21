import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/product", "layout/productLayout.tsx", [
        route("list", 'routes/product/listPage.tsx'),
        route("add", 'routes/product/addPage.tsx'),
        route("edit", 'routes/product/editPage.tsx')
    ])


] satisfies RouteConfig;
