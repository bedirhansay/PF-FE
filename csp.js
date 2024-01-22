// const policies = {
//   "default-src": ["'self'"],
//   "script-src": [
//     "'self'",
//     "'unsafe-inline'",
//     "'unsafe-eval'",
//     "https://checkout.stripe.com",
//     "https://js.stripe.com",
//     "https://maps.googleapis.com",
//   ],
//   "child-src": ["'self'"],
//   "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//   "img-src": ["'self'"],
//   "font-src": ["'self'"],
//   "frame-src": ["'self'"],
//   "connect-src": ["'self'"],
// };

// module.exports = Object.entries(policies)
//   .map(([key, value]) => {
//     if (Array.isArray(value)) {
//       return `${key} ${value.join(" ")}`;
//     }
//     return "";
//   })
//   .join("; ");
