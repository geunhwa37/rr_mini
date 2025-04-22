// 상품 조회 페이지 (ReadPage.tsx)
import React from 'react';
import ReadComponent from "~/components/todo/readComponent";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProduct} from "~/api/productAPI";

function ReadPage() {

    const { pno } = useParams<{ pno: string }>(); // useParams로 pno 값을 가져옴

    const pnoNumber = pno ? parseInt(pno, 10) : null;

    const { isFetching, data, error } = useQuery({
        queryKey: ["product", pnoNumber],  // queryKey에 pnoNumber 포함
        queryFn: () => getProduct(pnoNumber),
        enabled:  pnoNumber !== null,  // pno가 null일 때 fetch하지 않음
    });

    if (!data) {
        return <h1>상품을 찾을 수 없습니다.</h1>;
    }

    return (
        <div>
            <div className={'text-3xl bg-amber-600'}> {isFetching && <h1>Loading.........</h1>}</div>

            <div>Product Read Page</div>
            <ReadComponent data={data}></ReadComponent>
        </div>
    );
}

export default ReadPage;