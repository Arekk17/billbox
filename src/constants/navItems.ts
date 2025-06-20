import { FaChartBar } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
type NavItem = {
  name: string;
  icon: React.ElementType;
  href: string;
};
export const NAV_ITEMS: NavItem[] = [
  {
    name: "Paragony",
    icon: FaReceipt,
    href: "/dashboard/billings",
  },
  {
    name: "Kategorie",
    icon: FaList,
    href: "/dashboard/categories",
  },
  {
    name: "Raporty",
    icon: FaChartBar,
    href: "/dashboard/reports",
  },
];
