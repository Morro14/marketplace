CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`basket_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	CONSTRAINT `fk_favorites_basket_id_baskets_id_fk` FOREIGN KEY (`basket_id`) REFERENCES `baskets`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_favorites_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorites_basket_product_unique` ON `favorites` (`basket_id`,`product_id`);