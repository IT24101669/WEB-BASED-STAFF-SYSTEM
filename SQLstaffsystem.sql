CREATE TABLE Positions (
    id INT PRIMARY KEY IDENTITY(1,1),
    title NVARCHAR(100) NOT NULL,
    description NVARCHAR(255),
    department NVARCHAR(100)
);
