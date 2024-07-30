"use client";

import { Breadcrumb, Divider, Layout, Menu, Spin, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/utils/Button";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.css";
import Icon, { IconState } from "@/components/utils/Icon";
import Switch from "@/components/utils/Switch/indext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { save } from "@/utils/storage";

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
    name: "Settings",
    router: "/settings",
    icon: "setting",
    submenu: [
      {
        syskey: "2-1",
        name: "Profile",
        router: "/profile",
        icon: "profile",
      },
      {
        syskey: "2-2",
        name: "Security",
        router: "/security",
        icon: "security",
      },
    ],
  },

  {
    syskey: "3",
    name: "Reports",
    router: "/reports",
    icon: "reports",
    submenu: null,
  },

  {
    syskey: "4",
    name: "Products",
    router: "/products",
    icon: "products",
    submenu: [
      {
        syskey: "4-1",
        name: "Products",
        router: "/products",
        icon: "products",
      },
      {
        syskey: "4-2",
        name: "Category",
        router: "/categories",
        icon: "categories",
      },
    ],
  },
  {
    syskey: "5",
    name: "Reports",
    router: "/reports",
    icon: "reports",
    submenu: null,
  },
];

const { SubMenu } = Menu;

const Container = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { theme, setTheme } = useThemeContext();

  const pathname = usePathname();

  const isParentMenuActive = (menu: MenusProps) => {
    if (!menu.submenu) return false;
    return menu.submenu.some((submenu) => pathname === submenu.router);
  };
  //  const onHandleSwitch = (checked: boolean) => {
  //    console.log(`switch to ${checked}`);
  //    if (checked) {
  //      setTheme('dark');
  //    } else {
  //      setTheme('light')
  //    }
  // };

  useEffect(() => {
    const updateEnabledState = () => {
      setIsEnabled(theme === "dark");
    };
    updateEnabledState();
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    save("Theme", newTheme);
    setTheme(newTheme);
  }, [theme, setTheme]);

  const onHandleSwitch = () => {
    setIsEnabled((prevEnabled) => !prevEnabled);
    toggleTheme();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topNavigation}>
          <div className=" flex items-center absolute top-2 right-2">
            {/* <Button
              btnType="default"
              btnLabel="Logout"
              htmlType="button"
              btnStyles=" absolute top-2 right-2"
              handleClick={() => console.log("Logout")}
              btnIcon={<Icon name={IconState.Logout} />}
            /> */}
            <Switch value={isEnabled} onHandleSwitch={onHandleSwitch} />
          </div>
        </div>
        <div
          className={`${styles.breadcrumb} h-8 mt-[52px] w-full fixed  ${
            collapsed ? "pl-20" : "pl-52"
          } `}
        >
          <Breadcrumb style={{ margin: "8px 4px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item className={styles.active_breadcrumb}>
              App
            </Breadcrumb.Item>
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
              className={`ant-menu ant-menu-submenu-title ${styles.menu} ${
                collapsed ? "w-16" : "w-48"
              } `}
              mode="inline"
              theme="dark"
            >
              {menus.map((menu) =>
                menu.submenu ? (
                  <SubMenu
                    key={menu.syskey}
                    title={
                      <span
                        className={` ${collapsed ? "pl-1" : ""}  ${
                          isParentMenuActive(menu)
                            ? `${styles.active_text}`
                            : ""
                        }`}
                      >
                        <Icon
                          name={menu.icon}
                          style={`${
                            isParentMenuActive(menu)
                              ? styles.active_text
                              : styles.text
                          }`}
                        />
                        {collapsed ? (
                          <></>
                        ) : (
                          <span
                            className={` ${collapsed ? "hidden" : ""} text-sm ${
                              isParentMenuActive(menu)
                                ? `${styles.active_text}`
                                : `${styles.text}`
                            } `}
                          >
                            {menu.name}
                          </span>
                        )}
                      </span>
                    }
                  >
                    <div className={styles.submenu}>
                      {menu.submenu.map((submenu) => (
                        <Link
                          href={submenu.router}
                          key={submenu.syskey}
                          className={`flex ${
                            styles.submenu_link_hover
                          } py-2.5 pl-8 my-1.5 text-xs ${
                            pathname === submenu.router
                              ? `${styles.active_bg} ${styles.text_dark} ${styles.active_submenu_link_hover}`
                              : ""
                          }`}
                        >
                          <div className="flex gap-2">
                            <Icon name={submenu.icon} />
                            <span
                              className={`text-sm text ${
                                pathname === submenu.router
                                  ? ""
                                  : `${styles.submenu_link_hover}`
                              } `}
                            >
                              {submenu.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </SubMenu>
                ) : (
                  <Tooltip
                    placement="rightTop"
                    title={collapsed ? menu.name : ""}
                    arrow={true}
                  >
                    <div
                      key={menu.syskey}
                      className={`my-1 ${
                        collapsed ? "flex justify-center" : "pl-1"
                      } ${
                        pathname === menu.router
                          ? collapsed
                            ? ""
                            : `${styles.active_bg} `
                          : ""
                      }`}
                    >
                      <Link
                        href={menu.router}
                        className={`gap-2 flex px-5 justify-start py-3 `}
                      >
                        <Icon
                          name={menu.icon}
                          style={` ${
                            pathname === menu.router
                              ? collapsed
                                ? styles.active_text
                                : styles.text_dark
                              : styles.text
                          }`}
                        />
                        <span
                          className={` ${
                            pathname === menu.router
                              ? styles.text_dark
                              : styles.text
                          } $} ${collapsed ? "hidden" : ""} text-sm`}
                        >
                          {menu.name}
                        </span>
                      </Link>
                    </div>
                  </Tooltip>
                )
              )}
            </Menu>
            <div className={styles.sidebar_footer}>
              {collapsed ? (
                <Icon
                  name={IconState.Right}
                  onClick={toggleCollapsed}
                  style={styles.active_text}
                />
              ) : (
                <Icon
                  name={IconState.Left}
                  onClick={toggleCollapsed}
                  style={styles.active_text}
                />
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
