const schemaAdminSignin = {
  type: "object",
  properties: {
    login: {
      type: "string",
      errorMessage: {
        type: "логин формати нотўғри",
      },
    },
    password: {
      type: "string",
      errorMessage: {
        type: "парол формати нотўғри",
      },
    },
  },
  additionalProperties: false,
  required: ["login", "password"],
};

module.exports = schemaAdminSignin;
