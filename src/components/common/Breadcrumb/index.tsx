"use client";

import { Breadcrumb, ConfigProvider } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./styles.module.css";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const pathSnippets = pathname.split("/").filter((i) => i);

  // Define default breadcrumb for "Home"
  const defaultBreadcrumb = (
    <Breadcrumb.Item key="home">
      <Link href="/">
        <p className={styles.disabled_breadcrumb}>Home</p>
      </Link>
    </Breadcrumb.Item>
  );

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const isFirst = index === 0;
    const isLast = index === pathSnippets.length - 1;

    const breadcrumbLabel = snippet.charAt(0).toUpperCase() + snippet.slice(1);

    return isLast ? (
      <Breadcrumb.Item key={url} className={styles.active_breadcrumb}>
        {breadcrumbLabel}
      </Breadcrumb.Item>
    ) : (
      <Breadcrumb.Item
        key={url}
        className={isFirst ? styles.disabled_breadcrumb : undefined}
      >
        {isFirst ? (
          <span>{breadcrumbLabel}</span>
        ) : (
          <Link href={url}>{breadcrumbLabel}</Link>
        )}
      </Breadcrumb.Item>
    );
  });

  // Combine default "Home" breadcrumb with dynamic items
  const allBreadcrumbItems = [defaultBreadcrumb, ...breadcrumbItems];

  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            separatorColor: "white", // Set separator color to white
          },
        },
      }}
    >
      <div className="text-activeColor">
        <Breadcrumb className={styles.breadcrumb} separator=">>">
          {allBreadcrumbItems}
        </Breadcrumb>
      </div>
    </ConfigProvider>
  );
};

export default DynamicBreadcrumb;
