import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  // {
  //   id: "example-component",
  //   title: "Example",
  //   translate: "EXAMPLE",
  //   type: "item",
  //   icon: "heroicons-outline:star",
  //   url: "example",
  // },
  {
    id: "dashboard-component",
    title: "Dashboard",
    translate: "DASHBOARD",
    type: "item",
    icon: "heroicons-outline:star",
    url: "dashboard",
  },
];

export default navigationConfig;
