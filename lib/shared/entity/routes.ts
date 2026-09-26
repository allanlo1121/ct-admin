import { TableEntity } from "./types";

type EntityRoutes = {
  list: string;
  create: string;
  import: string;
  detail: (id: string) => string;
  edit: (id: string) => string;
  workspace?: (id: string) => string;
  runtime?: (id: string) => string;
};

export const routes = {
  organization: {
    list: "/hrm/organizations",

    create: "/hrm/organizations/create",

    import: "/hrm/organizations/import",

    detail: (id: string) => `/hrm/organizations/${id}`,

    edit: (id: string) => `/hrm/organizations/${id}/edit`,
  },

  employee: {
    list: "/hrm/employees",

    create: "/hrm/employees/create",

    import: "/hrm/employees/import",

    detail: (id: string) => `/hrm/employees/${id}`,
    edit: (id: string) => `/hrm/employees/${id}/edit`,
  },

  project: {
    list: "/proj/projects",
    create: "/proj/projects/create",
    import: "/proj/projects/import",
    detail: (id: string) => `/proj/projects/${id}`,
    edit: (id: string) => `/proj/projects/${id}/edit`,
  },
  section: {
    list: "/proj/sections",
    create: "/proj/sections/create",
    import: "/proj/sections/import",
    detail: (id: string) => `/proj/sections/${id}`,
    edit: (id: string) => `/proj/sections/${id}/edit`,
  },
  tunnel: {
    list: "/proj/tunnels",
    create: "/proj/tunnels/create",
    import: "/proj/tunnels/import",
    detail: (id: string) => `/proj/tunnels/${id}`,
    edit: (id: string) => `/proj/tunnels/${id}/edit`,
    workspace: (id: string) => `/workspace/tunnels/${id}/`,
  },

  tbm: {
    list: "/equip/tbm",
    create: "/equip/tbm/create",
    import: "/equip/tbm/import",
    detail: (id: string) => `/equip/tbm/${id}`,
    edit: (id: string) => `/equip/tbm/${id}/edit`,
    runtime: (id: string) => `/equip/tbm/${id}/runtime`,
  },
} satisfies Record<TableEntity, EntityRoutes>;
