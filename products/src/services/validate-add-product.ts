const { body } = require("express-validator");

export const validateAddProduct = () => {
  return [
    body().custom(
      (value: string | number | { size: string; stock: string }[]) => {
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
            throw new Error(`Missing property: ${prop}`);
          }
        }
        return true;
      }
    ),
  ];
};
