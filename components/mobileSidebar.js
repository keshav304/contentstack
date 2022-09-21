import React from "react";
import { slide as Menu } from "react-burger-menu";
import Link from 'next/link';
import { useRouter } from "next/router";

const categories = [
  {
    entry: {
      _version: 5,
      uid: "bltc82faddc7abebcf9ea",
      link: {
        title: "Home",
        href: "/demo-page",
      },
      title: 'H',
    },
  },
  {
    entry: {
      _version: 5,
      locale: "en-us",
      uid: "bltc82faddc7abebcf9",
      ACL: {},
      _in_progress: false,
      created_at: "2022-06-13T11:01:26.451Z",
      created_by: "blt969cff5c2439be46",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas turpis in enim fringilla consectetur. Donec aliquet leo at enim",
      link: {
        title: "Beds",
        href: "/category/beds",
      },
      tags: [
        "luxury",
        "beds",
        "bedroom",
        "furniture",
      ],
      title: "Beds",
      updated_at: "2022-08-31T08:29:16.132Z",
      updated_by: "blt969cff5c2439be46",
      publish_details: {
        environment: "blt28d814547c439697",
        locale: "en-us",
        time: "2022-08-31T08:32:17.421Z",
        user: "blt969cff5c2439be46",
      },
    },
  },
  {
    entry: {
      _version: 5,
      locale: "en-us",
      uid: "blt20c1aa118802242b",
      ACL: {},
      _in_progress: false,
      created_at: "2022-06-13T11:02:44.098Z",
      created_by: "blt969cff5c2439be46",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas turpis in enim fringilla consectetur. Donec aliquet leo at enim",
      link: {
        title: "Sofas",
        href: "/category/sofas",
      },
      tags: [
        "furniture",
        "luxury",
      ],
      title: "Sofas",
      updated_at: "2022-08-31T10:28:25.870Z",
      updated_by: "blt969cff5c2439be46",
      publish_details: {
        environment: "blt28d814547c439697",
        locale: "en-us",
        time: "2022-08-31T10:28:30.675Z",
        user: "blt969cff5c2439be46",
      },
    },
  },
  {
    entry: {
      _version: 9,
      locale: "en-us",
      uid: "blt8143307172f69ca6",
      ACL: {},
      _in_progress: false,
      created_at: "2022-06-13T11:02:28.837Z",
      created_by: "blt969cff5c2439be46",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas turpis in enim fringilla consectetur. Donec aliquet leo at enim",
      link: {
        title: "Tables",
        href: "/category/tables",
      },
      tags: [
        "furniture",
        "homeware",
      ],
      title: "Tables",
      updated_at: "2022-08-31T11:12:29.258Z",
      updated_by: "blt969cff5c2439be46",
      publish_details: {
        environment: "blt28d814547c439697",
        locale: "en-us",
        time: "2022-08-31T11:12:36.946Z",
        user: "blt969cff5c2439be46",
      },
    },
  },
  {
    entry: {
      title: "Storage",
      link: {
        title: "Storage",
        href: "/category/storage",
      },
      tags: [
        "homeware",
      ],
      locale: "en-us",
      uid: "blt6ebfb491cf8a5002",
      created_by: "blt969cff5c2439be46",
      updated_by: "blt969cff5c2439be46",
      created_at: "2022-06-13T11:00:06.929Z",
      updated_at: "2022-08-31T11:15:00.378Z",
      ACL: {},
      _version: 6,
      _in_progress: false,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas turpis in enim fringilla consectetur. Donec aliquet leo at enim",
      publish_details: {
        environment: "blt28d814547c439697",
        locale: "en-us",
        time: "2022-08-31T13:05:09.758Z",
        user: "blt969cff5c2439be46",
      },
    },
  },
  {
    entry: {
      _version: 7,
      locale: "en-us",
      uid: "bltc91ab475eaafa987",
      ACL: {},
      _in_progress: false,
      created_at: "2022-06-13T11:01:46.416Z",
      created_by: "blt969cff5c2439be46",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas turpis in enim fringilla consectetur. Donec aliquet leo at enim",
      link: {
        title: "Lighting",
        href: "/category/lighting",
      },
      tags: [
        "homeware",
        "decore",
        "gifts",
        "lights",
      ],
      title: "Lighting",
      updated_at: "2022-08-31T10:29:04.574Z",
      updated_by: "blt969cff5c2439be46",
      publish_details: {
        environment: "blt28d814547c439697",
        locale: "en-us",
        time: "2022-08-31T10:31:17.765Z",
        user: "blt969cff5c2439be46",
      },
    },
  },
  {
    entry: {
      _version: 6,
      locale: "en-us",
      uid: "bltf8267fd9073b00ed",
      ACL: {},
      _in_progress: false,
      created_at: "2022-06-13T11:02:07.625Z",
      created_by: "blt969cff5c2439be46",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas turpis in enim fringilla consectetur. Donec aliquet leo at enim",
      link: {
        title: "Home Decore",
        href: "/category/home-decore",
      },
      tags: [
        "decore",
        "gifts",
        "luxury",
        "homeware",
      ],
      title: "Home Decore",
      updated_at: "2022-08-31T11:13:01.258Z",
      updated_by: "blt969cff5c2439be46",
      publish_details: {
        environment: "blt28d814547c439697",
        locale: "en-us",
        time: "2022-08-31T11:13:07.149Z",
        user: "blt969cff5c2439be46",
      },
    },
  },
  {
    entry: {
      _version: 3,
      locale: "en-us",
      uid: "bltd5b1b9bfd6440b50",
      ACL: {},
      _in_progress: false,
      created_at: "2022-06-24T15:03:10.635Z",
      created_by: "blt969cff5c2439be46",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas turpis in enim fringilla consectetur. Donec aliquet leo at enim",
      link: {
        title: "Cookware & Bakeware",
        href: "/category/cookware-bakeware",
      },
      tags: [
        "kitchen",
        "dining",
      ],
      title: "Cookware & Bakeware",
      updated_at: "2022-08-31T08:21:59.513Z",
      updated_by: "blt969cff5c2439be46",
      publish_details: {
        environment: "blt28d814547c439697",
        locale: "en-us",
        time: "2022-08-31T08:22:05.437Z",
        user: "blt969cff5c2439be46",
      },
    },
  },
  {
    entry: {
      _version: 8,
      locale: "en-us",
      uid: "bltbbe5086bbf5a7d2f",
      ACL: {},
      _in_progress: false,
      created_at: "2022-06-13T10:32:27.525Z",
      created_by: "blt969cff5c2439be46",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas turpis in enim fringilla consectetur. Donec aliquet leo at enim",
      link: {
        title: "Kitchen and Accessories",
        href: "/category/kitchen-accessories",
      },
      tags: [],
      title: "Kitchen and Accessories",
      updated_at: "2022-06-29T15:29:14.257Z",
      updated_by: "blt969cff5c2439be46",
      publish_details: {
        environment: "blt28d814547c439697",
        locale: "en-us",
        time: "2022-06-29T15:29:22.024Z",
        user: "blt969cff5c2439be46",
      },
    },
  },
];
export default function MobileSidebar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  const currentCategory = router.asPath.split('/')[3];
  return (
    <Menu
      isOpen={menuOpen}
      onStateChange={(state) => setMenuOpen(!state)}
      right
    >
      {
          // eslint-disable-next-line max-len
          categories
            .sort((a, b) => a.entry.title.length - b.entry.title.length)
            .map(({ entry: { title, uid: id, link: { href } } }, index) => {
              if (index === 0) {
                return (
                  <Link
                    onClick={() => setMenuOpen(false)}
                    className="menu-item"
                    href="/demo-page"
                  >
                    <li className={router.pathname === '/demo-page' ? "mbcurrentCategoryTitle" : "categoryTitle"} key="homeid" categorycode="home">Home</li>

                  </Link>
                );
              }
              return (
                <Link
                  onClick={() => setMenuOpen(false)}
                  className="menu-item"
                  href={`${href}/${id}`}
                >
                  <li className={currentCategory === id ? "mbcurrentCategoryTitle" : "categoryTitle"} key={id} categorycode={id}>{title}</li>

                </Link>
              );
            })
        }
    </Menu>
  );
}
