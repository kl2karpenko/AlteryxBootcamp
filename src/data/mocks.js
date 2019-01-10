export const FOODS = ['American', 'Asian', 'Burgers', 'Candy','Chinese', 'Desserts', 'French', 'Italian', 'Japanese', 'Mediterranean' ];
export const PRICES = ['10-30$', '31-50$', '51-100$', '101-150$' ];
export const RESTAURANTS = ['Anjappar Chettinad Restaurant', 'ApplebeeS', 'Arab Udupi',
  'Azzip Pizza','Bahama Breeze', 'Baja Fresh', 'Barbeque Nation', 'Big Boy', 'Black Angus Steakhouse', 'Blaze Pizza', 'Anjappar Chettinad Restaurant', 'ApplebeeS', 'Arab Udupi',
  'Azzip Pizza','Bahama Breeze', 'Baja Fresh', 'Barbeque Nation', 'Big Boy', 'Black Angus Steakhouse', 'Blaze Pizza' ];

export const FOODS_TYPES_SELECT = FOODS.map(item => ({ value: item.toLowerCase(), name: item  }));
export const RESTAURANTS_TYPES_SELECT = RESTAURANTS.map(item => ({ value: item.toLowerCase(), name: item  }));
export const PRICES_TYPES_SELECT = PRICES.map(item => ({ value: item.toLowerCase(), name: item  }));
