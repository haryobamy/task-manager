type NavLinkType = {
  icon: ({ width, height, color }: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  link: string;
};

type Task = {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: string;
  completed: boolean;
  dueDate: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
};
