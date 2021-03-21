const fb = require("@/firebaseConfig.js");

export default function createUserCollections(uid, shopName) {
  return new Promise((resolve, _reject) => {
    const addShopName = fb.shopNamesCollection.doc(shopName).set({ uid });
    const addUser = fb.usersCollection.doc(uid).set({
      shopName,
      firstLogin: true,
    });

    Promise.all([addUser, addShopName]).then(() => {
      resolve();
    });
  });
}
