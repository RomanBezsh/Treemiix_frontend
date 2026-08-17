export type CustomerServiceAction = {
  title: string;
  href: string;
};

export type CustomerServiceTopic = {
  slug: string;
  title: string;
  description?: string[];
  bulletPoints?: string[];
  actions?: CustomerServiceAction[];
};

export type CustomerServiceCategory = {
  slug: string;
  title: string;
  icon: string;
  topics: CustomerServiceTopic[];
};

export const customerServiceCategories: Record<
  string,
  CustomerServiceCategory
> = {
  orders: {
    slug: "orders",
    title: "A delivery, order or return",
    icon: "/common/cart_icon.svg",
    topics: [
      {
        slug: "find-order",
        title: "Find an item or order",
        description: [
          "Search for an item from your recent orders to get help with delivery, returns or refunds.",
        ],
        actions: [
          {
            title: "Go to your orders",
            href: "/orders",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "delivery-problem",
        title: "Delivery problem",
        description: [
          "Get help when an order is delayed, missing or delivered to the wrong address.",
        ],
        actions: [
          {
            title: "Track your order",
            href: "/orders",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "return-item",
        title: "Return an item",
        description: [
          "Start a return for an eligible item from your recent orders.",
        ],
        actions: [
          {
            title: "Start a return",
            href: "/orders",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
    ],
  },

  "international-shopping": {
    slug: "international-shopping",
    title: "International shopping",
    icon: "/customer-service/customer_service_icon_planet.svg",
    topics: [
      {
        slug: "free-shipping-and-promotions",
        title: "Free shipping and other promotions",
        description: [
          "Not all items qualify for free international shipping. Look for messaging on the product page announcing free shipping to your shipping destination.",
          "To qualify for free international shipping:",
        ],
        bulletPoints: [
          "Your cart must contain items that qualify for the promotion.",
          "The order total must be above the required minimum.",
          "Your shipping address must be in an eligible destination.",
          "VAT and import fee deposits do not contribute to the required minimum.",
        ],
        actions: [
          {
            title: "Get details on free international shipping",
            href: "/customer-service/international-shopping/free-shipping-and-promotions/details",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "customs-import-fees",
        title: "Customs, import fees and documentation",
        description: [
          "International orders may be subject to customs duties, import fees and additional documentation requirements.",
        ],
        actions: [
          {
            title: "Learn about import fees",
            href: "/customer-service/international-shopping/customs-import-fees/details",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "currency-settings",
        title: "Currency settings",
        description: [
          "Choose the currency used to display prices and complete eligible international purchases.",
        ],
        actions: [
          {
            title: "Manage currency settings",
            href: "/account/currency",
          },
        ],
      },
      {
        slug: "language-settings",
        title: "Language settings",
        description: [
          "Change the language used for the website and supported communications.",
        ],
        actions: [
          {
            title: "Manage language settings",
            href: "/account/language",
          },
        ],
      },
    ],
  },

  payment: {
    slug: "payment",
    title: "Payment",
    icon: "/common/card_icon.svg",
    topics: [
      {
        slug: "update-payment-methods",
        title: "Update payment methods",
        description: [
          "You can add, remove or update payment methods connected to your account.",
        ],
        actions: [
          {
            title: "Manage payment methods",
            href: "/account/payment-methods",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "unknown-or-incorrect-charges",
        title: "Unknown or incorrect charges",
        description: [
          "Review your recent orders and payment activity if you see a charge you do not recognize.",
        ],
        actions: [
          {
            title: "Review your orders",
            href: "/orders",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "payment-in-local-currency",
        title: "Payment in local currency",
        description: [
          "Some orders can be paid for using your local currency. The available currency options depend on your location and payment method.",
        ],
        actions: [
          {
            title: "Manage currency settings",
            href: "/account/currency",
          },
        ],
      },
      {
        slug: "payment-declined",
        title: "Payment declined",
        description: [
          "Check that your card details are correct and that your payment method has enough available funds.",
          "Contact your bank if the payment continues to be declined.",
        ],
        actions: [
          {
            title: "Manage payment methods",
            href: "/account/payment-methods",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "update-shipping-addresses",
        title: "Update shipping addresses",
        description: [
          "You can update your shipping addresses in your address book. Orders that have not been shipped may also be updated from the Your Orders page.",
        ],
        actions: [
          {
            title: "Manage your address book",
            href: "/account/addresses",
          },
          {
            title: "Update order",
            href: "/orders",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
    ],
  },

  account: {
    slug: "account",
    title: "Login, address",
    icon: "/common/account_icon.svg",
    topics: [
      {
        slug: "login",
        title: "Login",
        description: [
          "Get help signing in, resetting your password or recovering access to your account.",
        ],
        actions: [
          {
            title: "Go to sign in",
            href: "/auth",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "addresses",
        title: "Addresses",
        description: [
          "Add, remove or update the delivery addresses connected to your account.",
        ],
        actions: [
          {
            title: "Manage your address book",
            href: "/account/addresses",
          },
        ],
      },
      {
        slug: "close-my-account",
        title: "Close my account",
        description: [
          "Once your account is closed, it can no longer be accessed by you or anyone else.",
          "You will no longer be able to view your order history, print invoices or use services connected to that account.",
          "Review what you will lose access to before continuing with account closure.",
        ],
        actions: [
          {
            title: "Learn about account closure",
            href: "/customer-service/account/close-my-account/details",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
    ],
  },

  security: {
    slug: "security",
    title: "Security & privacy",
    icon: "/customer-service/customer_service_icon_security.svg",
    topics: [
      {
        slug: "security",
        title: "Security",
        description: [
          "Protect your account by using a strong password and reviewing recent account activity.",
        ],
        actions: [
          {
            title: "Manage account security",
            href: "/account/security",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "suspicious-email-received",
        title: "Suspicious e-mail received",
        description: [
          "Do not open attachments or follow links in messages that appear suspicious.",
          "Check the sender address and report messages that may be fraudulent.",
        ],
        actions: [
          {
            title: "Learn about suspicious messages",
            href: "/customer-service/security/suspicious-email-received/details",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "data-privacy-queries",
        title: "Data privacy queries",
        description: [
          "Learn how your personal information is stored, used and managed.",
        ],
        actions: [
          {
            title: "Review privacy settings",
            href: "/account/privacy",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
    ],
  },

  "gift-cards": {
    slug: "gift-cards",
    title: "Charges or gift cards",
    icon: "/customer-service/customer_service_icon_gift.svg",
    topics: [
      {
        slug: "lost-gift-card",
        title: "Lost a Gift Card",
        description: [
          "If you accidentally deleted or lost a Treemix Gift Card, please contact us.",
          "You may need to provide the following information:",
        ],
        bulletPoints: [
          "Order number, if available.",
          "Purchaser's name and recipient's name.",
          "Physical or e-mail address to which the gift card was sent.",
        ],
        actions: [
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "applied-to-wrong-account",
        title: "Applied to wrong account",
        description: [
          "Gift card balances are normally applied to the account that redeemed the code.",
          "Contact support if the balance was added to the wrong account.",
        ],
        actions: [
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "claim-code-unreadable",
        title: "Claim code unreadable",
        description: [
          "Contact support if the gift card claim code is damaged or unreadable.",
        ],
        actions: [
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "remove-gift-card-from-account",
        title: "Remove Gift Card from account",
        description: [
          "Redeemed gift card balances normally cannot be transferred or removed automatically.",
        ],
        actions: [
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "unable-to-use-gift-card",
        title: "Unable to use Gift Card",
        description: [
          "Check that the gift card is active, eligible for the purchase and connected to the correct account.",
        ],
        actions: [
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "gift-card-different-from-ordered",
        title: "Gift Card different from what was ordered",
        description: [
          "Contact support if the gift card amount or delivery format is different from what you ordered.",
        ],
        actions: [
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
    ],
  },

  prime: {
    slug: "prime",
    title: "Prime",
    icon: "/customer-service/customer_service_icon_star.svg",
    topics: [
      {
        slug: "prime-membership",
        title: "Prime membership",
        description: [
          "Manage your Prime membership, renewal settings and included benefits.",
        ],
        actions: [
          {
            title: "Manage Prime membership",
            href: "/account/prime",
          },
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
      {
        slug: "prime-benefits",
        title: "Prime benefits",
        description: [
          "Review the delivery, entertainment and shopping benefits included with Prime.",
        ],
        actions: [
          {
            title: "View Prime benefits",
            href: "/prime",
          },
        ],
      },
    ],
  },

  memberships: {
    slug: "memberships",
    title: "Memberships, subscriptions or communications",
    icon: "/customer-service/customer_service_icon_bookmark.svg",
    topics: [
      {
        slug: "manage-memberships",
        title: "Manage memberships",
        description: [
          "Review and manage active memberships connected to your account.",
        ],
        actions: [
          {
            title: "Manage memberships",
            href: "/account/memberships",
          },
        ],
      },
      {
        slug: "manage-subscriptions",
        title: "Manage subscriptions",
        description: [
          "Change, pause or cancel supported subscriptions.",
        ],
        actions: [
          {
            title: "Manage subscriptions",
            href: "/account/subscriptions",
          },
        ],
      },
      {
        slug: "communication-preferences",
        title: "Communication preferences",
        description: [
          "Choose which promotional and account communications you would like to receive.",
        ],
        actions: [
          {
            title: "Manage communication preferences",
            href: "/account/communications",
          },
        ],
      },
    ],
  },

  other: {
    slug: "other",
    title: "Something else",
    icon: "/common/question_icon.svg",
    topics: [
      {
        slug: "contact-support",
        title: "Contact customer support",
        description: [
          "Contact customer support if your issue is not covered by one of the available help categories.",
        ],
        actions: [
          {
            title: "I need more help",
            href: "/customer-service/contact",
          },
        ],
      },
    ],
  },
};

export const getCustomerServiceCategory = (
  categorySlug: string,
): CustomerServiceCategory | undefined => {
  return customerServiceCategories[categorySlug];
};

export const getCustomerServiceTopic = (
  categorySlug: string,
  topicSlug: string,
): CustomerServiceTopic | undefined => {
  return customerServiceCategories[categorySlug]?.topics.find(
    (topic) => topic.slug === topicSlug,
  );
};