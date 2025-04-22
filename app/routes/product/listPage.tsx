// 상품 목록 페이지 (ListPage.tsx)
import React from 'react';
import ListComponent from "~/components/todo/listComponent";
import {useSearchParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProducts} from "~/api/productAPI";

function ListPage() {

    const [searchParams] = useSearchParams();

    const pageStr = searchParams.get("page") || "1"
    const sizeStr = searchParams.get("size") || "10"

    const {isFetching, data, error} = useQuery({
        queryKey: ["products", pageStr, sizeStr],
        queryFn: () => getProducts(pageStr, sizeStr),
    });
    console.log(data)

    return (
        <div>
            <div className={'text-3xl bg-amber-600'}> {isFetching && <h1>Loading.........</h1>}</div>

            <div>Product List Page</div>
            <ListComponent data={data} pageStr={pageStr} sizeStr={sizeStr}/>
        </div>
    );
}

export default ListPage;