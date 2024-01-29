//users
const user = [{ name: string, phoneNumber: string, userName: string }];

//products
const product = [
  {
    _id: string,
    createdAt: isoDate,
    name: string,
    description: string,
    category: string,
    price: string,
    file: string,
    files: [string],
    property: [{ value: string }],
  },
];
//vacancy
const vacancy = [
  {
    vacancyName: string,
    experience: string,
    responsibility: [{ value: string }],
    requirement: [{ value: string }],
    condition: [{ value: string }],
  },
];

//cart

//send first requiest

const firstcart = [
  {
    user: {
      _id: string,
      name: string,
      phoneNumber: string,
      userName: string,
    },
    cart: [
      {
        _id: string,
        name: string,
        description: string,
        category: string,
        price: string,
        file: string,
        files: [string],
        property: [{ value: string }],
        amount: number,
      },
    ],
  },
];

const cart = {
  _id: new ObjectId("65a510c5dc82e13e14e4db81"),
  device_id: "12412409sdfsdfjsdfpp",
  user: null,
  total_price: 200,
  cart: [
    {
      _id: new ObjectId("65a0d890ae80f9ab02446be6"),
      category: "weddingCake",
      description: "nssssssss",
      file: "fijwoeifjowiejfosssdfjosifid",
      files: [Array],
      name: "Tort1",
      price: "50",
      property: [Array],
      amount: 2,
    },
    {
      _id: new ObjectId("75a0d893ae80f9ab02446be6"),
      category: "weddingCake",
      description: "nssssssss",
      file: "fijwoeifjowiejfosssdfjosifid",
      files: [Array],
      name: "Tort2",
      price: "20",
      property: [Array],
      amount: 5,
    },
  ],
};

const order = [
  {
    device_id: "12412409sdfsdfjsdfpp",
    orderedDate: string,
    date: string,
    time: string,
    additionalPhoneNumber: string,
    comment: string,
    total_price: 120,
    checked: false,
    given: false,
    user: {
      _id: string,
      name: string,
      phoneNumber: string,
      userName: string,
    },
    cart: [
      {
        _id: string,
        name: string,
        description: string,
        category: string,
        price: string,
        file: string,
        files: [string],
        property: [{ value: string }],
        amount: number,
      },
    ],
  },
];
