CREATE TABLE IF NOT EXISTS "productImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"imageUrl" varchar NOT NULL,
	"productListingId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProductListing" (
	"id" serial PRIMARY KEY NOT NULL,
	"listingTitle" varchar NOT NULL,
	"typeoflist" varchar NOT NULL,
	"sellingPrice" varchar NOT NULL,
	"negotiable" varchar NOT NULL,
	"category" varchar NOT NULL,
	"condition" varchar,
	"year" varchar,
	"brand" varchar,
	"material" varchar NOT NULL,
	"color" varchar NOT NULL,
	"listingdescription" varchar,
	"ownerName" varchar NOT NULL,
	"ownerTel" varchar NOT NULL,
	"addressPosted" varchar NOT NULL,
	"createdBy" varchar DEFAULT 'example@example.com' NOT NULL,
	"postedOn" varchar,
	"userImageUrl" varchar,
	"userPlan" varchar,
	"userIdClerk" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"status" varchar(20) DEFAULT 'inactive' NOT NULL,
	"plan_type" varchar(20) NOT NULL,
	"stripe_subscription_id" varchar(100),
	"stripe_price_id" varchar(100),
	"stripe_current_period_start" timestamp,
	"stripe_current_period_end" timestamp,
	"cancel_at_period_end" boolean DEFAULT false,
	"canceled_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserPlan" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"plan" varchar NOT NULL,
	"startDate" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"endDate" timestamp(6) with time zone,
	"isActive" boolean DEFAULT true NOT NULL,
	CONSTRAINT "UserPlan_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productImages" ADD CONSTRAINT "productImages_productListingId_ProductListing_id_fk" FOREIGN KEY ("productListingId") REFERENCES "public"."ProductListing"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProductListing" ADD CONSTRAINT "ProductListing_userIdClerk_UserPlan_userId_fk" FOREIGN KEY ("userIdClerk") REFERENCES "public"."UserPlan"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
