//users
const user = [{ name: string, phoneNumber: string, userName: string }];

//products
const product = [
  {
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

const cart = [
  {
    user: {
      _id: string,
      name: string,
      phoneNumber: string,
      userName: string,
    },
    totalPrice: string,
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

const order = [
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
    date: string,
    time: string,
    additionalPhoneNumber: string,
    comment: string,
  },
];
