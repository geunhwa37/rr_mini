// src/layouts/ProductLayout.tsx
import { Link, Outlet } from "react-router";

export default function ProductLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 헤더 */}
            <header className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">🛍️ Simple Product</h1>
                    <nav className="flex gap-2 sm:gap-4">
                        <Link
                            to="/product/list"
                            className="text-sm sm:text-base px-3 py-2 rounded-md hover:bg-gray-100"
                        >
                            📦 상품 목록
                        </Link>
                        <Link
                            to="/product/add"
                            className="text-sm sm:text-base px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                            ➕ 상품 추가
                        </Link>
                    </nav>
                </div>
            </header>

            {/* 본문 */}
            <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
                <Outlet />
            </main>

            {/* 푸터 (선택) */}
            <footer className="text-center text-xs text-gray-500 py-4">
                © 2025 Simple Product Inc.
            </footer>
        </div>
    );
}
