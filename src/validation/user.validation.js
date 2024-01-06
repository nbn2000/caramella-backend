const AJV = require("ajv");
const ajv = new AJV({ allErrors: true });
const response = require("../services/response.service");

class userValidation {
  static async check(schema, data) {
    return new Promise((res, rej) => {
      try {
        const error = ajv.validate(schema, data);
        if (!error) res(ajv.errorsText());
        res(null);
      } catch (err) {
        rej(err);
      }
    });
  }

  static async signup(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        fullname: {
          type: "string",
          minLength: 2,
          maxLength: 35,
        },
        email: {
          type: "string",
          pattern: "^[a-z0-9+_]+@[a-z.]+$",
        },
        phone: {
          type: "number",
        },

        username: {
          type: "string",
          pattern: "^[a-z0-9]+$",
          minLength: 5,
          maxLength: 20,
        },
        password: {
          type: "string",
          pattern: "^[a-z0-9]+$",
          minLength: 5,
          maxLength: 20,
        },
      },
      additionalProperties: false,
      required: ["fullname", "phone", "username", "password"],
    };

    try {
      const result = await userValidation.check(schema, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      await response.internal(res, err);
    }
  }

  static async signin(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        username: {
          type: "string",
          pattern: "^[a-z0-9]+$",
          minLength: 5,
          maxLength: 20,
        },
        password: {
          type: "string",
          pattern: "^[a-z0-9]+$",
          minLength: 5,
          maxLength: 20,
        },
      },
      additionalProperties: false,
      required: ["username", "password"],
    };

    try {
      const result = await userValidation.check(schema, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (error) {
      await response.internal(res, error);
    }
  }
}

module.exports = userValidation;
