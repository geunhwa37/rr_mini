
import {Link, Navigate, useSearchParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getProducts} from "~/api/productAPI";
import React from "react";
import type {ProductListDTO} from "~/types/product";

interface ListComponentProps {
    data: any;
    pageStr: string,
    sizeStr: string
}

export default function ListComponent({data, pageStr, sizeStr}:ListComponentProps) {

    const totalPages = data?.total ?? 0; //data가 없으면 totalPages는 0, 있으면 data.total 값을 씀

   /* if(error){
        return (
            <Navigate to="/member/login" replace /> //에러 있을 시 로그인 화면으로 이동
        )
    }
*/
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">📦 상품 목록</h2>
            <div className="grid gap-4 sm:grid-cols-2">
                {data?.dtoList.map((prod: ProductListDTO) => (
                    <div
                        key={prod.pno}
                        className="p-4 border rounded-lg shadow-sm bg-white flex flex-col gap-2"
                    >
                        <Link
                            to={`/product/read/${prod.pno}`}
                            className="text-sm sm:text-base px-3 py-2 rounded-md bg-blue-100 text-black hover:bg-blue-400"
                        >

                            <h3 className="text-lg font-semibold">{prod.pname}</h3>
                        </Link>
                        <p className="text-sm text-gray-600">가격: {prod.price.toLocaleString()}원</p>
                        <Link
                            to={`/product/edit/${prod.pno}`}
                            className="mt-auto inline-block text-blue-600 hover:underline"
                        >
                            ✏️ 수정/삭제
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <Link
                    to="/product/add"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    ➕ 상품 추가하기
                </Link>

                {/* 페이지네이션 버튼 */}
                {data && (
                    <div className="flex justify-center gap-2 mt-6">
                        {/* 이전 버튼 */}
                        {data.prev && (
                            <Link
                                to={`/product/list?page=${data.start - 1}&size=${sizeStr}`}
                                className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                            >
                                ◀ 이전
                            </Link>
                        )}

                        {/* 숫자 페이지 버튼 */}
                        {Array.from({ length: data.end - data.start + 1 }, (_, i) => {
                            const pageNum = data.start + i;
                            return (
                                <Link
                                    key={pageNum}
                                    to={`/product/list?page=${pageNum}&size=${sizeStr}`}
                                    className={`px-3 py-1 border rounded ${
                                        pageNum === parseInt(pageStr)
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-700"
                                    }`}
                                >
                                    {pageNum}
                                </Link>
                            );
                        })}

                        {/* 다음 버튼 */}
                        {data.next && (
                            <Link
                                to={`/product/list?page=${data.end + 1}&size=${sizeStr}`}
                                className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                            >
                                다음 ▶
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}