const fb = require("@/firebaseConfig.js");

export default function shopSetup(uid, name, slug) {
  return new Promise((resolve, _) => {
    const shop = {
      name: name,
      formMessage: `Lorem ipsum dolor sit amet, ${name} adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco`,
      maxCustomers: 0,
      slotSize: 0,
      openingHours: [
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
        { start: "", end: "", open: true },
      ],
    };

    const addSlug = fb.shopsSlugCollection.doc(slug).set({ uid });
    const addShop = fb.shopsCollection.doc(uid).set(shop);

    Promise.all([addSlug, addShop]).then(() => {
      resolve();
    });
  });
}
