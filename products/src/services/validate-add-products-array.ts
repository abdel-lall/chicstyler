const { body } = require("express-validator");

export const validateAddProductsArray = () => {
  return [
    body().isArray().withMessage("Body should be an array"),
    body("*")
      .isObject()
      .withMessage("Each element should be an object")
      .bail()
      .custom((value: string | number | { size: string; stock: string }[]) => {
        // Define the expected properties
        const expectedProperties = [
          "name",
          "brand",
          "description",
          "category",
          "color",
          "sizes",
          "price",
          "image",
          "gender",
        ];

        // Check if each element in the array has the expected properties
        for (const prop of expectedProperties) {
          if (!value.hasOwnProperty(prop)) {
            throw new Error(`Property '${prop}' is missing`);
          }
        }

        return true;
      }),
  ];
};
