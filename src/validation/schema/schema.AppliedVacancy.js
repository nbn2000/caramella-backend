const schemaAppliedVacancy = {
  type: "object",
  properties: {
    vacancyId: {
      type: "string",
    },
    fullName: {
      type: "string",
      maxLength: 5,
      minLength: 30,
      errorMessage: {
        type: "Исм Шариф формати нотўғри",
        minLength: "Алифбо сони 5 та дан кам бўлмаслиги керак",
        maxLength: "Алифбо сони 25 та дан ошмаслиги керак",
      },
    },
    tel: {
      type: "string",
      errorMessage: {
        type: "Телефон формати нотўғри",
      },
    },
    description: {
      type: "string",
      maxLength: 3,
      errorMessage: {
        type: "Изох формати нотўғри",
        minLength: "Алифбо сони 3 та дан кам бўлмаслиги керак",
      },
    },
  },
  additionalProperties: false,
  required: ["fullName", "tel", "description"],
};

module.exports = schemaAppliedVacancy;
