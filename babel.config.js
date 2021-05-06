// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     "plugins": [
//       [
//         "@babel/plugin-proposal-decorators",
//         {
//           "legacy": true
//         }
//       ]
//     ]
//   };
// }; 
  
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require('@babel/plugin-proposal-decorators').default,
      {
        legacy: true,
      },
    ],
  ],
};