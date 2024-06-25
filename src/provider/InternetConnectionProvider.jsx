import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { onlineNetwork } from "../app/features/networkSlice";
// import { toast } from "@chakra-ui/react";

const InternetConnectionProvider = ({ children }) => {
  const toast = useToast();
  const toastIdRef = useRef();
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(true);

  //** closeToasts
  function close() {
    toast.closeAll(toastIdRef.current);
  }
  //** addToast
  function addToast() {
    toastIdRef.current = toast({
      title: "You'r offline!",
      description: "Please make sure you have internet connection",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  }

  const setOnline = () => {
    setIsOnline(true);
    dispatch(onlineNetwork(true));
    close();
  };
  const setOffline = () => {
    setIsOnline(false);
    dispatch(onlineNetwork(false));
    addToast();
  };
  useEffect(() => {
    window.addEventListener("online", setOnline);

    window.addEventListener("offline", setOffline);
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  if (!isOnline) {
    return <>{children}</>;
  }

  return children;
};

export default InternetConnectionProvider;
