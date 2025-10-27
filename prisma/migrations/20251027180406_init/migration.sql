-- CreateTable
CREATE TABLE `entries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `type` ENUM('MOVIE', 'TV_SHOW') NOT NULL,
    `director` VARCHAR(100) NOT NULL,
    `budget` DECIMAL(15, 2) NOT NULL,
    `location` VARCHAR(100) NOT NULL,
    `duration` INTEGER NOT NULL,
    `yearTime` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
