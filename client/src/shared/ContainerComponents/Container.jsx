import { useEffect, useState } from "react";
import { debounce } from "../../helpers/sharedHelpers";

const Container = ({ children, style, setVisible, visible }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  const handleScroll = debounce(
    this,
    () => {
      const currentScrollPos = window.pageYOffset;
      setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    },
    50
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <div style={style} className="fade_in">
      {children}
    </div>
  );
};

export default Container;
