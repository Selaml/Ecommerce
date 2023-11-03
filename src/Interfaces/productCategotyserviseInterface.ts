import { CreateProductCategoryDto } from "src/Dto/productcategory/productcategorycreate-dto";




export interface IProductCategoryServiceInterface {
    createProductCategory(createDto: CreateProductCategoryDto): Promise<any>
    getAllProductCategory(): Promise<any>
    updateProductCategory(id: string, createDto: CreateProductCategoryDto): Promise<any>
    getProductCategoryById(id: string): Promise<any>

}