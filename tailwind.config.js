const TailwindCaseTypesColors = {
  Vascular: "#B25ED3",
  CAD: "#F16B88",
  Structural_Heart: "#885519",
  Heart_Rythm: "#2258BC",
  Thoracic: "#17B5E7",
  Heart_Failure: "#000000",
  Cardiology: "#710F49",
  Imaging: "#C9A3F9",
  Prevention: "#4B98D0",
};

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '300px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1636px',
    },
    extend: {
      colors: {
        grey: "#D8D8D8",
        pulse_dark_grey: "#6C6C6C",
        violet: "#6753A1",
        hblue: "#57AEFF",
        hgreen: "#5FBB48",
        hpink: "#FF611E",
        bgGrenn: "#4FB036;",
        Pink: "#C187B8",
        vino: "#710F49",
        "vino-soft": "#991e68",
        Review: "#A43492",
        Routine: "#7DCD70",
        Urgent: "#EF8B43",
        Stat: "#B00020",
        Postop: "#FF8038",
        Conference: "#4B98D0",
        danger: "#dc3545",
        lila: "#C9A3F9",
        sweetWhite: "#ededed",
        sky: "#57AEFF8C",
        orange: "#E38162",
        lightGreen: "#4FB03633",
        lightSky: "#549ee142",
        lightOrange: "#EA6A422E",
        violeta: "#830f70",
        vinoLight: 'rgba(131, 16, 112, 0.09)',
        ...TailwindCaseTypesColors,
      },
      fontFamily: {
        Roboto: ["Roboto Condensed", "sans-serif"],
      },
      lineClamp: {
        7: '7',
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
