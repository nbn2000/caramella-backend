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

const cart = [
  {
    name: string,
    phoneNumber: string,
    userName: string,
    cart: [
      {
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
    name: string,
    phoneNumber: string,
    userName: string,
    cart: [
      {
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
