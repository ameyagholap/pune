// Culinary Heritage of Pune — "the OGs".
// Not ranked, just listed. Array order = display order = walking order,
// sorted east to west by geocoded longitude (descending — higher lng is
// further east). Numbering is computed from array position at render time
// (js/food.js). Ameya will keep adding to this list over time.
//
// lat/lng: geocoded from each entry's mapUrl (Google Maps place page
// coordinates), kept here so the list can be re-sorted without re-geocoding
// everything from scratch when new entries are added — insert a new entry
// wherever its longitude falls in the descending sequence below, or append
// anywhere and re-sort by lng. appa-chi-khichadi has no exact place-page
// match for its mapUrl (a Google Search knowledge-panel link, not a maps
// place link), so its coordinates are those of Omkareshwar Temple, next to
// which it sits.
//
// established: some years are genuinely disputed across sources (old,
// small, family-run places rarely have a single documented founding date)
// — where sources disagreed, the best-attested figure was kept and
// alternates dropped rather than guessed.
window.FOOD_JOINTS = [
  {
    id: "kayani-bakery",
    name: "Kayani Bakery",
    mapUrl: "https://maps.app.goo.gl/o4WoBtYe6mkuMUMN9",
    lat: 18.5148369,
    lng: 73.8799832,
    established: "1955",
    mustTry: "Shrewsbury biscuits, mawa cake, fruit cake, khari biscuits, ginger biscuits",
    image: "images/food/kayani-bakery.jpg",
    credit: "Miteshbhodia, Wikimedia Commons, CC BY-SA"
  },
  {
    id: "george",
    name: "George",
    mapUrl: "https://maps.app.goo.gl/D1QzsdtvarSqZBVw6",
    lat: 18.5174086,
    lng: 73.8793602,
    established: "1936",
    mustTry: "Mutton biryani, butter chicken, chicken cream cutlet, chelo kebab",
    image: "images/food/george.jpg",
    credit: "Tehniyatshaikh, Wikimedia Commons, CC BY-SA"
  },
  {
    id: "marz-o-rin",
    name: "Marz-o-rin",
    mapUrl: "https://maps.app.goo.gl/wQPLvmq4kc7MqYts8",
    lat: 18.5164807,
    lng: 73.8789937,
    established: "1965",
    mustTry: "Chutney sandwich, grilled chicken sandwich, plum cake, cream pastries, rose milk",
    image: "images/food/marz-o-rin.jpg",
    credit: "Noopur Patel, Wikimedia Commons, CC BY-SA"
  },
  {
    id: "mahalaxmi-khaman-dhokla",
    name: "Mahalaxmi Khaman Dhokla",
    mapUrl: "https://maps.app.goo.gl/Lqx46eHai5YpzCL28",
    lat: 18.5161497,
    lng: 73.8782848,
    established: "1977",
    mustTry: "Khaman dhokla, dhokla chaat, dahi bhalla chaat",
    image: "images/food/mahalaxmi-khaman-dhokla.jpg",
    credit: "Urbanly"
  },
  {
    id: "husseny-bakery",
    name: "Husseny Bakery",
    mapUrl: "https://maps.app.goo.gl/SaSEDV1LubmGd9346",
    lat: 18.5150529,
    lng: 73.8778531,
    established: "1932",
    mustTry: "Bun maska, mawa cake, khari biscuits, brun pav, nankhatai",
    image: "images/food/husseny-bakery.jpg",
    credit: "Astonishing India (Shoma Abhyankar)"
  },
  {
    id: "blue-nile",
    name: "Blue Nile",
    mapUrl: "https://maps.app.goo.gl/yaFBryYCqY5zJ7tLA",
    lat: 18.5218633,
    lng: 73.8774587,
    established: "1960s",
    mustTry: "Keema pav, mutton biryani, boneless chicken masala, tangdi kebab, bun maska with chai",
    image: "images/food/blue-nile.jpg",
    credit: "Himanshu Rane, Wikimedia Commons, CC BY-SA 4.0"
  },
  {
    id: "dorabjee-and-sons",
    name: "Dorabjee & Sons",
    mapUrl: "https://maps.app.goo.gl/4EWE7T32HkENGdnU9",
    lat: 18.515155,
    lng: 73.877009,
    established: "1878",
    mustTry: "Mutton cutlet, chicken cutlet, dhansak dal, akuri",
    image: "images/food/dorabjee-and-sons.jpg",
    credit: "Astonishing India (Shoma Abhyankar)"
  },
  {
    id: "cafe-yezdan",
    name: "Cafe Yezdan",
    mapUrl: "https://maps.app.goo.gl/FsLZLVG6HrV4aZsx8",
    lat: 18.5149907,
    lng: 73.8768749,
    established: "1960s",
    mustTry: "Bun maska, Irani chai, brun, egg double bhurji, cheese omelette",
    image: "images/food/cafe-yezdan.jpg",
    credit: "LBB"
  },
  {
    id: "vohuman-cafe",
    name: "Vohuman Cafe",
    mapUrl: "https://maps.app.goo.gl/kwN328tbGrDfDxY76",
    lat: 18.5325972,
    lng: 73.8768405,
    established: "1978",
    mustTry: "Cheese omelette, bun maska, Irani chai, egg bhurji, keema pav",
    image: "images/food/vohuman-cafe.jpg",
    credit: "Kalyan Karmakar, Finely Chopped"
  },
  {
    id: "kays-chocolates",
    name: "Kays Chocolates",
    mapUrl: "https://maps.app.goo.gl/DZ12BiVvVukciF5HA",
    lat: 18.5169067,
    lng: 73.8767458,
    established: "1995",
    mustTry: "Cashew butterscotch, chocolate-coated cashews, chocolate-coated dry fruits",
    image: "images/food/kays-chocolates.jpg",
    credit: "LBB"
  },
  {
    id: "ardeshir-and-sons",
    name: "Ardeshir & Sons",
    mapUrl: "https://maps.app.goo.gl/5z2qHfVgaBphRjay8",
    lat: 18.5145032,
    lng: 73.8766988,
    established: "1884",
    mustTry: "Raspberry soda, orangeade, lemonade, teekha ginger soda, ice cream soda",
    image: "images/food/ardeshir-and-sons.jpg",
    credit: "The Better India"
  },
  {
    id: "jj-garden-vada-pav",
    name: "JJ Garden Vada Pav",
    mapUrl: "https://maps.app.goo.gl/TV3FQMwcPA4QZR2p8",
    lat: 18.5168799,
    lng: 73.8757753,
    established: "1972",
    mustTry: "Vada pav, fried green chilli, green chutney, masala taak",
    image: "images/food/jj-garden-vada-pav.jpg",
    credit: "Astonishing India (Shoma Abhyankar)"
  },
  {
    id: "zamus-place",
    name: "Zamu's Place",
    mapUrl: "https://maps.app.goo.gl/iVmejBKYgnW5dc7e9",
    lat: 18.5366417,
    lng: 73.8756368,
    established: "1988",
    mustTry: "Chicken/mutton sizzlers, garlic mushrooms, keema pav",
    image: "images/food/zamus-place.jpg",
    credit: "Drunk on Petroleum"
  },
  {
    id: "vaidya-upahar-gruha",
    name: "Vaidya Upahar Gruha",
    mapUrl: "https://maps.app.goo.gl/AW8hwQewPr3wMgYe7",
    lat: 18.5179655,
    lng: 73.8593641,
    established: "early 1900s",
    mustTry: "Misal pav, pohe, sabudana khichadi, bhaji pav, vada pav",
    image: "images/food/vaidya-upahar-gruha.jpg",
    credit: "SocialMaharaj (Atul Maharaj)"
  },
  {
    id: "joshi-wadewale",
    name: "Joshi Wadewale",
    mapUrl: "https://maps.app.goo.gl/Pj4szBjhffw1aMi4A",
    lat: 18.5169927,
    lng: 73.8564255,
    established: "1989",
    mustTry: "Sabudana vada, batata vada, kothimbir vadi, misal pav, onion pakoda",
    image: "images/food/joshi-wadewale.jpg",
    credit: "Tripadvisor"
  },
  {
    id: "baldev-prasad-gupta-sweet-home",
    name: "Baldev Prasad Gupta Sweet Home",
    mapUrl: "https://maps.app.goo.gl/kcso5U9BDReRLEDU7",
    lat: 18.5129348,
    lng: 73.8562872,
    established: "1882",
    mustTry: "Bread pakoda, batata wada, jalebi, puri bhaji",
    image: "images/food/baldev-prasad-gupta-sweet-home.jpg",
    credit: "Urbanly"
  },
  {
    id: "sudamache-pohe",
    name: "Sudamache Pohe",
    mapUrl: "https://maps.app.goo.gl/v4txNAiCiQRXqDqK6",
    lat: 18.5200047,
    lng: 73.8561999,
    established: "",
    mustTry: "Kanda poha, batata poha, tomato poha, sev and farsan topping",
    image: "images/food/sudamache-pohe.jpg",
    credit: ""
  },
  {
    id: "poona-guest-house",
    name: "Poona Guest House",
    mapUrl: "https://maps.app.goo.gl/oFW1EHrFfADjHBS86",
    lat: 18.51531,
    lng: 73.8555003,
    established: "1935",
    mustTry: "Gramin thali, sabudana usal, thalipeeth, shrikhand, kulith pithla",
    image: "images/food/poona-guest-house.jpg",
    credit: "Shakher59, Wikimedia Commons, CC BY-SA"
  },
  {
    id: "kawre-coldrinks",
    name: "Kawre Coldrinks",
    mapUrl: "https://maps.app.goo.gl/RYXWnjvHzs1zfxy67",
    lat: 18.5149276,
    lng: 73.85514,
    established: "1952",
    mustTry: "Mango mastani, faluda, cassata ice cream, milkshakes",
    image: "images/food/kawre-coldrinks.jpg",
    credit: "Kawre Icecreams"
  },
  {
    id: "chitale-bandhu",
    name: "Chitale Bandhu",
    mapUrl: "https://maps.app.goo.gl/1Dn6tJXJGRhBCCjY8",
    lat: 18.5135379,
    lng: 73.8536958,
    established: "1950",
    mustTry: "Bakarwadi, chakli, farsan mix, kaju katli, motichoor laddu",
    image: "images/food/chitale-bandhu.jpg",
    credit: "Bajirao Pawar, Forbes India"
  },
  {
    id: "sujata-mastani",
    name: "Sujata Mastani",
    mapUrl: "https://maps.app.goo.gl/BqWnLRAHbSU5eRVh8",
    lat: 18.511755,
    lng: 73.8520311,
    established: "1967",
    mustTry: "Mango mastani, kesar mastani, kesar pista mastani, sitaphal mastani, gulkand mastani",
    image: "images/food/sujata-mastani.jpg",
    credit: "YummyPune"
  },
  {
    id: "bedekar-misal",
    name: "Bedekar Misal",
    mapUrl: "https://maps.app.goo.gl/8SeAPZLXp9772Rn46",
    lat: 18.5148471,
    lng: 73.8499297,
    established: "1948",
    mustTry: "Misal (served with bread), kanda bhaji, potato bhaji, kokum sharbat, solkadi",
    image: "images/food/bedekar-misal.jpg",
    credit: "Tripadvisor"
  },
  {
    id: "appa-chi-khichadi",
    name: "Appa chi Khichadi",
    mapUrl: "https://share.google/fOmePIbWsMwKroZzh",
    lat: 18.5199,
    lng: 73.8489,
    established: "1960s",
    mustTry: "Khichdi-kakdi, batata vada, misal, idli-sambar",
    image: "images/food/appa-chi-khichadi.jpg",
    credit: "PuneFoodSpot"
  },
  {
    id: "new-poona-boarding-house",
    name: "New Poona Boarding House",
    mapUrl: "https://maps.app.goo.gl/SDzpaW9gxK52E5AT7",
    lat: 18.5115922,
    lng: 73.8485889,
    established: "1925",
    mustTry: "Pure veg Marathi lunch thali — aluchi bhaji, varan-amti, bharli vangi, koshimbir, masale bhaat, shrikhand",
    image: "images/food/new-poona-boarding-house.jpg",
    credit: "Harshita Lalwani, The Locavore"
  },
  {
    id: "aware-maratha-khanawal",
    name: "Aware Maratha Khanawal",
    mapUrl: "https://maps.app.goo.gl/FoCMsvw7otvL86HSA",
    lat: 18.5128231,
    lng: 73.8451626,
    established: "1901",
    mustTry: "Mutton thali, chicken thali, chicken biryani, bhakri",
    image: "images/food/aware-maratha-khanawal.jpg",
    credit: "Google Maps"
  },
  {
    id: "cafe-goodluck",
    name: "Cafe Goodluck",
    mapUrl: "https://maps.app.goo.gl/ZxPwHYr3RE3k2PhU7",
    lat: 18.5173131,
    lng: 73.8414923,
    established: "1935",
    mustTry: "Bun maska, Irani chai, mutton keema pav, bheja fry, Goodluck special (fried egg on bun)",
    image: "images/food/cafe-goodluck.jpg",
    credit: "Djknusper, Wikimedia Commons, CC BY-SA"
  },
  {
    id: "darshan",
    name: "Darshan",
    mapUrl: "https://maps.app.goo.gl/cFRM3BoasZPtPktg8",
    lat: 18.5140602,
    lng: 73.8408997,
    established: "1976",
    mustTry: "Chole bhature, dahi vada, pav bhaji, vegetable cutlet, sizzlers",
    image: "images/food/darshan.jpg",
    credit: "PuneFoodSpot"
  }
];
