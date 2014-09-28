/*
module.exports is the object that's actually returned as the result of a require call.

The exports variable is initially set to that same object (i.e. it's a shorthand "alias"),
so in the module code you would usually write something like this:
var myFunc1 = function() { ... };
var myFunc2 = function() { ... };
exports.myFunc1 = myFunc1;
exports.myFunc2 = myFunc2;
to export (or "expose") the internally scoped functions myFunc1 and myFunc2.

And in the calling code you would use:

var m = require('mymodule');
m.myFunc1();
*/
var list = 
[
  {
  _id: "53f749e7fbe74e0c238819d4",
  name: "Dunn Mclean",
  about: "duis ad aute elit incididunt velit sit sunt irure esse",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xfa1/t51.2885-15/10576163_729198053819201_1787583054_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:38.997Z",
  creationDate: "2014-09-28T11:54:38.997Z"
  },
  {
  _id: "53f749e7fe0f9af0e23eadb3",
  name: "Lewis Atkinson",
  about: "voluptate officia do minim mollit occaecat nisi proident quis culpa",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xfa1/t51.2885-15/10623959_863170830360899_2068647052_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:38.998Z",
  creationDate: "2014-09-28T11:54:38.998Z"
  },
  {
  _id: "53fba6e49f98799dae000001",
  name: "Taravaku Kokomoko",
  about: "It is a name with a name in it.",
  created_at: "2014-08-25T21:13:08.438Z",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10607902_542799812514890_167693260_n.jpg",
  isActive: true,
  uploaded: "2014-08-25T21:13:08.438Z",
  creationDate: "2014-09-28T11:54:38.998Z"
  },
  {
  _id: "53fba8bf9f98799dae000003",
  name: "Hojimoti Hagatafada",
  about: "There is nothing to read here.",
  created_at: "2014-08-25T21:21:03.742Z",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10624033_1489812174599331_1945231726_n.jpg",
  isActive: true,
  uploaded: "2014-08-25T21:21:03.742Z",
  creationDate: "2014-09-28T11:54:38.998Z"
  },
  {
  _id: "53f749e71f238338a4eb57d0",
  name: "Ana Burns",
  about: "proident non enim dolor duis voluptate sit officia tempor fugiat",
  picture: "http://scontent-b.cdninstagram.com/hphotos-xfa1/t51.2885-15/10623872_1517601995120394_606143334_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:38.998Z",
  creationDate: "2014-09-28T11:54:38.998Z"
  },
  {
  _id: "53f749e72911f471fa890f6b",
  name: "Cole Mitchell",
  about: "tempor occaecat aliqua aliquip incididunt qui eu adipisicing laboris consequat",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10611219_710254495688626_1534170315_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.000Z",
  creationDate: "2014-09-28T11:54:39.000Z"
  },
  {
  _id: "53f749e72b3ca5453b096f80",
  name: "Oneill Edwards",
  about: "esse laborum consequat excepteur magna excepteur elit dolore do anim",
  picture: "http://scontent-b.cdninstagram.com/hphotos-xap1/l/t51.2885-15/10520154_356129477874675_1897271190_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.000Z",
  creationDate: "2014-09-28T11:54:39.000Z"
  },
  {
  _id: "53f749e72ccf441df6e9a288",
  name: "Mendoza Hodge",
  about: "incididunt sunt consectetur nisi velit velit Lorem laborum nulla officia",
  picture: "http://scontent-b.cdninstagram.com/hphotos-xap1/t51.2885-15/928536_255349884651782_1606272517_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.000Z",
  creationDate: "2014-09-28T11:54:39.000Z"
  },
  {
  _id: "53f749e72ce3437235b5da8c",
  name: "Hubbard Adkins",
  about: "est velit ullamco ex reprehenderit excepteur ullamco culpa occaecat velit",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xap1/t51.2885-15/10387839_700096533393844_796705803_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.001Z",
  creationDate: "2014-09-28T11:54:39.001Z"
  },
  {
  _id: "53f749e72e8587cff1728ab0",
  name: "Potts Rowland",
  about: "tempor laborum veniam aliqua nulla elit cillum deserunt sunt ex",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xfa1/t51.2885-15/10632488_680857705342562_1717893500_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.001Z",
  creationDate: "2014-09-28T11:54:39.001Z"
  },
  {
  _id: "53f749e732e33e00d84d7963",
  name: "Bonnie Weber",
  about: "Lorem anim quis cillum sint esse esse cupidatat ex quis",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10607941_813228028722337_835452328_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.001Z",
  creationDate: "2014-09-28T11:54:39.001Z"
  },
  {
  _id: "53f749e7373f5efa32bbb34a",
  name: "Pansy Holden",
  about: "consectetur eu minim excepteur dolor ullamco reprehenderit elit dolore nulla",
  picture: "http://scontent-b.cdninstagram.com/hphotos-xfa1/t51.2885-15/10623923_1472968802975397_1123757585_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.001Z",
  creationDate: "2014-09-28T11:54:39.001Z"
  },
  {
  _id: "53f749e73976a4368794d4bc",
  name: "Rhodes Salas",
  about: "ullamco sunt aute pariatur sint sit ea labore laboris ullamco",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10601880_359367344215249_119754646_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.002Z",
  creationDate: "2014-09-28T11:54:39.002Z"
  },
  {
  _id: "53f749e73c3e6771afa64a97",
  name: "Tisha Palmer",
  about: "consequat id ipsum cillum amet consectetur magna qui quis incididunt",
  picture: "http://scontent-b.cdninstagram.com/hphotos-xaf1/t51.2885-15/10598419_349215105236229_1354570472_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.002Z",
  creationDate: "2014-09-28T11:54:39.002Z"
  },
  {
  _id: "53f749e73d613f638c2643a4",
  name: "Suarez Cohen",
  about: "est ea ad ipsum nulla ex minim anim velit id",
  picture: "http://scontent-b.cdninstagram.com/hphotos-xfp1/t51.2885-15/10534957_856910107653802_255952180_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.002Z",
  creationDate: "2014-09-28T11:54:39.002Z"
  },
  {
  _id: "53f749e73f77363f9998925a",
  name: "Eddie Robinson",
  about: "aliquip pariatur qui aute incididunt irure eu culpa ea occaecat",
  picture: "http://scontent-a.cdninstagram.com/hphotos-xaf1/t51.2885-15/10632318_578313492279748_690704556_s.jpg",
  isActive: true,
  uploaded: "2014-09-28T11:54:39.002Z",
  creationDate: "2014-09-28T11:54:39.002Z"
  }
]

exports.list = list;