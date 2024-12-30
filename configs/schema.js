// columns and items for the database!

import { integer, pgTable } from "drizzle-orm/pg-core";
import { serial, varchar } from "drizzle-orm/pg-core";

export const ProductListing = pgTable('ProductListing',{
    id:serial('id').primaryKey(),
    listingTitle:varchar('listingTitle').notNull(),
    typeoflist:varchar('typeoflist').notNull(),
    sellingPrice:varchar('sellingPrice').notNull(),
    negotiable:varchar('negotiable').notNull(),
    category:varchar('category').notNull(),
    condition:varchar('condition'),
    year:varchar('year'),
    brand:varchar('brand'),
    material:varchar('material').notNull(),
    color:varchar('color').notNull(),
    listingdescription:varchar('listingdescription').notNull(),
    ownerName:varchar('ownerName').notNull(),
    ownerTel:varchar('ownerTel').notNull(),
    addressPosted:varchar('addressPosted').notNull(),
    createdBy: varchar('createdBy').notNull().default('example@example.com'),
    postedOn:varchar('postedOn'),
    userImageUrl:varchar('userImageUrl')
})

export const ProductImages=pgTable('productImages',{
    id:serial('id').primaryKey(),
    imageUrl:varchar('imageUrl').notNull(),
    ProductListingId:integer('productListingId').notNull().references(()=>ProductListing.id)
})