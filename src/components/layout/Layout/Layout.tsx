// WHO CAN EDIT:
// Show/hide splashscreen/newsletter: Junior, Mid
// Anything else: Senior

import Footer from "@/components/layout/Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";
import MobileHeader from "../MobileHeader/MobileHeader";
import React from "react";
import { LayoutDocumentData } from "../../../../prismicio-types";

interface LayoutProps {
  children: React.ReactNode;
  layoutData: LayoutDocumentData;
}

const Layout = ({ children, layoutData }: LayoutProps) => {
  return (
    <div className={styles.Layout}>
      <Header data={layoutData} />
      {/*<SplashScreen />*/}
      <MobileHeader data={layoutData} />
      <main className={styles.Main}>{children}</main>
      <Footer layoutData={layoutData} />
    </div>
  );
};

export default Layout;
