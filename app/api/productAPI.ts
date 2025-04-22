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
    const res = await axios.post(`${host}/add`, product);
    return res.data;
}
//4. 수정
export async function modifyProduct(pno: number, product: ProductModifyDTO): Promise<void> {
    const res = await axios.post(`${host}/modify/${pno}`, product);
    return res.data;
}
//5. 삭제
export async function removeProduct(pno: number): Promise<void>{
    const res = await axios.post(`${host}/remove/${pno}`);
    return res.data;
}
