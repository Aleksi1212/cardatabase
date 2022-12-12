
CREATE TABLE cars(
    productionNumber INT NOT NULL AUTO_INCREMENT,
    brand VARCHAR(14) NOT NULL,
    lincece VARCHAR(9) NOT NULL,
    annualModel INT NOT NULL,
    highSpeed INT NOT NULL,
    PRIMARY KEY(productionNumber)
);

INSERT INTO cars(productionNumber, brand, licnece, annualModel, highSpeed)
VALUES
(1, 'BMW', '6WG139', 2013, 160),
(2, 'Volvo', '8ENC528', 2020, 175),
(3, 'Audi', '8ALB710', 2010, 140),
(4, 'Nissan', '927RXH', 2005, 155),
(5, 'Kia', '7UUZ994', 2018, 165)