CREATE OR ALTER PROCEDURE deleteNote (@id VARCHAR(200))
AS
BEGIN 
    DELETE FROM notebookTable WHERE id=@id
END