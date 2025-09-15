// /* CORS domains configuration */

// // Devlopement CORS Configurations//

// const devWhitelist = ["http://localhost:3000","htpp://localhost:3001","http://0.0.0.0:3000"];

// const corsDevOptions = {
//   origin: function (origin, callback) {
//     if (!origin || devWhitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },

//   credentials: true,
// };

// // Production CORS Configurations//

// const domainsFromEnv = process.env.CORS_DOMAINS || "";

// const productionWhitelist = domainsFromEnv
//   .split(",")
//   .map((item) => item.trim());

// const corsProOptions = {
//   origin: function (origin, callback) {
//     if (!origin || productionWhitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },

//   credentials: true,
// };

// module.exports = {
//   corsDevOptions,
//   corsProOptions,
// };

// Backend/config/corsConfig.js

// Development whitelist
const devWhitelist = ["http://localhost:3000", "http://127.0.0.1:3000"];

// Production whitelist from environment variable
// Example in .env: CORS_DOMAINS=https://yourfrontend.com,https://www.yourfrontend.com
const domainsFromEnv = process.env.CORS_DOMAINS || "";
const productionWhitelist = domainsFromEnv
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean); // remove empty strings

// Common CORS options function
const createCorsOptions = (whitelist) => ({
  origin: function (origin, callback) {
    console.log("CORS request origin:", origin);
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); // allow request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies/auth headers
});

// Export dev and prod options
const corsDevOptions = createCorsOptions(devWhitelist);
const corsProOptions = createCorsOptions(productionWhitelist);

module.exports = { corsDevOptions, corsProOptions };

