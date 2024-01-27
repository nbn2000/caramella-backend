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
              minLength: "Маъсулият қиймати 2 та харфдан кам бўлмаслиги керак",
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
              minLength: "Талабари қиймати 2 та харфдан кам бўлмаслиги керак",
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
              minLength: "Шартлари қиймати 2 та харфдан кам бўлмаслиги керак",
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

module.exports = schemaVacancy;
