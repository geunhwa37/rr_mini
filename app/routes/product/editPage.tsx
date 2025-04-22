// 상품 수정 페이지 (EditPage.tsx)
import React from 'react';
import EditComponent from "~/components/todo/editComponent";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProduct} from "~/api/productAPI";

function EditPage() {

    //ReactQuery로 데이터연결
    const { pno } = useParams<{ pno: string }>(); // useParams로 pno 값을 가져옴

    const pnoNumber = pno ? parseInt(pno, 10) : null;

    const { isFetching, data, error } = useQuery({
        queryKey: ["product", pnoNumber],  // queryKey에 pnoNumber 포함
        queryFn: () => getProduct(pnoNumber),
        enabled:  pnoNumber !== null,  // pno가 null일 때 fetch하지 않음
    });

    return (
        <div>
            <div>Product Edit Page</div>
            <EditComponent data={data} pnoNumber={pnoNumber}></EditComponent>
        </div>
    );
}

export default EditPage;