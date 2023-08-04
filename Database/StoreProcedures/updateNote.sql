CREATE OR ALTER PROCEDURE updateNote (@id VARCHAR(200), @noteTitle  VARCHAR(500), @noteContent VARCHAR(1000), @createdAt DATETIME)
AS
    BEGIN
        UPDATE notebookTable SET noteTitle = @noteTitle, noteContent = @noteContent, createdAt = @createdAt WHERE id= @id
    END