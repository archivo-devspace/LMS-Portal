"use client";

import { Breadcrumb, Divider, Layout, Menu, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "@/components/utils/Button";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.css";
import Icon, { IconState } from "@/components/utils/Icon";

type Props = {
  children: React.ReactNode;
};

type MenusProps = {
  syskey: string;
  name: string;
  router: string;
  icon: string;
  submenu: SubMenusProps[] | null;
};

type SubMenusProps = {
  syskey: string;
  name: string;
  router: string;
  icon: string;
};

const menus: MenusProps[] = [
  {
    syskey: "1",
    name: "Dashboard",
    router: "/",
    icon: "dashboard",
    submenu: null,
  },
  {
    syskey: "2",
    name: "Products",
    router: "/products",
    icon: "products",
    submenu: [
      {
        syskey: "2-1",
        name: "All Products",
        router: "/products",
        icon: "products",
      },
      {
        syskey: "2-2",
        name: "Categories",
        router: "/categories",
        icon: "categories",
      },
    ],
  },
  {
    syskey: "3",
    name: "Settings",
    router: "/settings",
    icon: "setting",
    submenu: [
      {
        syskey: "3-1",
        name: "Profile",
        router: "/profile",
        icon: "profile",
      },
      {
        syskey: "3-2",
        name: "Security",
        router: "/security",
        icon: "security",
      },
    ],
  },
  {
    syskey: "4",
    name: "Reports",
    router: "/reports",
    icon: "reports",
    submenu: null,
  },
  {
    syskey: "5",
    name: "Usage",
    router: "/usage",
    icon: "usage",
    submenu: [
      {
        syskey: "5-1",
        name: "Statistics",
        router: "/usage/statistics",
        icon: "BarChartOutlined",
      },
    ],
  },
];

const { SubMenu } = Menu;

const Container = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const pathname = usePathname();

  const isParentMenuActive = (menu: MenusProps) => {
    if (!menu.submenu) return false;
    return menu.submenu.some((submenu) => pathname === submenu.router);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topNavigation}>
          <div className=" flex items-center ">
            <Button
              btnType="primary"
              btnLabel="Logout"
              htmlType="button"
              btnStyles=" absolute top-2 right-2"
              handleClick={() => console.log("Logout")}
              btnIcon={<Icon name={IconState.Logout} />}
            />
          </div>
        </div>
        <div
          className={`h-8 mt-[52px]  w-full fixed  ${
            collapsed ? "pl-20" : "pl-52 ease-out"
          } bg-white  `}
        >
          <Breadcrumb style={{ margin: "8px 4px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className={styles.body}>
          <div className={styles.sidebar}>
            <div className={styles.logo}>
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="ListenYourBody"
                className=" rounded-full"
                priority={true}
              />
              <h1
                className={` ${styles.title} ${
                  collapsed ? styles.displayHidden : styles.displayBlock
                }`}
              >
                Admin Panel
              </h1>
            </div>
            <Menu
              inlineCollapsed={collapsed}
              className={` ${styles.menu} ${collapsed ? "w-16" : "w-48"} `}
              mode="inline"
            >
              {menus.map((menu) =>
                menu.submenu ? (
                  <SubMenu
                    key={menu.syskey}
                    title={
                      <span
                        className={`flex ${
                          isParentMenuActive(menu) ? "text-default" : ""
                        }`}
                      >
                        <Icon name={menu.icon} />
                        <span
                          className={`${collapsed ? "hidden" : ""} text-sm`}
                        >
                          {menu.name}
                        </span>
                      </span>
                    }
                  >
                    {menu.submenu.map((submenu) => (
                      <Link
                        href={submenu.router}
                        key={submenu.syskey}
                        className={`flex justify-start py-2.5 pl-7 my-1.5 rounded-lg mx-2 text-xs ${
                          pathname === submenu.router ? "bg-default" : ""
                        }`}
                      >
                        <div className="flex gap-2">
                          <Icon name={submenu.icon} />
                          <span className={"text-sm"}>{submenu.name}</span>
                        </div>
                      </Link>
                    ))}
                  </SubMenu>
                ) : (
                  <div
                    key={menu.syskey}
                    className={`my-1 ${collapsed ? "px-0.5" : "pl-2.5"} ${
                      pathname === menu.router ? "bg-default rounded-lg" : ""
                    }`}
                  >
                    <Link
                      href={menu.router}
                      className={`gap-2 flex px-5 justify-start py-3 `}
                    >
                      <Icon name={menu.icon} />
                      <span className={`${collapsed ? "hidden" : ""} text-sm`}>
                        {menu.name}
                      </span>
                    </Link>
                  </div>
                )
              )}
            </Menu>
            <div className=" bottom-0 w-full flex justify-center bg-darkGrey text-white  items-center absolute h-12 rounded-br-lg  border-r-[1px] border-gray-200">
              {collapsed ? (
                <Icon name={IconState.Right} onClick={toggleCollapsed} />
              ) : (
                <Icon name={IconState.Left} onClick={toggleCollapsed} />
              )}
            </div>
          </div>

          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Container;
