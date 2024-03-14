DELIMITER $$
DROP PROCEDURE IF EXISTS addColumnToItem $$
CREATE PROCEDURE addColumnToItem()
BEGIN
    IF NOT EXISTS (SELECT * FROM information_schema.columns WHERE table_name = 'items' AND column_name = 'deleted_at') THEN
        ALTER TABLE items
            ADD COLUMN `deleted_at` TIMESTAMP;
    END IF;
END $$
CALL addColumnToItem() $$
DROP PROCEDURE addColumnToItem $$
DELIMITER ;