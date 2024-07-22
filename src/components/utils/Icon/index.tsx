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
} from "@ant-design/icons";

import React from "react";

type IconProps = {
  name: IconState | string;
  onClick?: () => void;
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
}

const Icon = ({ name, onClick }: IconProps) => {
  switch (name) {
    case IconState.Dashboard:
      return <HomeOutlined onClick={onClick} />;
    case IconState.Categories:
      return <ContainerOutlined onClick={onClick} />;
    case IconState.Products:
      return <InboxOutlined onClick={onClick} />;
    case IconState.Setting:
      return <SettingOutlined onClick={onClick} />;
    case IconState.SampleUsage:
      return <AlertOutlined onClick={onClick} />;
    case IconState.UnfoldMenu:
      return <MenuUnfoldOutlined onClick={onClick} />;
    case IconState.FoldMenu:
      return <MenuFoldOutlined onClick={onClick} />;
    case IconState.Logout:
      return <LogoutOutlined onClick={onClick} />;
    case IconState.Profile:
      return <UserOutlined onClick={onClick} />;
    case IconState.Security:
      return <SecurityScanOutlined onClick={onClick} />;
    case IconState.Reports:
      return <DatabaseOutlined onClick={onClick} />;
    case IconState.Usage:
      return <PieChartOutlined onClick={onClick} />;
    case IconState.Statistics:
      return <BarChartOutlined onClick={onClick} />;
    case IconState.Right:
      return <RightOutlined onClick={onClick} />;
    case IconState.Left:
      return <LeftOutlined onClick={onClick} />;
      return null;
  }
};

export default Icon;
