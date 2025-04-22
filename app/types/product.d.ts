
export interface ProductListDTO {
    pno: number;
    pname: string;
    price: number;
    seller: string;
    imgName: string;
    avgRating: number;
    reviewCnt: number;
}

export interface ProductReadDTO {
    pno: number;
    pname: string;
    price: number;
    pdesc: string;
    imageNames: string[];
}

export interface ProductAddDTO {
    pname: string;
    pdesc: string;
    price: number;
    imageNames: string[];
}

export interface ProductModifyDTO {
    pno: number;
    pname: string;
    pdesc: string;
    price: number;
    imageNames: string[];
}