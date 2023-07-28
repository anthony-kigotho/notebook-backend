CREATE OR ALTER PROCEDURE createNotePROC(@id VARCHAR(200), @noteTitle  VARCHAR(500), @noteContent VARCHAR(1000), @createdAt TIME)
AS
BEGIN
    INSERT INTO notebookTable(id, noteTitle, noteContent, createdAt) VALUES (@id, @noteTitle, @noteContent, @createdAt)
END