import {IconGrid,IconFileCheck,IconCheck,IconStopwatch} from "@/components/icons"

export  const navItems:NavLinkType[] = [
    {
      icon: IconGrid ,
      title: "All",
      link: "/",
    },
    {
      icon: IconFileCheck,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: IconCheck,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: IconStopwatch,
      title: "Overdue",
      link: "/overdue",
    },
  ];