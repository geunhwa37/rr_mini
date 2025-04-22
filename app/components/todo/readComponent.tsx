import {Link, useParams, useSearchParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProduct, getProducts} from "~/api/productAPI";
import React from "react";

export default function ProductReadPage() {

    const { pno } = useParams<{ pno: string }>(); // useParams로 pno 값을 가져옴

    // pno가 존재하면 숫자로 변환, 없으면 null 처리
    const pnoNumber = pno ? parseInt(pno, 10) : null;

    // pno가 NaN이 아니면만 query 요청
    const { isFetching, data, error } = useQuery({
        queryKey: ["product", pnoNumber],  // queryKey에 pnoNumber 포함
        queryFn: () => getProduct(pnoNumber),
        enabled:  pnoNumber !== null,  // pno가 null일 때 fetch하지 않음
    });

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md mt-6">

            <div className={'text-3xl bg-amber-600'}> {isFetching && <h1>Loading.........</h1>}</div>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">📦 상품 상세</h2>

            {/* 이미지 */}
            <div className="w-full mb-6">
                <img
                    alt={data?.pname}
                    className="w-full rounded-lg object-cover max-h-80"
                />
            </div>

            <div className="space-y-4">
                <div>
                    <span className="block text-sm text-gray-500">상품명</span>
                    <p className="text-lg font-semibold">{data?.pname}</p>
                </div>

                <div>
                    <span className="block text-sm text-gray-500">가격</span>
                    <p className="text-lg font-medium text-blue-600">{data?.price}원</p>
                </div>

                <div>
                    <span className="block text-sm text-gray-500">설명</span>
                    <p className="text-base text-gray-700 whitespace-pre-wrap">{data?.pdesc}</p>
                </div>

                <div>
                    <span className="block text-sm text-gray-500">등록일</span>
                    <p className="text-base text-gray-600">{data?.regDate && new Date(data.regDate).toLocaleDateString('ko-KR')}</p>
                </div>

                <div>
                    <span className="block text-sm text-gray-500">수정일</span>
                    <p className="text-base text-gray-600">{data?.modDate && new Date(data.regDate).toLocaleDateString('ko-KR')}</p>
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={() => history.back()}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
                >
                    ◀ 목록으로
                </button>
                <Link
                    to={`/product/edit/${data?.pno}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                >
                    ✏️ 수정하기
                </Link>
            </div>
        </div>
    );
}
