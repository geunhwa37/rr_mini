import axios from "axios";
import type {ProductAddDTO, ProductModifyDTO, ProductReadDTO} from "~/types/product";

const host = "http://localhost:8080/api/v1/products";

//1. 목록
export async function getProducts(page:string, size:string){
    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)
    return res.data;
}
//2. 조회
export async function getProduct(pno:number | null): Promise<ProductReadDTO | null> {

    if (pno === null) {
        return null; // pno가 null이면 바로 null 리턴
    }

    const res = await axios.get(`${host}/read/${pno}`);
    return res.data;
}
//3. 등록
export async function addProduct(product: ProductAddDTO): Promise<number> {

    // 1. FormData 생성
    const formData = new FormData();

    // 2. 일반 데이터 추가
    formData.append("pname", product.pname);
    formData.append("price", String(product.price));
    formData.append("pdesc", product.pdesc);

    // 3. 파일 데이터 추가 (파일 배열 처리)
    product.files.forEach((file) => {
        formData.append("files", file);
    });

    // 4. FormData를 서버로 전송
    const res = await axios.post(`${host}/add`, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // multipart/form-data 헤더 설정
        },
    });
    return res.data;
}
//4. 수정
export async function modifyProduct(pno: number, product: ProductModifyDTO): Promise<void> {

    // 1. FormData 생성
    const formData = new FormData();
    formData.append("pname", product.pname);
    formData.append("price", String(product.price));
    formData.append("pdesc", product.pdesc);

    // 2. 파일 데이터 추가 (파일 배열 처리)
    if (product.files) {
        product.files.forEach((file) => {
            formData.append("files", file);
        });
    }

    // 3. FormData를 서버로 전송
    const res = await axios.post(`${host}/modify/${pno}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // multipart/form-data 헤더 설정
        },
    });
    return res.data;
}
//5. 삭제
export async function removeProduct(pno: number): Promise<void>{
    const res = await axios.post(`${host}/remove/${pno}`);
    return res.data;
}
