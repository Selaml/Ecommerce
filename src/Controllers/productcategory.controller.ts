import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateProductCategoryDto } from "src/Dto/productcategory/productcategorycreate-dto";
import { ProductCategoryServise } from "src/Services/productcategory.servise";


@Controller('category')
export class ProductCategoryContriller {
    constructor(private categoryService: ProductCategoryServise) { }
    @Post()
    async createcategory(@Body() createDto: CreateProductCategoryDto): Promise<any> {
        return await this.categoryService.createProductCategory(createDto)
    }
    @Get()
    async getAllCategories(): Promise<any> {
        return await this.categoryService.getAllProductCategory()
    }
    @Get(':id')
    async getCategoriesById(@Param('id') id: string): Promise<any> {
        return await this.categoryService.getProductCategoryById(id)
    }
    @Patch(':id')
    async updateategories(@Param('id') id: string, @Body() createDto: CreateProductCategoryDto): Promise<any> {
        return await this.categoryService.updateProductCategory(id, createDto)
    }
}
