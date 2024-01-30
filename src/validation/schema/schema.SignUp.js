const schemaSignUp = {
  type: "object",
  properties: {
    passCode: {
      type: "string",
      maxLength: 6,
      minLength: 6,
      errorMessage: {
        type: "код стринг холатида бўлиши керак",
        minLength: "камида 6 та хона бўлиши керак",
        maxLength: "кўпи билан 6 та хона бўлиши керак",
      },
    },
  },
  additionalProperties: false,
  required: ["passCode"],
};

module.exports = schemaSignUp;
