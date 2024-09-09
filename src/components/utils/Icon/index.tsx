import {
  AlertOutlined,
  ContainerOutlined,
  HomeOutlined,
  InboxOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
  SecurityScanOutlined,
  DatabaseOutlined,
  PieChartOutlined,
  BarChartOutlined,
  RightOutlined,
  LeftOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import React from "react";

type IconProps = {
  name: IconState | string;
  onClick?: () => void;
  style?: any;
};

export enum IconState {
  Dashboard = "dashboard",
  Categories = "categories",
  Products = "products",
  Setting = "setting",
  SampleUsage = "sampleusage",
  UnfoldMenu = "unfoldmenu",
  FoldMenu = "foldmenu",
  Logout = "logout",
  Profile = "profile",
  Security = "security",
  Reports = "reports",
  Usage = "usage",
  Statistics = "statistics",
  Right = "right",
  Left = "left",
  Poweroff = "poweroff",
}

const Icon = ({ name, onClick, style }: IconProps) => {
  switch (name) {
    case IconState.Dashboard:
      return <HomeOutlined onClick={onClick} className={style} />;
    case IconState.Categories:
      return <ContainerOutlined onClick={onClick} className={style} />;
    case IconState.Products:
      return <InboxOutlined onClick={onClick} className={style} />;
    case IconState.Setting:
      return <SettingOutlined onClick={onClick} className={style} />;
    case IconState.SampleUsage:
      return <AlertOutlined onClick={onClick} className={style} />;
    case IconState.UnfoldMenu:
      return <MenuUnfoldOutlined onClick={onClick} className={style} />;
    case IconState.FoldMenu:
      return <MenuFoldOutlined onClick={onClick} className={style} />;
    case IconState.Logout:
      return <LogoutOutlined onClick={onClick} className={style} />;
    case IconState.Profile:
      return <UserOutlined onClick={onClick} className={style} />;
    case IconState.Security:
      return <SecurityScanOutlined onClick={onClick} className={style} />;
    case IconState.Reports:
      return <DatabaseOutlined onClick={onClick} className={style} />;
    case IconState.Usage:
      return <PieChartOutlined onClick={onClick} className={style} />;
    case IconState.Statistics:
      return <BarChartOutlined onClick={onClick} className={style} />;
    case IconState.Right:
      return <RightOutlined onClick={onClick} className={style} />;
    case IconState.Left:
      return <LeftOutlined onClick={onClick} className={style} />;
    case IconState.Poweroff:
      return <PoweroffOutlined onClick={onClick} className={style} />;
      return null;
  }
};

export default Icon;
