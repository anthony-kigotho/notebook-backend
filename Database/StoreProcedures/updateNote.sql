CREATE OR ALTER PROCEDURE updateNote (@id VARCHAR(200), @noteTitle  VARCHAR(500), @noteContent VARCHAR(1000), @createdAt TIME)
AS
    BEGIN
        UPDATE notebookTable SET id= @id, noteTitle = @noteTitle, noteContent = @noteContent, createdAt = @createdAt WHERE id= @id
    END