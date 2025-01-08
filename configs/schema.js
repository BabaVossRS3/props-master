import { pgTable, serial, varchar, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

// ProductListing Table
export const ProductListing = pgTable('ProductListing', {
    id: serial('id').primaryKey(),
    listingTitle: varchar('listingTitle').notNull(),
    typeoflist: varchar('typeoflist').notNull(),
    sellingPrice: varchar('sellingPrice').notNull(),
    negotiable: varchar('negotiable').notNull(),
    category: varchar('category').notNull(),
    condition: varchar('condition'),
    year: varchar('year'),
    brand: varchar('brand'),
    material: varchar('material').notNull(),
    color: varchar('color').notNull(),
    listingdescription: varchar('listingdescription'),
    ownerName: varchar('ownerName').notNull(),
    ownerTel: varchar('ownerTel').notNull(),
    addressPosted: varchar('addressPosted').notNull(),
    createdBy: varchar('createdBy').notNull().default('example@example.com'),
    postedOn: varchar('postedOn'),
    userImageUrl: varchar('userImageUrl'),
    userPlan: varchar('userPlan'),
    clerkUserId: varchar('userIdClerk').references(() => UserPlan.userId), // Foreign key to UserPlan.userId
});

// ProductImages Table
export const ProductImages = pgTable('productImages', {
    id: serial('id').primaryKey(),
    imageUrl: varchar('imageUrl').notNull(),
    ProductListingId: integer('productListingId').notNull().references(() => ProductListing.id)
});

// UserPlan Table
export const UserPlan = pgTable('UserPlan', {
    id: serial('id').primaryKey(),
    userId: varchar('userId').notNull(),
    plan: varchar('plan').notNull(),
    startDate: timestamp('startDate').notNull().defaultNow(),
    endDate: timestamp('endDate'),
    isActive: boolean('isActive').notNull().default(true)
});
