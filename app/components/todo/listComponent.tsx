
import { Link } from "react-router";

export default function ListComponent() {
    const dummyProducts = [
        { id: 1, name: "상품 A", price: 10000 },
        { id: 2, name: "상품 B", price: 15000 },
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">📦 상품 목록</h2>
            <div className="grid gap-4 sm:grid-cols-2">
                {dummyProducts.map((prod) => (
                    <div
                        key={prod.id}
                        className="p-4 border rounded-lg shadow-sm bg-white flex flex-col gap-2"
                    >
                        <h3 className="text-lg font-semibold">{prod.name}</h3>
                        <p className="text-sm text-gray-600">가격: {prod.price.toLocaleString()}원</p>
                        <Link
                            to={`/product/edit/${prod.id}`}
                            className="mt-auto inline-block text-blue-600 hover:underline"
                        >
                            ✏️ 수정하기
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
            </div>
        </div>
    );
}