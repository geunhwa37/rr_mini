
import { useParams, useNavigate } from "react-router";
import { useRef } from "react";
import type { FormEvent } from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getProduct, modifyProduct} from "~/api/productAPI";
import type {ProductModifyDTO} from "~/types/product";

interface EditComponentProps {
    data: any;
    pnoNumber: number | null;
}

export default function EditComponent({data, pnoNumber}: EditComponentProps) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();

    if (pnoNumber === null) {
        return <div>상품 정보를 불러올 수 없습니다.</div>;
    }

    // useMutation을 사용하여 상품 수정 요청 보내기
    const mutation = useMutation({
        mutationFn: (product: ProductModifyDTO) => modifyProduct(pnoNumber ?? 0, product),
        onSuccess: () => {
            // 수정 성공 후 목록 페이지로 이동
            navigate("/product/list");
        },
        onError: (error) => {
            console.error("상품 수정 실패", error);
        }
    });

    // 상품 수정 폼을 제출할 때 호출되는 함수
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = formRef.current; //formRef로 참조한 폼 엘리먼트 가져오기
        if (!form) return;
        const formData = new FormData(form); //폼의 데이터를 FormData 객체로 변환

        const pname = formData.get("pname") as string;
        const price = parseInt(formData.get("price") as string);
        const pdesc = formData.get("pdesc") as string;
        const imageNamesStr = formData.get("imageNames") as string;
        const imageNames = imageNamesStr
            .split(',')
            .map(str => str.trim()) // 공백 제거
            .filter(str => str.length > 0); // 빈 문자열 제거

        const product: ProductModifyDTO = {
            pno: pnoNumber,
            pname,
            price,
            pdesc,
            imageNames
        };

        // 수정 요청 실행
        mutation.mutate(product);
    };

    return (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow rounded-xl">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">상품 수정</h2>
                <div>
                    <label htmlFor="pname" className="block text-sm font-medium text-gray-600 mb-1">
                        상품명
                    </label>
                    <input
                        name="pname"
                        id="pname"
                        type="text"
                        defaultValue={data?.pname}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-600 mb-1">
                        가격
                    </label>
                    <input
                        name="price"
                        id="price"
                        type="number"
                        defaultValue={data?.price}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="pdesc" className="block text-sm font-medium text-gray-600 mb-1">
                        설명
                    </label>
                    <input
                        name="pdesc"
                        id="price"
                        type="text"
                        defaultValue={data?.pdesc}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="imageNames" className="block text-sm font-medium text-gray-600 mb-1">
                        사진
                    </label>
                    <input
                        name="imageNames"
                        id="imageNames"
                        type="text"
                        defaultValue={data?.imageNames?.join(",") ?? ""}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    수정 완료
                </button>
            </form>
        </div>
    );
}
