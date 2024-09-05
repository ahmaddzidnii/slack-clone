import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useCreateChannelsModal = () => {
  return useAtom(modalState);
};
