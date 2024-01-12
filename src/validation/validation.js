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
    const schemaCard = {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        name: {
          type: "string",
          minLength: 4,
          errorMessage: {
            type: "Махсулот исми 'string'холатида болиши керак ",
            minLength: "Махсулот исми 4 та харфдан кам болмаслиги керак",
          },
        },
        description: {
          type: "string",
          minLength: 4,
          errorMessage: {
            type: "Махсулот хақида 'string' холатида болиши керак ",
            minLength: "Махсулот хақида 4 та харфдан кам болмаслиги керак",
          },
        },
        category: {
          type: "string",
          enum: [
            "weddingCake",
            "macarons",
            "biscuits",
            "customCake",
            "cupcake",
            "birthdayCake",
          ],
          errorMessage: {
            type: "Махсулот тоифаси 'string' холатида болиши керак ",
            enum: "Махсулот тоифаси фақатгина куъидаги тофани қабул килади ['weddingCake','macarons','biscuits','customCake','cupcake','birthdayCake']",
          },
        },
        price: {
          type: "string",
          minLength: 2,
          maxLength: 20,
          errorMessage: {
            type: "Махсулот нархи 'string' холатида болиши керак",
            maxLength:
              "Сал инсоф билан булина же унча нарх қуйвормана бита тортга",
            minLength: "Жуда озон қуйвориси сал қимматроқ кўйинг",
          },
        },
        file: {
          type: "string",
          minLength: 5,
          errorMessage: {
            type: "Расм йуборишда қандайдир хотоликка дуж келинди илтимос яна қайтадан уриниб кўринг",
            minLength:
              "Расм йуборишда қандайдир хотоликка дуж келинди илтимос яна қайтадан уриниб кўринг",
          },
        },
        files: {
          type: "array",

          items: {
            type: "string",
            minLength: 5,
            errorMessage: {
              type: "Расм йуборишда қандайдир хотоликка дуж келинди илтимос яна қайтадан уриниб кўринг",
              minLength:
                "Расм йуборишда қандайдир хотоликка дуж келинди илтимос яна қайтадан уриниб кўринг",
            },
          },
          errorMessage: {
            type: "Расм йуборишда қандайдир хотоликка дуж келинди илтимос яна қайтадан уриниб кўринг",
          },
        },
        property: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: {
                type: "string",
                minLength: 2,
                errorMessage: {
                  type: "Махсулот асосий ингридиентлар қиймати 'string' холатида болиши керак",
                  minLength:
                    "Махсулот асосий ингридиентлар қиймати 2 та харфдан кам бўлмаслиги керак",
                },
              },
            },
            errorMessage: {
              type: "Махсулот асосий ингридиентлар буйумлари 'object' холатида болиши керак ",
            },
          },
          errorMessage: {
            type: "Махсулот асосий ингридиентлар ташқи буйумлари 'array' холатида болиши керак ",
          },
        },
      },
      additionalProperties: false,
      required: [
        "name",
        "description",
        "category",
        "price",
        "file",
        "files",
        "property",
      ],
    };

    try {
      const result = await Validation.check(schemaCard, req.body);
      if (!result) return next();
      await response.warning(res, result);
    } catch (err) {
      console.log(err);
      await response.internal(res, undefined, err);
    }
  }

  static async Vacancy(req, res, next) {
    const schemaVacancy = {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        vacancyName: {
          type: "string",
          minLength: 4,
          errorMessage: {
            type: "Вакансия исми 'string'холатида болиши керак ",
            minLength: "Вакансия исми 4 та харфдан кам болмаслиги керак",
          },
        },
        experience: {
          type: "string",
          minLength: 4,
          errorMessage: {
            type: "Тажриба хақида 'string' холатида болиши керак ",
            minLength: "Тажриба хақида 4 та харфдан кам болмаслиги керак",
          },
        },
        responsibility: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: {
                type: "string",
                minLength: 2,
                errorMessage: {
                  type: "Маъсулият қиймати 'string' холатида болиши керак",
                  minLength:
                    "Маъсулият қиймати 2 та харфдан кам бўлмаслиги керак",
                },
              },
            },
            errorMessage: {
              type: "Маъсулият буйумлари 'object' холатида болиши керак ",
            },
          },
          errorMessage: {
            type: "Маъсулият ташқи буйумлари 'array' холатида болиши керак ",
          },
        },
        requirement: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: {
                type: "string",
                minLength: 2,
                errorMessage: {
                  type: "Талабари қиймати 'string' холатида болиши керак",
                  minLength:
                    "Талабари қиймати 2 та харфдан кам бўлмаслиги керак",
                },
              },
            },
            errorMessage: {
              type: "Талабари буйумлари 'object' холатида болиши керак ",
            },
          },
          errorMessage: {
            type: "Талабари ташқи буйумлари 'array' холатида болиши керак ",
          },
        },
        condition: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: {
                type: "string",
                minLength: 2,
                errorMessage: {
                  type: "Шартлари қиймати 'string' холатида болиши керак",
                  minLength:
                    "Шартлари қиймати 2 та харфдан кам бўлмаслиги керак",
                },
              },
            },
            errorMessage: {
              type: "Шартлари буйумлари 'object' холатида болиши керак ",
            },
          },
          errorMessage: {
            type: "Шартлари ташқи буйумлари 'array' холатида болиши керак ",
          },
        },
      },
      additionalProperties: false,
      required: [
        "vacancyName",
        "experience",
        "responsibility",
        "requirement",
        "condition",
      ],
    };

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
