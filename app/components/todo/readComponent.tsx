import {Link} from "react-router";

export default function ProductReadPage() {
    const product = {
        id: 1,
        name: "샘플 상품",
        price: 19900,
        description: "이 상품은 React + Tailwind 연습용 샘플 상품입니다.\n모바일에서도 잘 보이게 만들어졌습니다.",
        imageUrl: "https://via.placeholder.com/400x300.png?text=Sample+Product",
        createdAt: "2024-04-21T12:00:00Z"
    };

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">📦 상품 상세</h2>

            {/* 이미지 */}
            <div className="w-full mb-6">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full rounded-lg object-cover max-h-80"
                />
            </div>

            <div className="space-y-4">
                <div>
                    <span className="block text-sm text-gray-500">상품명</span>
                    <p className="text-lg font-semibold">{product.name}</p>
                </div>

                <div>
                    <span className="block text-sm text-gray-500">가격</span>
                    <p className="text-lg font-medium text-blue-600">{product.price.toLocaleString()}원</p>
                </div>

                <div>
                    <span className="block text-sm text-gray-500">설명</span>
                    <p className="text-base text-gray-700 whitespace-pre-wrap">{product.description}</p>
                </div>

                <div>
                    <span className="block text-sm text-gray-500">등록일</span>
                    <p className="text-base text-gray-600">{new Date(product.createdAt).toLocaleDateString()}</p>
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
                    to={`/product/edit/${product.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                >
                    ✏️ 수정하기
                </Link>
            </div>
        </div>
    );
}
