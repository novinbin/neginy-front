export const routes = {
  landing: {
    root: "/",
    contact: "/contact",
    about: "/about",
    wedding: "/wedding-hall",
  },

  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    guest: "/auth/guest",
    signUpBusiness: {
      root: "/auth/sign-up-business",
      ceremonies: "/auth/sign-up-business/ceremonies",
      hall: "/auth/sign-up-business/hall",
      studio: "/auth/sign-up-business/studio",
      weddingPlaner: "/auth/sign-up-business/wedding-planer",
    },
  },

  admin: {
    dashboard: "/admin/dashboard",
    user: "/admin/user",
    gallery: "/admin/gallery",
    package: {
      root: "/admin/home-page/package",
      create: "/admin/home-page/package/create",
      details: "/admin/home-page/package/details",
      edit: (id) => `/admin/home-page/package/${id}/edit`,
      editBusiness: (id) => `/admin/users/${id}/edit/business`,
    },

    users: {
      root: "/admin/users",
      create: "/admin/users/create",
      edit: (id) => `/admin/users/${id}/edit`,
      editBusiness: (id) => `/admin/users/${id}/edit/business`,
      details: (id) => `/admin/users/${id}`,
    },
    comments: {
      root: "/admin/comments",
      edit: (id) => `/admin/comments/${id}/edit`,
      details: (id) => `/admin/comments/${id}`,
    },
    subscriptions: {
      root: "/admin/subscriptions",
      create: "/admin/subscriptions/create",
      edit: (id) => `/admin/subscriptions/${id}/edit`,
      details: (id) => `/admin/subscriptions/${id}`,
    },
    services: {
      root: "/admin/services",
      create: "/admin/services/create",
      edit: (id) => `/admin/services/${id}/edit`,
      details: (id) => `/admin/services/${id}`,
    },
    weddingCard: {
      root: "/admin/wedding-card",
      create: "/admin/wedding-card/create",
      edit: (id) => `/admin/wedding-card/${id}/edit`,
      details: (id) => `/admin/wedding-card/${id}`,
    },
    weddingCardText: {
      root: "/admin/wedding-card-text",
      create: "/admin/wedding-card-text/create",
      edit: (id) => `/admin/wedding-card-text/${id}/edit`,
      details: (id) => `/admin/wedding-card-text/${id}`,
    },
    homePage: {
      image: "/admin/home-page/image",
      formality: "/admin/home-page/formality",
      online: "/admin/home-page/onlineGift",
      panel: "/admin/home-page/panel",
      services: "/admin/home-page/services",
      planner: "/admin/home-page/planner",
      footer: "/admin/home-page/footer",
      create: "/admin/home-page/create",
      about: "/admin/home-page/about",
      contact: "/admin/home-page/contact",
      servicPage: "/admin/home-page/servic-page",
      enviroment: "/admin/home-page/enviroment",
      edit: (id) => `/admin/home-page/${id}/edit`,
      details: (id) => `/admin/home-page/${id}`,
    },
  },

  ceremony: {
    dashboard: "/ceremony/dashboard",
    profile: "/ceremony/profile",
    user: "/ceremony/user",
    subscription: {
      root: "/ceremony/subscription",
    },
    comments: {
      root: "/ceremony/comments",
      edit: (id) => `/ceremony/comments/${id}/edit`,
      details: (id) => `/ceremony/comments/${id}`,
    },
    services: {
      root: "/ceremony/services",
      create: "/ceremony/services/create",
      all: "/ceremony/services/all",

      edit: (id) => `/ceremony/services/${id}/edit`,
      details: (id) => `/ceremony/services/${id}`,
    },
    timing: {
      root: "/ceremony/timing",
    },

    reserve: {
      root: "/ceremony/reserve",
      details: (id) => `/ceremony/reserve/${id}`,
      accept: {
        root: "/ceremony/reserve/accept",
        details: (id) => `/ceremony/reserve/accept/${id}`,
      },
      cancel: {
        root: "/ceremony/reserve/cancel",
        details: (id) => `/ceremony/reserve/cancel/${id}`,
      },
      pending: {
        root: "/ceremony/reserve/pending",
        details: (id) => `/ceremony/reserve/pending/${id}`,
      },
      payment: {
        root: "/ceremony/reserve/pending-payment",
        details: (id) => `/ceremony/reserve/pending-payment/${id}`,
      },
      reject: {
        root: "/ceremony/reserve/reject",
        details: (id) => `/ceremony/reserve/reject/${id}`,
      },
    },
  },

  studio: {
    dashboard: "/studio/dashboard",
    profile: "/studio/profile",
    user: "/studio/user",
    subscription: {
      root: "/studio/subscription",
    },
    comments: {
      root: "/studio/comments",
      edit: (id) => `/studio/comments/${id}/edit`,
      details: (id) => `/studio/comments/${id}`,
    },
    services: {
      root: "/studio/services",
      create: "/studio/services/create",
      all: "/studio/services/all",

      edit: (id) => `/studio/services/${id}/edit`,
      details: (id) => `/studio/services/${id}`,
    },
    timing: {
      root: "/studio/timing",
    },

    reserve: {
      root: "/studio/reserve",
      details: (id) => `/studio/reserve/${id}`,
      accept: {
        root: "/studio/reserve/accept",
        details: (id) => `/studio/reserve/accept/${id}`,
      },
      cancel: {
        root: "/studio/reserve/cancel",
        details: (id) => `/studio/reserve/cancel/${id}`,
      },
      pending: {
        root: "/studio/reserve/pending",
        details: (id) => `/studio/reserve/pending/${id}`,
      },
      payment: {
        root: "/studio/reserve/pending-payment",
        details: (id) => `/studio/reserve/pending-payment/${id}`,
      },
      reject: {
        root: "/studio/reserve/reject",
        details: (id) => `/studio/reserve/reject/${id}`,
      },
    },
  },

  talar: {
    dashboard: "/talar/dashboard",
    profile: "/talar/profile",
    user: "/talar/user",
    subscription: {
      root: "/talar/subscription",
    },
    comments: {
      root: "/talar/comments",
      edit: (id) => `/talar/comments/${id}/edit`,
      details: (id) => `/talar/comments/${id}`,
    },
    services: {
      root: "/talar/services",
      create: "/talar/services/create",
      all: "/talar/services/all",

      edit: (id) => `/talar/services/${id}/edit`,
      details: (id) => `/talar/services/${id}`,
    },
    timing: {
      root: "/talar/timing",
    },

    reserve: {
      root: "/talar/reserve",
      details: (id) => `/talar/reserve/${id}`,
      accept: {
        root: "/talar/reserve/accept",
        details: (id) => `/talar/reserve/accept/${id}`,
      },
      cancel: {
        root: "/talar/reserve/cancel",
        details: (id) => `/talar/reserve/cancel/${id}`,
      },
      pending: {
        root: "/talar/reserve/pending",
        details: (id) => `/talar/reserve/pending/${id}`,
      },
      payment: {
        root: "/talar/reserve/pending-payment",
        details: (id) => `/talar/reserve/pending-payment/${id}`,
      },
      reject: {
        root: "/talar/reserve/reject",
        details: (id) => `/talar/reserve/reject/${id}`,
      },
    },
  },

  user: {
    dashboard: "/user/dashboard",
    ceremony: {
      root: "/user/ceremony",
      details: (id) => `/user/ceremony/${id}`,
      edit: (id) => `/user/ceremony/${id}/edit`,
    },
    package: {
      root: "/user/package",
      all: "/user/package/all",
      create: "/user/package/create",
      details: "/user/package/details",
      edit: (id) => `/user/package/${id}/edit`,
      editBusiness: (id) => `/user/users/${id}/edit/business`,
    },
    reservation: {
      root: "/user/reservation",
      edit: (id) => `/user/reservation/${id}/edit`,
      details: (id) => `/user/reservation/${id}`,
    },
    wedding: "/user/wedding",
    gallery: "/user/gallery"

  },

  weddingPlaner: {
    subscription: {
      root: "/wedding-planer/subscription",
    },
    dashboard: "/wedding-planer/dashboard",
    comments: {
      root: "/wedding-planer/comments",
      edit: (id) => `/wedding-planer/comments/${id}/edit`,
      details: (id) => `/wedding-planer/comments/${id}`,
    },
    services: {
      root: "/wedding-planer/services",
      create: "/wedding-planer/services/create",
      all: "/wedding-planer/services/all",
      edit: (id) => `/wedding-planer/services/${id}/edit`,
      details: (id) => `/wedding-planer/services/${id}`,
    },
    timing: {
      root: "/weddingPlaner/timing",
    },
  },

  weddingCard: {
    dashboard: `/wedding-card/dashboard`,
    gifts: "/wedding-card/gifts",
    bank: "/wedding-card/bank",
    gallery: {
      root: "/wedding-card/gallery",
      pictures: "/wedding-card/gallery/pictures",
      videos: "/wedding-card/gallery/videos",
    },
  },

  weddingHall: {
    root: "/wedding-hall",
    all: (id) => `/wedding-hall/${id}`,
    details: (id, reserve) => `/wedding-hall/${id}/${reserve}`,
  },

  ceremonies: {
    root: "/ceremonies",
    all: (id) => `/ceremonies/${id}`,
    details: (id, reserve) => `/ceremonies/${id}/${reserve}`,
  },

  studios: {
    root: "/studios",
    all: (id) => `/studios/${id}`,
    details: (id, reserve) => `/studios/${id}/${reserve}`,
  },

  weddingPlaners: {
    root: "/wedding-planners",
    all: (id) => `/wedding-planners/${id}`,
    details: (id, reserve) => `/wedding-planners/${id}/${reserve}`,
  },
};
