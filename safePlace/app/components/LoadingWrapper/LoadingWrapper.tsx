import React, { FC, PropsWithChildren } from "react";
import { Loading } from "../Loading";

type LoadingWrapperProps = {
  isLoading: boolean;
  text?: string;
};

export const LoadingWrapper: FC<PropsWithChildren<LoadingWrapperProps>> = ({
  isLoading,
  text,
  children,
}) => {
  if (isLoading) {
    return <Loading text={text} />;
  }

  return <>{children || null}</>;
};
