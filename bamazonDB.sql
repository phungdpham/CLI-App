DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price DECIMAL(10,2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES	("smartphone", "electronics", 100,  60),
		("TV", "electronics", 350, 50),
		("Laptop", "electronics", 900, 15),
        ("shoes for men", "Clothing", 80, 35),
        ("shoes for women", "Clothing", 90, 140),
        ("Shirts", "Clothing", 45, 430),
        ("Rings", "Jewelry", 200, 13),
        ("Water", "Grocery", 5, 200),
        ("Business Books", "Books", 35, 370),
        ("Sofa", "Furniture", 250, 25);
        
SELECT * FROM products;
