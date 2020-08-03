//tailwind config file. You can extend the themes, variants and add plugins hrre
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        polarshadow: "0px 10px 30px rgba(0, 0, 0, 0.04)"
      },
      colors: {
        polardark: "#111111",
        polarpurple: "#5E72E4",
        polarorange: "#FB6340",
        polarred: "#F5365C",
        polargrey: "#737373",
        polarlightblue: "#FBFBFF",
        polarlightgrey: "#F8F8F8",
        polarlightdark: "#BEBEBE"
      },
      spacing: {
        7: "1.75rem",
        11: "2.90rem",
        18: "4.50rem",
        28: "7rem",
        72: "18rem",
        80: "20rem",
        88: "22rem",
        96: "24rem",
        120: "30rem"
      },
      fontSize: {
        xxs: "0.5rem",
        "7xl": "5rem"
      },
      width: {
        7: "1.75rem",
        "9/10": "90%",
        sm: "640px",
        md: "768px",
        lg: "1024px"
      }
    }
  },
  variants: {},
  plugins: []
};
