import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors, Delete, UseGuards, SetMetadata } from "@nestjs/common";
import { diskStorage } from "multer";
import { CreateProductDto } from "src/Dto/Product/create-produt-dto";
import { ProductService } from "src/Services/product.servise";
import * as path from 'path';
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateProductDto } from "src/Dto/Product/update-productDto";

import { request } from "http";
import { AuthorizationGuard } from "src/Gurad/AuthorizationGuard";



@Controller('product')

export class ProductController {
    constructor(private readonly productServices: ProductService) { }

    @Post()
    @UseGuards(AuthorizationGuard)
    @SetMetadata('permission', ['get-user'])

    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                ;
                cb(null, `${file.originalname}`)
            }
        })
    }))
    async createProduct(@UploadedFile() file, @Body() createDto: CreateProductDto): Promise<any> {
        console.log("dd", createDto)
        return await this.productServices.createProduct(createDto, file)

    }
    @Patch(':id')

    async updateProduct(@Param('id') id: string, @Body() updateDto: UpdateProductDto): Promise<any> {

        return await this.productServices.updateProduct(id, updateDto)

    }


    @Get()

    @UseGuards(AuthorizationGuard)
    @SetMetadata('permission', 'get-product')

    async getAllProduct(@Req() g: any): Promise<any> {


        return await this.productServices.getAllProduct()

    }
    @Get(':id') @UseGuards(AuthorizationGuard)
    @SetMetadata('permission', 'get-product')

    async getProdutById(@Param('id') id: string): Promise<any> {
        return await this.productServices.getProductById(id)

    }

    @Get('category/:c_id')
    async getProdutByCategoryId(@Param('c_id') id: string): Promise<any> {
        return await this.productServices.getProductByCategoryId(id)

    }

    @Get(':from/:to')
    async getProdutByPriceRange(@Param('from') from: any, @Param('to') to: any): Promise<any> {
        return await this.productServices.getProducsByPriceRange(from, to)

    }


    @Delete(':id')
    @UseGuards(AuthorizationGuard)
    @SetMetadata('permission', 'delete-product')
    async deleteProduct(@Param('id') id: string): Promise<any> {

        return await this.productServices.deleteProduct(id)

    }




}