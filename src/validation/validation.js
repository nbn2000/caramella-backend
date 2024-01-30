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
      const { schemaCard } = require("./schema/schema.Card");
      const result = await Validation.check(schemaCard, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      console.log(err);
      await response.internal(res, undefined, err);
    }
  }

  static async Vacancy(req, res, next) {
    const { schemaVacancy } = require("./schema/schema.Vacancy");
    try {
      const result = await Validation.check(schemaVacancy, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      console.log(err);
      await response.internal(res, undefined, err);
    }
  }

  static async SignUp(req, res, next) {
    const  schemaSignUp  = require("./schema/schema.SignUp");
    try {
      const result = await Validation.check(schemaSignUp, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      console.log(err);
      await response.internal(res, undefined, err);
    }
  }

  static async adminSignin(req, res, next) {
    const  schemaAdminSignin  = require("./schema/schema.AdminSignin");
    try {
      const result = await Validation.check(schemaAdminSignin, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      console.log(err);
      await response.internal(res, undefined, err);
    }
  }

  static async appliedVacancy(req, res, next) {
    const  schemaAppliedVacancy  = require("./schema/schema.AppliedVacancy");
    try {
      const result = await Validation.check(schemaAppliedVacancy, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      console.log(err);
      await response.internal(res, undefined, err);
    }
  }
}

module.exports = Validation;
