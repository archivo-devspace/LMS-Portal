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
} from "@ant-design/icons";

import React from "react";

type IconProps = {
  name: IconState | string;
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
}

const Icon = ({ name }: IconProps) => {
  switch (name) {
    case IconState.Dashboard:
      return <HomeOutlined />;
    case IconState.Categories:
      return <ContainerOutlined />;
    case IconState.Products:
      return <InboxOutlined />;
    case IconState.Setting:
      return <SettingOutlined />;
    case IconState.SampleUsage:
      return <AlertOutlined />;
    case IconState.UnfoldMenu:
      return <MenuUnfoldOutlined />;
    case IconState.FoldMenu:
      return <MenuFoldOutlined />;
    case IconState.Logout:
      return <LogoutOutlined />;
    case IconState.Profile:
      return <UserOutlined />;
    case IconState.Security:
      return <SecurityScanOutlined />;
    case IconState.Reports:
      return <DatabaseOutlined />;
    case IconState.Usage:
      return <PieChartOutlined />;
    case IconState.Statistics:
      return <BarChartOutlined />;
    default:
      return null;
  }
};

export default Icon;
