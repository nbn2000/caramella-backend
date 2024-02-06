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
        "biscuit-type",
        "half-ready",
        "cookie",
        "layer-type",
        "salad",
        "mousse",
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
        maxLength: "Сал инсоф билан булина же унча нарх қуйвормана бита тортга",
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

module.exports = schemaCard;
