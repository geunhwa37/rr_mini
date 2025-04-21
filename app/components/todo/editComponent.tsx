
import { useParams, useNavigate } from "react-router";
import { useRef } from "react";
import type { FormEvent } from "react";

export default function EditComponent() {
    const { id } = useParams();
    const formRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form) return;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const price = parseInt(formData.get("price") as string);
        console.log("상품 수정:", { id, name, price });
        navigate("/products/list");
    };

    return (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow rounded-xl">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">상품 수정</h2>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                        상품명
                    </label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        defaultValue={`기존 상품 ${id}`}
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
                        defaultValue={10000}
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
