CREATE OR ALTER PROCEDURE getOneNote (@id VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM notebookTable WHERE id = @id
    END