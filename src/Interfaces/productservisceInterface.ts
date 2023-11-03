import { CreateProductDto } from "src/Dto/Product/create-produt-dto"
import { UpdateProductDto } from "src/Dto/Product/update-productDto"




export interface IProductServise {
    createProduct(createDto: CreateProductDto, file: any): Promise<any>
    getAllProduct(): Promise<any>
    updateProduct(id: string, updateDto: UpdateProductDto): Promise<any>
    getProductById(id: string): Promise<any>
    getProductByCategoryId(id: string): Promise<any>
    getProducsByPriceRange(from: any, to: any)
    deleteProduct(id: string): Promise<any>
}