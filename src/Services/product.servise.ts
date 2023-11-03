import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isEmpty } from "class-validator";
import { CreateProductDto } from "src/Dto/Product/create-produt-dto";
import { UpdateProductDto } from "src/Dto/Product/update-productDto";
import { productEntity } from "src/Entities/product.entity";
import { IProductServise } from "src/Interfaces/productservisceInterface";
import { IMG_URL } from "src/const/common";
import { Repository } from "typeorm";

@Injectable()

export class ProductService implements IProductServise {

    constructor(
        @InjectRepository(productEntity)
        private productRepo: Repository<productEntity>

    ) { }
    async getProducsByPriceRange(from: any, to: any) {
        try {
            const product = this.productRepo.find();
            const filteredProduct = (await product).filter(item => item.price >= from && item.price <= to)
            return {
                msg: "succses",
                status: 200,
                data: filteredProduct
            }


        }
        catch (error) {
            return await new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }
    async getProductByCategoryId(id: string): Promise<object> {
        try {
            const product = await this.productRepo.find({ where: { categoryId: id } && { isDeleted: false } })

            return {
                msg: "succses",
                status: 200,
                product: product
            }

        }
        catch (error) {
            return await new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)
        }
    }
    async createProduct(createDto: CreateProductDto, file: any): Promise<object> {
        try {

            const imagePath = file.path.replace(/\\/g, '/')
            const product = await this.productRepo.create({
                price: createDto.price,
                description: createDto.description,
                categoryId: createDto.categoryId,
                image: `${IMG_URL}${imagePath}`,
                productName: createDto.productName,
                userId: createDto.userId,
                ratting: 0
            })

            const savedProduct = await this.productRepo.save(product);
            return {
                msg: "succsesfuly Created",
                status: 201,
                product: savedProduct
            }

        }
        catch (error) {
            return new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)

        }
    }
    async getAllProduct(): Promise<object> {
        try {

            const product = await this.productRepo.find()
            if (product) {
                return {
                    msg: "succses",
                    status: 200,
                    product: product
                }


            }
            return new HttpException("product NotFound", HttpStatus.NOT_FOUND)


        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }
    async updateProduct(id: string, updateDto: UpdateProductDto): Promise<any> {
        try {
            const productExist = await this.getProductById(id)
            if (productExist) {
                const product = await this.productRepo.update(id, {
                    ratting: updateDto.ratting,
                    productName: updateDto.productName,
                    price: updateDto.price,
                    description: updateDto.description,
                    categoryId: updateDto.categoryId,
                    userId: updateDto.userId

                })
                return {
                    msg: "succsesfuly updated",
                    status: 200,
                    product: productExist
                }

            }
            return new HttpException("Product NotFound", HttpStatus.NOT_FOUND)


        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }
    async getProductById(id: string): Promise<any> {
        try {
            const product = await this.productRepo.find({ where: { id: id, isDeleted: false } })
            if (product) {
                return {
                    msg: "succses",
                    status: 200,
                    product: product
                }

            }
            return new HttpException(" Product Not Found", HttpStatus.NOT_FOUND)



        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }

    async deleteProduct(id: string): Promise<any> {
        try {

            const producTobedeleted = await this.getProductById(id)

            if (producTobedeleted.length == 0) {
                return new HttpException("Product NotFound", HttpStatus.NOT_FOUND)


            }
            await this.productRepo.update(id, { isDeleted: true })
            return {
                message: "deleted Sucessfully",
                status: 200

            }

        }
        catch (error) {
            return new HttpException(error.message,
                HttpStatus.BAD_REQUEST)

        }
    }

}