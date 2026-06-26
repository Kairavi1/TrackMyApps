"use client";

import Board from "./Board";

type Props = {
  applied: any[];
  phoneScreen: any[];
  interview: any[];
  offer: any[];
  rejected: any[];
};

export default function BoardClient(props: Props) {
  return <Board {...props} />;
}
