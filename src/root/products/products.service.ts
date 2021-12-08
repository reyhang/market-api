import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addProductDto } from './dto/addProductDto.dto';
import { ProductsEntity } from './products.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsRepository,"market")
        private productsRepository:ProductsRepository
    ){}


    async getAll(){
        
        const query = await this.productsRepository.find({
            select:["id","title","price","barcode"]
        })
        return query;
    }


    async getProduct(id:number){

        const query = await this.productsRepository.findOne({
            select:[
                "id",
                "title",
                "price",
                "barcode"
            ],
            where:{id}
        })

        return query;
    }

    async getProductByBarcode(barcode:string){
        const query = await this.productsRepository.findOne({
            where:{barcode:barcode}
        })
        
        return query
    }

    async addProduct(data:ProductsEntity){
        const checkProduct = await this.productsRepository.findOne(
            {where:{barcode:data.barcode,title:data.title}})

        if(checkProduct?.id){
            throw new InternalServerErrorException(`${data.title} ürünü daha önceden eklendi, Tekrar ekleyemezsiniz.`)
        }

        return await this.productsRepository.insert(data)

    }

    async updateProduct(data:addProductDto,id:number){
        const query = new ProductsEntity()
        query.barcode=query.barcode;
        query.price=query.price;
        query.title=query.title;

    return await this.productsRepository.update({id},data)
    
    }

    async deleteProduct(id:number){
        return this.productsRepository.delete(id)
    }



}
