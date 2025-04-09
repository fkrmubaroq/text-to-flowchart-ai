import { useState } from "react";

type TuseModal<TModalName> = {
    show?: boolean;
    modalName?: TModalName;
  }
export function useModal<TModalName, TData = unknown>(
    initialOptions?: TuseModal<TModalName>
  ) {
    const [currentShow, setCurrentShow] = useState(initialOptions?.show || false);
    const [name, setName] = useState<TModalName | undefined>(
      initialOptions?.modalName || undefined
    );
    const [data, setData] = useState<TData | null>(null);
  
    const hideModal = () => {
      setCurrentShow(false);
      setName(undefined);
    };
  
    const showModal = (modalName: TModalName, data?: TData) => {
      setName(modalName);
      setCurrentShow(true);
      data && setData(data);
    };
  
    return {
      data,
      modalName: name,
      showModal,
      show: currentShow,
      hideModal,
    };
  }