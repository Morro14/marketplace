CREATE TABLE `delivery_addresses` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`delivery_info_id` integer NOT NULL,
	`apartment` text,
	`building` text NOT NULL,
	`street` text NOT NULL,
	`town` text NOT NULL,
	`province` text NOT NULL,
	`state` text NOT NULL,
	CONSTRAINT `fk_delivery_addresses_delivery_info_id_delivery_info_id_fk` FOREIGN KEY (`delivery_info_id`) REFERENCES `delivery_info`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `delivery_info` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`basket_id` integer NOT NULL,
	`full_name` text NOT NULL,
	`phone` text,
	`email` text NOT NULL,
	CONSTRAINT `fk_delivery_info_basket_id_baskets_id_fk` FOREIGN KEY (`basket_id`) REFERENCES `baskets`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `delivery_addresses_info_unique` ON `delivery_addresses` (`delivery_info_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `delivery_info_basket_unique` ON `delivery_info` (`basket_id`);