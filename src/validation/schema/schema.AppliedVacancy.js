const schemaAppliedVacancy = {
  type: "object",
  properties: {
    vacancyId: {
      type: "string",
    },
    fullName: {
      type: "string",
      minLength: 5,
      maxLength: 30,
      errorMessage: {
        type: "Исм Шариф формати нотўғри",
        minLength: "Алифбо сони 5 та дан кам бўлмаслиги керак",
        maxLength: "Алифбо сони 30 та дан ошмаслиги керак",
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
      minLength: 3,
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
