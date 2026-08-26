PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`slug` text NOT NULL UNIQUE,
	`name` text NOT NULL UNIQUE
);
--> statement-breakpoint
INSERT INTO `__new_categories`(`id`, `slug`, `name`) SELECT `id`, `slug`, `name` FROM `categories`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `__new_categories` RENAME TO `categories`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`slug` text NOT NULL UNIQUE,
	`description` text NOT NULL,
	`price` real NOT NULL,
	`quantity` real NOT NULL,
	`stock` real NOT NULL,
	`price_unit` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_products`(`id`, `name`, `slug`, `description`, `price`, `quantity`, `stock`, `price_unit`) SELECT `id`, `name`, `slug`, `description`, `price`, `quantity`, `stock`, `price_unit` FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;