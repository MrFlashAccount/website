import React, { DetailedHTMLProps, AnchorHTMLAttributes } from "react";
import clsx from "clsx";
import * as styles from "./styles.module.scss";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

export function Link(props: LinkProps) {
  const { children, className, ...rest } = props;

  return (
    // @ts-ignore
    <a className={clsx(styles.link, className)} {...rest}>
      {children}
    </a>
  );
}
