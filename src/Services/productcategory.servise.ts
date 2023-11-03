import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductCategoryDto } from "src/Dto/productcategory/productcategorycreate-dto";
import { categoryEntity } from "src/Entities/category.entity";
import { IProductCategoryServiceInterface } from "src/Interfaces/productCategotyserviseInterface";
import { Repository } from "typeorm";


@Injectable()
export class ProductCategoryServise implements IProductCategoryServiceInterface {
    constructor(@InjectRepository(categoryEntity) private ctagoryRepo: Repository<categoryEntity>) { }
    async createProductCategory(createDto: CreateProductCategoryDto): Promise<any> {
        try {
            const category = await this.ctagoryRepo.create(createDto);
            return await this.ctagoryRepo.save(category);

        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    async getAllProductCategory(): Promise<any> {
        try {
            const category = await this.ctagoryRepo.find();
            return category


        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }
    async updateProductCategory(id: string, createDto: CreateProductCategoryDto): Promise<any> {
        try {
            const category = await this.ctagoryRepo.update(id, createDto);
            return category;


        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }
    async getProductCategoryById(id: string): Promise<any> {
        try {
            const category = await this.ctagoryRepo.findOne({ where: { id: id } });
            return category;


        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }

}