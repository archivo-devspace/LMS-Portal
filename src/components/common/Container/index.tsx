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
import DynamicBreadcrumb from "../Breadcrumb";
import Cookies from "js-cookie";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

type Props = {
  children: React.ReactNode;
};

type MenusProps = {
  id: string;
  name: string;
  router: string;
  icon: string;
  submenu: SubMenusProps[] | null;
};

type SubMenusProps = {
  id: string;
  name: string;
  router: string;
  icon: string;
};

const menus: MenusProps[] = [
  {
    id: "1",
    name: "Dashboard",
    router: "/",
    icon: "dashboard",
    submenu: null,
  },

  {
    id: "2",
    name: "Settings",
    router: "/settings",
    icon: "setting",
    submenu: [
      {
        id: "1",
        name: "Profile",
        router: "/setting/profile",
        icon: "profile",
      },
      {
        id: "2",
        name: "Security",
        router: "/setting/security",
        icon: "security",
      },
    ],
  },

  {
    id: "3",
    name: "Reports",
    router: "/reports",
    icon: "reports",
    submenu: null,
  },

  {
    id: "4",
    name: "Supplies",
    router: "/supplies",
    icon: "products",
    submenu: [
      {
        id: "1",
        name: "Products",
        router: "/supplies/products",
        icon: "products",
      },
      {
        id: "2",
        name: "Category",
        router: "/supplies/categories",
        icon: "categories",
      },
    ],
  },
  {
    id: "5",
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
  const { logout } = useAuthentication();

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
            {/* <Button
              btnLabel="Logout"
              btnType="dashed"
              htmlType="button"
              handleClick={logout}
              
            /> */}
            <Icon
              name={IconState.Poweroff}
              onClick={logout}
              style={styles.powerOff}
            />
          </div>
        </div>
        <div
          className={`${
            styles.breadcrumb
          } h-14 mt-[50px] w-full fixed flex items-center  ${
            collapsed ? "pl-[70px]" : "pl-[200px]"
          } `}
        >
          {/* <Breadcrumb style={{ margin: "8px 4px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item className={styles.active_breadcrumb}>
              App
            </Breadcrumb.Item>
          </Breadcrumb> */}
          <DynamicBreadcrumb />
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
              {menus.map((menu) => {
                const isActiveParentMenu = isParentMenuActive(menu);

                return menu.submenu ? (
                  <SubMenu
                    key={menu.id} // Ensure each SubMenu has a unique key
                    title={
                      <span
                        className={` ${collapsed ? "pl-1" : ""} ${
                          isActiveParentMenu ? `${styles.active_text}` : ""
                        }`}
                      >
                        <Icon
                          name={menu.icon}
                          style={`${
                            isActiveParentMenu
                              ? styles.active_text
                              : styles.text
                          }`}
                        />
                        {!collapsed && (
                          <span
                            className={`text-sm ${
                              isActiveParentMenu
                                ? `${styles.active_text}`
                                : `${styles.text}`
                            }`}
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
                          key={`${menu.id}-${submenu.id}`} // Ensure unique key for each Link
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
                              className={`text-sm ${
                                pathname === submenu.router
                                  ? ""
                                  : `${styles.submenu_link_hover}`
                              }`}
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
                    key={menu.id} // Ensure each Tooltip has a unique key
                    placement="rightTop"
                    title={collapsed ? menu.name : ""}
                    arrow={true}
                  >
                    <div
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
                        className={`gap-2 flex px-5 justify-start py-3`}
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
                          } ${collapsed ? "hidden" : ""} text-sm`}
                        >
                          {menu.name}
                        </span>
                      </Link>
                    </div>
                  </Tooltip>
                );
              })}
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
