const AJV = require("ajv");
const ajv = new AJV({ allErrors: true });
require("ajv-errors")(ajv);
const response = require("../services/response.service");

class Validation {
  static async check(schema, data) {
    return new Promise((res, rej) => {
      try {
        const error = ajv.validate(schema, data);
        if (!error) res(ajv.errors[0].message);
        res(null);
      } catch (err) {
        rej(err);
      }
    });
  }
  static async Card(req, res, next) {
    try {
      const { schemaCard } = require("./schema/schemaCard");
      const result = await Validation.check(schemaCard, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      console.log(err);
      await response.internal(res, undefined, err);
    }
  }

  static async Vacancy(req, res, next) {
    const { schemaVacancy } = require("./schema/schemaVacancy");
    try {
      const result = await Validation.check(schemaVacancy, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      console.log(err);
      await response.internal(res, undefined, err);
    }
  }
}

module.exports = Validation;
