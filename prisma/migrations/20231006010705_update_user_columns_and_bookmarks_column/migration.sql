-- CreateTable

CREATE TABLE
    `users` (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `email` VARCHAR(191) NOT NULL,
        `password` VARCHAR(191) NOT NULL,
        `firstname` VARCHAR(191) NULL,
        `lastname` VARCHAR(191) NULL,
        `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME(3) NOT NULL,

UNIQUE INDEX `users_email_key`(`email`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable

CREATE TABLE
    `bookmarks` (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(191) NOT NULL,
        `description` VARCHAR(191) NOT NULL,
        `link` VARCHAR(191) NOT NULL,
        `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME(3) NOT NULL,
        `user_id` INTEGER NOT NULL,

PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey

ALTER TABLE `bookmarks`
ADD
    CONSTRAINT `bookmarks_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;