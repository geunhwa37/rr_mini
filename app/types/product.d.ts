
export interface ProductListDTO {
    pno: number;
    pname: string;
    price: number;
    seller: string;
    fileName: stirng;
    avgRating: number;
    reviewCnt: number;
}

export interface ProductReadDTO {
    pno: number;
    pname: string;
    price: number;
    pdesc: string;
    files: string[];
    regDate: Date;
    modDate: Date;
}

export interface ProductAddDTO {
    pname: string;
    pdesc: string;
    price: number;
    files: File[];
}

export interface ProductModifyDTO {
    pno: number;
    pname: string;
    pdesc: string;
    price: number;
    files: File[];
}