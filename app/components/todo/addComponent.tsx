
import { useRef } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import {useMutation} from "@tanstack/react-query";
import {addProduct} from "~/api/productAPI";
import type {ProductAddDTO, ProductModifyDTO} from "~/types/product";

export default function AddComponent() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();

    //상품 추가
    const AddMutation = useMutation({
        mutationFn: (product: ProductAddDTO) => addProduct(product),
        onSuccess: () => {
            navigate("/product/list"); // 삭제 후 목록 페이지로 이동
        },
        onError: (error) => {
            console.error("상품 추가 실패", error);
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = formRef.current;
        if (!form) return;

        const formData = new FormData(form);

        const pname = formData.get("pname") as string;
        const price = parseInt(formData.get("price") as string);
        const pdesc = formData.get("pdesc") as string;
        const files = formData.getAll("files") as File[];


        const product: ProductAddDTO = {pname, pdesc, price, files}

        // 추가 요청 실행
        AddMutation.mutate(product)
    };
    

    return (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow rounded-xl">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">상품 추가</h2>
                <div>
                    <label htmlFor="pname" className="block text-sm font-medium text-gray-600 mb-1">
                        상품명
                    </label>
                    <input
                        name="pname"
                        id="pname"
                        type="text"
                        required
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
                        required
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="pdesc" className="block text-sm font-medium text-gray-600 mb-1">
                        설명
                    </label>
                    <input
                        name="pdesc"
                        id="pdesc"
                        type="text"
                        required
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="files" className="block text-sm font-medium text-gray-600 mb-1">
                        이미지
                    </label>
                    <input
                        name="files"
                        id="files"
                        type="file"
                        multiple // 여러 파일 선택 가능
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    등록
                </button>
            </form>
        </div>
    );
}
